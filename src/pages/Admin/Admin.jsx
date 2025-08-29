import { useState, useEffect } from 'react';
import { CircleCheck, Mail, ShoppingBag, Menu, X } from 'lucide-react';

// Mock supabase for demo
const supabase = {
  from: (table) => ({
    select: () => ({
      order: () => ({
        then: (callback) =>
          callback({
            data: table === 'orders' ? mockOrders : mockEmails,
            error: null,
          }),
      }),
    }),
  }),
  channel: () => ({
    on: () => ({ subscribe: () => {} }),
  }),
  removeChannel: () => {},
};

const mockOrders = [
  {
    id: 1,
    timestamp: '2024-01-15T10:30:00Z',
    customerName: 'John Doe',
    phone_number: '+256700123456',
    items: [
      {
        title: 'Premium T-Shirt',
        size: 'L',
        quantity: 2,
        price: 25000,
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
      },
      {
        title: 'Cotton Hoodie',
        size: 'M',
        quantity: 1,
        price: 45000,
        image:
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
      },
    ],
    total_quantity: 3,
    total_cost: 95000,
    delivery_address: '123 Main Street, Kampala, Uganda',
  },
  {
    id: 2,
    timestamp: '2024-01-14T15:45:00Z',
    customerName: 'Jane Smith',
    phone_number: '+256701987654',
    items: [
      {
        title: 'Denim Jacket',
        size: 'S',
        quantity: 1,
        price: 65000,
        image:
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&h=100&fit=crop',
      },
    ],
    total_quantity: 1,
    total_cost: 65000,
    delivery_address: '456 Oak Avenue, Entebbe, Uganda',
  },
];

const mockEmails = [
  { id: 1, email: 'john@example.com' },
  { id: 2, email: 'jane@example.com' },
  { id: 3, email: 'mike@example.com' },
];

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticated) {
    return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 px-4 bg-gray-800">
        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl">
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
    <div className="min-h-screen w-[100vw] flex bg-gray-900 text-gray-100 relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 p-6 flex flex-col space-y-6 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center lg:block">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Admin Panel
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => {
              setTab('orders');
              setSidebarOpen(false);
            }}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              tab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Orders
          </button>
          <button
            onClick={() => {
              setTab('newsletter');
              setSidebarOpen(false);
            }}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              tab === 'newsletter' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <Mail className="w-5 h-5 mr-3" />
            Newsletter
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto lg:ml-0">
        {/* Mobile header with menu button */}
        <div className="flex items-center justify-between mb-6 lg:justify-start">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">
            {tab === 'orders'
              ? '📦 Orders Overview'
              : '📧 Newsletter Subscribers'}
          </h2>
        </div>

        {tab === 'orders' ? <OrdersTable /> : <NewsletterTable />}
      </main>
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
          <p className="text-sm text-gray-400">
            {new Date(order.timestamp).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400">
            {new Date(order.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-400">
            UGX {order.total_cost.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">{order.total_quantity} items</p>
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
                  className="w-12 h-12 rounded object-cover border border-gray-500"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-white">
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
        <p className="text-sm text-gray-300 whitespace-pre-wrap">
          {order.delivery_address}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="block lg:hidden">
        {orders.map((order) => (
          <MobileOrderCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <div className="text-center text-gray-400 py-8">No orders yet.</div>
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 border border-gray-700 text-left">
                Timestamp
              </th>
              <th className="p-3 border border-gray-700 text-left">Customer</th>
              <th className="p-3 border border-gray-700 text-left">Items</th>
              <th className="p-3 border border-gray-700 text-center">
                Quantity
              </th>
              <th className="p-3 border border-gray-700 text-center">
                Cost (UGX)
              </th>
              <th className="p-3 border border-gray-700 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700">
                <td className="p-3 border border-gray-700">
                  {new Date(order.timestamp).toLocaleString()}
                </td>
                <td className="p-3 border border-gray-700">
                  <div>
                    <div className="font-semibold">{order.customerName}</div>
                    <div className="text-sm text-gray-400">
                      {order.phone_number}
                    </div>
                  </div>
                </td>
                <td className="p-3 border border-gray-700">
                  <div className="max-w-xs space-y-2">
                    {Array.isArray(order.items) &&
                      order.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-800 border border-gray-600 rounded-lg p-2"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 rounded object-cover border border-gray-500"
                            />
                            <div>
                              <h3 className="text-sm font-semibold text-white">
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
                <td className="p-3 border border-gray-700 text-center">
                  {order.total_quantity}
                </td>
                <td className="p-3 border border-gray-700 text-green-400 text-center font-medium">
                  UGX {order.total_cost.toLocaleString()}
                </td>
                <td className="p-3 border border-gray-700 max-w-xs">
                  <div className="whitespace-pre-wrap text-sm">
                    {order.delivery_address}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    <div className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-400">ID: {entry.id}</p>
        <p className="text-white font-medium">{entry.email}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="block md:hidden">
        {emails.map((entry) => (
          <MobileEmailCard key={entry.id} entry={entry} />
        ))}
        {emails.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No subscribers yet.
          </div>
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-700">
        <table className="min-w-full table-auto bg-gray-800">
          <thead className="bg-gray-700 text-left text-sm text-gray-300">
            <tr>
              <th className="p-4">🆔 ID</th>
              <th className="p-4">📧 Email</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((entry) => (
              <tr
                key={entry.id}
                className="border-t border-gray-700 hover:bg-gray-700/50 transition"
              >
                <td className="p-4">{entry.id}</td>
                <td className="p-4">{entry.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {emails.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            No subscribers yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
