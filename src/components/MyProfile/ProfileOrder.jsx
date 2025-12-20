import { Link } from 'react-router-dom';
import './ProfileElement.css';

export default function ProfileOrder () {
  return (
    <div class="order-button">
      <div className='ml-2 mb-5'>
        <button class="progress-button">All</button>
        <button class="progress-button">In Progress</button>
        <button class="progress-button">Delivered</button>

      {/* START */}
        <div>
            <div className="firstbox-order">
              {/* <Link to={`/order-details${id}`}>Order Details</Link> */}
              <Link to={`/order-details`}>
                <div className='head-left'>
                  <div className="detail1">
                    <p className='bg-yellow-200 py-2 px-4 rounded-3xl min-w-25'>In Progress</p>
                    <p className='mr-80 min-w-30'>|  33 December 2086</p>

                    <div>
                      <p className='min-w-15'>12 items</p>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className="card-info flex justify-start">
                    <img 
                      className="card-img" 
                      src="/Mini Sour Rainbow Belts.png" 
                      alt="order-item-pic" 
                    />
                    <div className="detail2">
                      <p>Order id : ASDASDW23432</p>
                      <p className='ml-8 text-[#696969]'>Gummies Rose - 500g <span className="text-[#ff74b1]"> and more...</span></p>
                      <p>Total : 1,250 THB</p>
                    </div>
                  </div>

                  <div className="item-count text-[#696969]">
                    <p>x 12</p>
                  </div>

                  <div className='text-6xl font-bold mb-10'>{'>'}</div>
                </div>
              </Link>
            </div>
        </div>
      {/* END */}

      {/* START */}
        <div>
            <div className="firstbox-order">
              {/* <Link to={`/order-details${id}`}>Order Details</Link> */}
              <Link to={`/order-details`}>
                <div className='head-left'>
                  <div className="detail1">
                    <p className='bg-yellow-200 py-2 px-4 rounded-3xl min-w-25'>In Progress</p>
                    <p className='mr-80 min-w-30'>|  33 December 2086</p>

                    <div>
                      <p className='min-w-15'>12 items</p>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className="card-info flex justify-start">
                    <img 
                      className="card-img" 
                      src="/But First, Rosé Roses Gummy.png" 
                      alt="order-item-pic" 
                    />
                    <div className="detail2">
                      <p>Order id : RTITP57656</p>
                      <p className='ml-8 text-[#696969]'>But First, Rosé Roses Gummy - 500g <span className="text-[#ff74b1]"> and more...</span></p>
                      <p>Total : 1,250 THB</p>
                    </div>
                  </div>

                  <div className="item-count text-[#696969]">
                    <p>x 12</p>
                  </div>

                  <div className='text-6xl font-bold mb-10'>{'>'}</div>
                </div>
              </Link>
            </div>
        </div>
      {/* END */}

      {/* START */}
        <div>
            <div className="firstbox-order">
              {/* <Link to={`/order-details${id}`}>Order Details</Link> */}
              <Link to={`/order-details`}>
                <div className='head-left'>
                  <div className="detail1">
                    <p className='bg-yellow-200 py-2 px-4 rounded-3xl min-w-25'>In Progress</p>
                    <p className='mr-80 min-w-30'>|  33 December 2086</p>

                    <div>
                      <p className='min-w-15'>12 items</p>
                    </div>
                  </div>
                </div>  

                <div className='card-body'>
                  <div className="card-info flex justify-start">
                    <img 
                      className="card-img" 
                      src="/Jelly Belly UnBEARably Hot Cinnamon Bears.png" 
                      alt="order-item-pic" 
                    />
                    <div className="detail2">
                      <p>Order id : GUIFGI2342</p>
                      <p className='ml-8 text-[#696969]'>Jelly Belly UnBEARably Hot Cinnamon Bears - 500g <span className="text-[#ff74b1]"> and more...</span></p>
                      <p>Total : 1,250 THB</p>
                    </div>
                  </div>

                  <div className="item-count text-[#696969]">
                    <p>x 12</p>
                  </div>

                  <div className='text-6xl font-bold mb-10'>{'>'}</div>
                </div>
              </Link>
            </div>
        </div>
      {/* END */}

        
        </div>
      </div>
  )
}