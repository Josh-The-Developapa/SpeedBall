import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { CircleCheck, Mail, ShoppingBag, Menu, X } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
            Admin Login
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full px-4 py-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (password === 'letmein') setAuthenticated(true);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition duration-150"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 p-4 md:p-6 flex flex-col space-y-4 md:space-y-6 
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }
        `}
        >
          {/* Header with close button for mobile */}
          <div className="flex justify-between items-center">
            <div className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white">
              Admin Panel
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2 md:space-y-3">
            <button
              onClick={() => {
                setTab('orders');
                setSidebarOpen(false);
              }}
              className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base ${
                tab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              Orders
            </button>
            <button
              onClick={() => {
                setTab('newsletter');
                setSidebarOpen(false);
              }}
              className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base ${
                tab === 'newsletter'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              Newsletter
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Mobile header with menu button */}
            <div className="flex items-center mb-4 md:mb-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white mr-3 transition-colors"
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                {tab === 'orders'
                  ? '📦 Orders Overview'
                  : '📧 Newsletter Subscribers'}
              </h2>
            </div>

            {tab === 'orders' ? <OrdersTable /> : <NewsletterTable />}
          </div>
        </main>
      </div>
    </div>
  );
}

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('timestamp', { ascending: false });
      if (error) console.error(error);
      else setOrders(data);
    };

    fetchOrders();

    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Mobile card view for orders
  const MobileOrderCard = ({ order }) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs md:text-sm text-gray-400">
            {new Date(order.timestamp).toLocaleDateString()}
          </p>
          <p className="text-xs md:text-sm text-gray-400">
            {new Date(order.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-base md:text-lg font-bold text-green-400">
            UGX {order.total_cost.toLocaleString()}
          </p>
          <p className="text-xs md:text-sm text-gray-400">
            {order.total_quantity} items
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white mb-1">Customer</h3>
        <p className="text-sm text-gray-300">{order.customerName}</p>
        <p className="text-sm text-gray-400">{order.phone_number}</p>
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white mb-2">Items</h3>
        <div className="space-y-2">
          {Array.isArray(order.items) &&
            order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-gray-700 rounded p-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 md:w-12 md:h-12 rounded object-cover border border-gray-500 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs md:text-sm font-semibold text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400">Size: {item.size}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  <p className="text-xs text-green-400 font-medium">
                    UGX {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-1">
          Delivery Address
        </h3>
        <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
          {order.delivery_address}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="block lg:hidden">
        {orders.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No orders yet.</div>
        ) : (
          orders.map((order) => (
            <MobileOrderCard key={order.id} order={order} />
          ))
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full table-auto bg-gray-800 border-collapse">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 border border-gray-600 text-left text-gray-300 font-semibold">
                  Timestamp
                </th>
                <th className="p-3 border border-gray-600 text-left text-gray-300 font-semibold">
                  Customer
                </th>
                <th className="p-3 border border-gray-600 text-left text-gray-300 font-semibold">
                  Items
                </th>
                <th className="p-3 border border-gray-600 text-center text-gray-300 font-semibold">
                  Quantity
                </th>
                <th className="p-3 border border-gray-600 text-center text-gray-300 font-semibold">
                  Cost (UGX)
                </th>
                <th className="p-3 border border-gray-600 text-left text-gray-300 font-semibold">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-750">
                  <td className="p-3 border border-gray-600">
                    <div className="text-sm text-gray-300">
                      {new Date(order.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-600">
                    <div>
                      <div className="font-semibold text-white">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-400">
                        {order.phone_number}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-600">
                    <div className="max-w-xs space-y-2">
                      {Array.isArray(order.items) &&
                        order.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-700 border border-gray-600 rounded-lg p-2"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 rounded object-cover border border-gray-500 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-white truncate">
                                  {item.title}
                                </h3>
                                <p className="text-xs text-gray-400">
                                  Size: {item.size} | Qty: {item.quantity}
                                </p>
                                <p className="text-xs text-green-400 font-medium">
                                  UGX {item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-600 text-center text-white font-medium">
                    {order.total_quantity}
                  </td>
                  <td className="p-3 border border-gray-600 text-green-400 text-center font-bold">
                    UGX {order.total_cost.toLocaleString()}
                  </td>
                  <td className="p-3 border border-gray-600">
                    <div className="max-w-xs text-sm text-gray-300 whitespace-pre-wrap break-words">
                      {order.delivery_address}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="text-center text-gray-400 py-8 bg-gray-800 rounded-lg">
            No orders yet.
          </div>
        )}
      </div>
    </div>
  );
}

function NewsletterTable() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from('newsletter')
        .select('*')
        .order('id', { ascending: false });
      if (!error) setEmails(data);
    };

    fetchEmails();

    const channel = supabase
      .channel('newsletter-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'newsletter' },
        fetchEmails
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Mobile card view for newsletter
  const MobileEmailCard = ({ entry }) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700">
      <div className="flex justify-between items-center">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-gray-400 mb-1">
            ID: {entry.id}
          </p>
          <p className="text-sm md:text-base text-white font-medium break-words">
            {entry.email}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="block md:hidden">
        {emails.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No subscribers yet.
          </div>
        ) : (
          emails.map((entry) => (
            <MobileEmailCard key={entry.id} entry={entry} />
          ))
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
          <table className="min-w-full table-auto bg-gray-800">
            <thead className="bg-gray-700 text-left text-sm text-gray-300">
              <tr>
                <th className="p-4 font-semibold">🆔 ID</th>
                <th className="p-4 font-semibold">📧 Email</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4 text-white">{entry.id}</td>
                  <td className="p-4 text-white break-words">{entry.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {emails.length === 0 && (
          <div className="p-6 text-center text-gray-400 bg-gray-800 rounded-lg">
            No subscribers yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
