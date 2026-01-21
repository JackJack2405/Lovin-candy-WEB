import { useState } from 'react';
import './ProfileElement.css';
import axios from 'axios';
import { useEffect } from 'react';

export default function ProfileElementB ({ data }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [orderStats, setOrderStats] = useState({
    completed: 0, pending: 0, shipping: 0, received: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get(`${apiBase}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const orders = res.data.data || [];
        setOrderStats({
          completed: orders.filter(o => o.status === 'DELIVERED').length,
          pending: orders.filter(o => o.status === 'PENDING').length,
          shipping: orders.filter(o => o.status === 'IN-TRANSIT').length,
          received: 0
        });
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };

    if (data) fetchOrders();
  }, [data, apiBase]);

  return (
    <>
      <div className='element-b flex flex-col md:flex-row items-center justify-between p-6 gap-6'>
        <div className='leftinfo flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left'>
          <img 
            className="picpic w-20 h-20 md:w-25 md:h-25 rounded-full object-cover border-2 border-pink-200" 
            src="https://media.istockphoto.com/id/1254293707/photo/striped-fruit-pink-and-white-lollipop-on-stick-on-pink-background.jpg?s=612x612&w=0&k=20&c=WNx2KLtfESh1WEzhBkh2D1B9lKh4MGBiV_IM71DxfPA="></img>
          <p className='b-id text-xl md:text-2xl font-semibold'>{data ? data.username : 'Guest'}</p>
        </div>

        <div className='rightinfo grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 w-full md:w-auto'>
          <div className='tableitems flex flex-col items-center p-2 bg-gray-50 md:bg-transparent rounded-xl'>
            <span className="text-gray-500 text-sm md:text-base">Completed</span>
            <span className="text-pink-500 font-bold text-lg">{orderStats.completed}</span>
          </div>

          <div className='tableitems flex flex-col items-center p-2 bg-gray-50 md:bg-transparent rounded-xl'>
            <span className="text-gray-500 text-sm md:text-base">To pay</span>
            <span className="text-pink-500 font-bold text-lg">{orderStats.pending}</span>
          </div>

          <div className='tableitems flex flex-col items-center p-2 bg-gray-50 md:bg-transparent rounded-xl'>
            <span className="text-gray-500 text-sm md:text-base">To ship</span>
            <span className="text-pink-500 font-bold text-lg">{orderStats.shipping}</span>
          </div>

          <div className='tableitems flex flex-col items-center p-2 bg-gray-50 md:bg-transparent rounded-xl'>
            <span className="text-gray-500 text-sm md:text-base">To receive</span>
            <span className="text-pink-500 font-bold text-lg">{orderStats.received}</span>
          </div>
        </div>
      </div>
    </>
  )
}