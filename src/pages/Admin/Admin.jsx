import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("orders");

  // Render login form if not authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <h1 className="text-xl mb-4">Enter Password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
          />
          <button
            onClick={() => {
              // Hardcoded password check
              if (password === "letmein") setAuthenticated(true);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Main admin panel once authenticated
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <main className="flex-1 p-4">
        {/* Tab buttons to switch between views */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              tab === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              tab === "newsletter"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setTab("newsletter")}
          >
            Newsletter
          </button>
        </div>
        {/* Render appropriate table based on selected tab */}
        {tab === "orders" ? <OrdersTable /> : <NewsletterTable />}
      </main>
    </div>
  );
}

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Function to fetch current orders
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("timestamp", { ascending: false });
      if (error) console.error(error);
      else setOrders(data);
    };

    fetchOrders();

    // Setup real-time subscription to listen for changes to "orders" table
    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders() // Re-fetch orders on any change
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border border-gray-700">Timestamp</th>
            <th className="p-2 border border-gray-700">Phone</th>
            <th className="p-2 border border-gray-700">Items</th>
            <th className="p-2 border border-gray-700">Quantity</th>
            <th className="p-2 border border-gray-700">Cost (UGX)</th>
            <th className="p-2 border border-gray-700">Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-700">
              <td className="p-2 border border-gray-700">
                {new Date(order.timestamp).toLocaleString()}
              </td>
              <td className="p-2 border border-gray-700">{order.phone}</td>
              <td className="p-2 border border-gray-700 text-sm">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(order.items, null, 2)}
                </pre>
              </td>
              <td className="p-2 border border-gray-700">
                {order.total_quantity}
              </td>
              <td className="p-2 border border-gray-700">
                UGX {order.total_cost.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-700">
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
    // Function to fetch newsletter emails
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from("newsletter")
        .select("*")
        .order("id", { ascending: false });
      if (error) console.error(error);
      else setEmails(data);
    };

    fetchEmails();

    // Setup real-time subscription to listen for changes to "newsletter" table
    const channel = supabase
      .channel("newsletter-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "newsletter" },
        () => fetchEmails() // Re-fetch emails on any change
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border border-gray-700">ID</th>
            <th className="p-2 border border-gray-700">Email</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((entry) => (
            <tr key={entry.id} className="border-b border-gray-700">
              <td className="p-2 border border-gray-700">{entry.id}</td>
              <td className="p-2 border border-gray-700">{entry.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
