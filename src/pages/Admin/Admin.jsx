import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { CircleCheck, Mail, ShoppingBag } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('orders');

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 w-[100vw]">
        <Header />
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
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
    <div className="min-h-screen w-screen flex bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col space-y-6">
        <div className="text-2xl font-bold tracking-tight text-white">
          Admin Panel
        </div>
        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => setTab('orders')}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              tab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Orders
          </button>
          <button
            onClick={() => setTab('newsletter')}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              tab === 'newsletter' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <Mail className="w-5 h-5 mr-3" />
            Newsletter
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">
          {tab === 'orders'
            ? '📦 Orders Overview'
            : '📧 Newsletter Subscribers'}
        </h2>
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

  return (
    <div className="overflow-x-auto max-w-[100vw]">
      <table className="min-w-full table-auto border border-gray-700 w-[50vw]">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border border-gray-700">Timestamp</th>
            <th className="p-2 border border-gray-700">Phone</th>
            <th className="p-2 border border-gray-700">Items</th>
            <th className="p-2 border border-gray-700">Quantity</th>
            <th className="p-2 border border-gray-700">Cost (UGX)</th>
            <th className="p-2 border border-gray-700">Name & Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-700">
              <td className="p-2 border border-gray-700">
                {new Date(order.timestamp).toLocaleString()}
              </td>
              <td className="p-2 border border-gray-700">
                {order.customerName}
                <br />
                {order.phone_number}
              </td>
              <td className="p-2 border border-gray-700">
                <div className="flex overflow-x-auto space-x-3 p-1 flex-col w-70">
                  {Array.isArray(order.items) &&
                    order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 bg-gray-800 border border-gray-600 rounded-lg p-3 my-[15px]"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded object-cover border border-gray-500"
                          />
                          <div>
                            <h3 className="text-sm font-semibold text-white">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-400">
                              Size: {item.size}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity}
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
              <td className="p-2 border border-gray-700 text-center">
                <br />
                {order.total_quantity}
              </td>
              <td className="p-2 border border-gray-700 text-green-400 text-center font-medium">
                UGX {order.total_cost.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-700 max-w-xs overflow-auto whitespace-pre-wrap">
                {order.delivery_address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
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
        <div className="p-6 text-center text-gray-400">No subscribers yet.</div>
      )}
    </div>
  );
}

export default AdminPage;
