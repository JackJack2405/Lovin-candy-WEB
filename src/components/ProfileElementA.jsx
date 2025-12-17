import { NavLink } from "react-router-dom";
import "./ProfileElement.css";
import { TbNotes } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { PiMoneyBold } from "react-icons/pi";

export default function ProfileElementA() {

  const navLinkClass = ({ isActive }) => {
      return isActive ? "itemsadj active" : "itemsadj";
    };

  return (

    <div className="element-a">
      <p className="heada">Order</p>
      <ul className="ordera">
        <li className="mt-2">
          <NavLink className={navLinkClass} to="/profile/order" end><TbNotes/>My Order</NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/profile/favitems" end><FaRegHeart />Favourite items</NavLink>
        </li>
      </ul>
      <p className="heada">Account</p>
      <ul className="ordera1">
        <li className="mt-2">
          <NavLink className={navLinkClass} to="/profile" end><FaRegUser />Personal Information</NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/profile/address" end><FiMapPin />Address</NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/profile/payment" end><PiMoneyBold />Payment</NavLink>
        </li>
      </ul>
    </div>
  )
}