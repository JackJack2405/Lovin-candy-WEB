import { NavLink, useLocation } from "react-router-dom";
import "./ProfileElement.css";
import { TbNotes } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { PiMoneyBold } from "react-icons/pi";

export default function ProfileElementA() {
  const location = useLocation();

  const navLinkClass = (path) => {
    const isActive = path === "/profile" 
        ? location.pathname === path 
        : location.pathname.startsWith(path);

    return isActive ? "itemsadj active whitespace-nowrap" : "itemsadj whitespace-nowrap";
  };

return (
    <div className="element-a scrollbar-hide"> 
      <div className="flex flex-row md:flex-col gap-2 md:gap-0 w-full md:px-6 md:py-4">
        
        <p className="heada hidden md:block">Order</p>
        <ul className="flex flex-row md:flex-col gap-2 md:mb-10">
          <li>
            <NavLink className={navLinkClass("/profile/order")} to="/profile/order" end>
              <TbNotes/> <span className="hidden md:inline ml-2">My Order</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass("/profile/favitems")} to="/profile/favitems" end>
              <FaRegHeart /> <span className="hidden md:inline ml-2">Favourite</span>
            </NavLink>
          </li>
        </ul>

        <p className="heada hidden md:block">Account</p>
        <ul className="flex flex-row md:flex-col gap-2">
          <li>
            <NavLink className={navLinkClass("/profile")} to="/profile" end>
              <FaRegUser /> <span className="hidden md:inline ml-2">Personal Info</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass("/profile/address")} to="/profile/address" end>
              <FiMapPin /> <span className="hidden md:inline ml-2">Address</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass("/profile/payment")} to="/profile/payment" end>
              <PiMoneyBold /> <span className="hidden md:inline ml-2">Payment</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}