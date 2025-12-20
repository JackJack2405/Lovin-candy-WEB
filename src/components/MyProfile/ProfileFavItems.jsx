import './ProfileElement.css';
import { TiShoppingCart } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoHeart } from "react-icons/io5";

export default function ProfileFavItems () {

  const favItems = [
    { id:1, name:"Banana Split Cream Swirl Lollipop", img: "/Banana Split Cream Swirl Lollipop Bag.png"}
  ]

  return (
    <div className='bg-white w-full h-auto rounded-2xl p-5 shadow-lg'>
      <ul className='flex gap-10 justify-evenly pb-5'>
        <li className='relative w-80 flex flex-col  text-start bg-[#FCE7F3] p-5 rounded-xl text-2xl shadow-lg cursor-pointer'>
              <div className="absolute top-5 right-5 text-[#65DBFF] hover:text-red-500 transition-colors">
                <IoHeart size={40} />
              </div>
              
              <img 
              className="w-72 h-72 object-cover rounded-xl mb-5" 
              src="/Banana Split Cream Swirl Lollipop Bag.png" 
              alt="Banana Split Cream Swirl Lollipop Bag"/>
              <div className='text-[#4C4C4C] font-bold text-2xl overflow-hidden line-clamp-1'>
                Banana Split Cream Swirl Lollipop
              </div>
              <div className='flex gap-5 justify-center mt-3'>
                <button 
                className='bg-blue-300 w-45 h-12 flex items-center justify-center rounded-2xl cursor-pointer'>
                  <TiShoppingCart/>
                </button>
                <button 
                className='bg-red-400 w-20 h-12 flex items-center justify-center rounded-2xl cursor-pointer'>
                  <RiDeleteBin5Line />
                </button>
              </div>
        </li>
        <li className='w-80 flex flex-col  text-start bg-[#FCE7F3] p-5 rounded-xl text-2xl shadow-lg cursor-pointer'>
              
              
              <img 
              className="w-72 h-72 object-cover rounded-xl mb-5" 
              src="/Banana Split Cream Swirl Lollipop Bag.png" 
              alt="Banana Split Cream Swirl Lollipop Bag"/>
              <div className='text-[#4C4C4C] font-bold text-2xl overflow-hidden line-clamp-1'>
                Banana Split Cream Swirl Lollipop
              </div>
              <div className='flex gap-5 justify-center mt-3'>
                <button 
                className='bg-blue-300 w-45 h-12 flex items-center justify-center rounded-2xl cursor-pointer'>
                  <TiShoppingCart/>
                </button>
                <button 
                className='bg-red-400 w-20 h-12 flex items-center justify-center rounded-2xl cursor-pointer'>
                  <RiDeleteBin5Line />
                </button>
              </div>
        </li>
        <li className='w-80 flex flex-col  text-start bg-[#FCE7F3] p-5 rounded-xl text-2xl shadow-lg cursor-pointer'>
              <img 
              className="w-72 h-72 object-cover rounded-xl mb-5" 
              src="/Banana Split Cream Swirl Lollipop Bag.png" 
              alt="Banana Split Cream Swirl Lollipop Bag"/>
              <div className='text-[#4C4C4C] font-bold text-2xl overflow-hidden line-clamp-1'>
                Banana Split Cream Swirl Lollipop
              </div>
              <div className='flex gap-5 justify-center mt-3'>
                <button 
                className='bg-blue-300 w-45 h-12 flex items-center justify-center rounded-2xl cursor-pointer'>
                  <TiShoppingCart/>
                </button>
                <button 
                className='bg-red-400 w-20 h-12 flex items-center justify-center rounded-2xl cursor-pointer'>
                  <RiDeleteBin5Line />
                </button>
              </div>
        </li>
      </ul>
    </div>
  )
}