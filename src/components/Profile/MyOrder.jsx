import { useEffect, useState } from "react";
import DataService from "../../config/DataService";
import { API } from "../../config/API";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const api = DataService(token);
        const res = await api.get(API.GET_MY_BOOKINGS);
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl p-5 shadow-sm">
              <p className="text-gray-400 text-sm mb-1">
                Booking Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="font-semibold text-lg mb-2">
                Status:{" "}
                <span className="text-[#e82429] capitalize">{order.status}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Total Price: ₹{order.totalPrice}
              </p>

              <div className="border-t pt-3 mt-3">
                {order.items.map((item, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-medium">
                      Tour: {item.tourId?.title || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Guests: {item.guests} | Date:{" "}
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
