import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProfileElement.css';
import axios from 'axios';

export default function ProfileOrder () {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBase = import.meta.env.VITE_API_URL;
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${apiBase}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [apiBase]);

  const filteredOrders = orders.filter((order) => {
    if (filter === 'ALL') return true;
    return order.status === filter; 
  });

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;

  return (
    <div className="order-button w-full px-2 md:px-0">
      <div className='mb-5 flex justify-center md:justify-start overflow-x-auto md:overflow-visible scrollbar-hide'>
        <button 
        className={`progress-button whitespace-nowrap ${filter === 'ALL' ? 'active-filter' : ''}`}
        onClick={() => setFilter('ALL')}
        >All</button>
        <button 
        className={`progress-button whitespace-nowrap ${filter === 'PENDING' ? 'active-filter' : ''}`}
        onClick={() => setFilter('PENDING')}
        >In Progress</button>
        <button 
        className={`progress-button whitespace-nowrap ${filter === 'DELIVERED' ? 'active-filter' : ''}`}
        onClick={() => setFilter('DELIVERED')}
        >Delivered</button>
      </div>

    {filteredOrders.length === 0 ? (
        <p className="text-center py-10 text-gray-400">No orders found.</p>
      ) : (
        filteredOrders.map((order) => (
          <div key={order._id}>
            <div className="firstbox-order w-full mb-4">
              <Link to={`/order-details/${order._id}`}>
                <div className='head-left'>
                  <div className="detail1 flex justify-between md:justify-start items-center">
                    <p className='bg-yellow-200 py-2 px-4 rounded-3xl min-w-25 text-sm md:text-base flex items-center justify-center text-center'>
                      {order.status}
                    </p>
                    <p className='md:mr-80 min-w-30 text-gray-400 md:text-black'>
                      | {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <div className="hidden md:block">
                      <p className='min-w-15'>{order.items?.length || 0} items</p>
                    </div>
                  </div>
                </div>

                <div className='card-body flex flex-row items-center justify-between mt-4 md:mt-0'>
                  <div className="card-info flex justify-start items-center gap-3 md:gap-4">
                    <img 
                      className="card-img w-16 h-16 md:w-25 md:h-25 object-cover" 
                      src={order.items?.[0]?.imageUrl || "/placeholder.png"} 
                      alt={order.items?.[0]?.name || "product"}
                    />
                    <div className="detail2">
                      <p className="text-sm md:text-base font-bold md:font-normal">
                        Order id : {order._id.substring(0, 10)}...
                      </p>
                      <p className='md:ml-8 text-[#696969] text-xs md:text-sm line-clamp-1'>
                        {order.items?.[0]?.name} 
                        {order.items?.length > 1 && <span className="text-[#ff74b1]"> and more...</span>}
                      </p>
                      <p className="text-sm md:text-base">Total : {order.totalAmount} THB</p>
                    </div>
                  </div>

                  <div className="item-count text-[#696969] text-sm md:text-base mr-2 md:mr-0">
                    <p>x {order.items?.length || 0}</p>
                  </div>
                  <div className='text-3xl md:text-6xl font-bold md:mb-10 text-gray-300 md:text-black'>{'>'}</div>
                </div>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}