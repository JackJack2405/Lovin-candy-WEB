import { useState } from 'react';
import './ProfileElement.css';
import axios from 'axios';
import { useEffect } from 'react';

export default function ProfileElementB () {
  const apiBase = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({
  completed: 0,
  pending: 0,
  shipping: 0,
  received: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${apiBase}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!token) {
      console.log("No token found, skipping fetch");
      setLoading(false);
      return;
      }

        setUser(response.data.data);
      } catch (error) {
        console.log("Error:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiBase]);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiBase}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const orders = res.data.data;

      const stats = {
        completed: orders.filter(o => o.status === 'DELIVERED').length,
        pending: orders.filter(o => o.status === 'PENDING').length,
        shipping: orders.filter(o => o.status === 'IN-TRANSIT').length,
        received: 0
      };

      setOrderStats(stats);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  if (user) fetchOrders();
  }, [user, apiBase]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='element-b'>
        <div className='leftinfo'>
          <img className="picpic" src="https://i.ytimg.com/vi/G6ONgCgvnXY/maxresdefault.jpg"></img>
          <p className='b-id'>{user ? user.username : 'Guest'}</p>
        </div>

        <div className='rightinfo'>
          <div className='tableitems'>
            <span>Completed</span>
            <span>{orderStats.completed}</span>
          </div>

          <div className='tableitems'>
            <span>To pay</span>
            <span>{orderStats.pending}</span>
          </div>

          <div className='tableitems'>
            <span>To ship</span>
            <span>{orderStats.shipping}</span>
          </div>

          <div className='tableitems'>
            <span>To receive</span>
            <span>{orderStats.received}</span>
          </div>
        </div>
      </div>
    </>
  )
}