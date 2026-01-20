  import PopularPicks from '../PopularPick/PopularPicks';
import './ProfileElement.css';
 // import PopularPicks from "../components/PopularPicks";

  export default function ProfileElementD () {
    return (
      <div>
        <div>
          <h2 className='mt-10 text-center text-4xl font-[Jua] bg-[#FFEB76]/35 p-5 rounded-2xl underline decoration-wavy'>CHECK OUT OUR MORE ITEMS!</h2>
        </div>
        <div>

          {/* <ul className='p-3 flex gap-10 mt-10 mb-20 overflow-x-auto'>
            <li className='shrink-0 w-80 flex flex-col items-center text-center bg-[#FFB4D5] text-[#4C4C4C] p-5 font-bold rounded-xl text-2xl shadow-lg hover:scale-105 hover:bg-[#FF74B1] hover:text-white transition duration-300'>
              <img className="w-72 h-72 object-cover rounded-xl mb-5" src="/Banana Split Cream Swirl Lollipop Bag.png" alt="Banana Split Cream Swirl Lollipop Bag"/>
              Banana Split Cream Swirl Lollipop</li>
            <li className='shrink-0 w-80 flex flex-col items-center text-center bg-[#FFB4D5] text-[#4C4C4C] p-5 font-bold rounded-xl text-2xl shadow-lg hover:scale-105 hover:bg-[#FF74B1] hover:text-white transition duration-300'>
              <img className="w-72 h-72 object-cover rounded-xl mb-5" src="/Blue Raspberry Lollipop Bag.png" alt="Blue Raspberry Lollipop Bag"/>
              Blue Raspberry Lollipop</li>
            <li className='shrink-0 w-80 flex flex-col items-center text-center bg-[#FFB4D5] text-[#4C4C4C] p-5 font-bold rounded-xl text-2xl shadow-lg hover:scale-105 hover:bg-[#FF74B1] hover:text-white transition duration-300'>
              <img className="w-72 h-72 object-cover rounded-xl mb-5" src="/Cotton Candy Lollipop Bag.png" alt="Cotton Candy Lollipop Bag"/>
              Cotton Candy Lollipop</li>
            <li className='shrink-0 w-80 flex flex-col items-center text-center bg-[#FFB4D5] text-[#4C4C4C] p-5 font-bold rounded-xl text-2xl shadow-lg hover:scale-105 hover:bg-[#FF74B1] hover:text-white transition duration-300'>
              <img className="w-72 h-72 object-cover rounded-xl mb-5" src="/Orange Creamsicle Cream Swirl Lollipop Bag.png" alt="Orange Creamsicle Cream Swirl Lollipop Bag"/>
              Orange Creamsicle Cream Swirl Lollipop</li>
            <li className='shrink-0 w-80 flex flex-col items-center text-center bg-[#FFB4D5] text-[#4C4C4C] p-5 font-bold rounded-xl text-2xl shadow-lg hover:scale-105 hover:bg-[#FF74B1] hover:text-white transition duration-300'>
              <img className="w-72 h-72 object-cover rounded-xl mb-5" src="/Strawberry Shortcake Cream Swirl Lollipop Bag.png" alt="Strawberry Shortcake Cream Swirl Lollipop Bag"/>
              Strawberry Shortcake Cream Swirl Lollipop</li>
          </ul> */}
          <div>
            <PopularPicks />
          </div>
        </div>
      </div>
    )
  }

