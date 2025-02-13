import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { MdPreview } from "react-icons/md";
import {  FaBook, FaUser } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
// import { PiUserSwitchBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>

                                <NavLink to='/dashboard/adminHome'>
                                    <IoHomeSharp></IoHomeSharp>
                                    Admin Home</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/addItems'>
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/manageItems'>
                                    {/* <TiShoppingCart /> */}
                                    <FaList />
                                    Manage Items</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/bookings'>
                                  <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                            </li>
                          
                            <li>

                                <NavLink to='/dashboard/users'>
                                    <FaUser></FaUser>
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>

                                    <NavLink to='/dashboard/userHome'>
                                        <IoHomeSharp></IoHomeSharp>
                                        User Home</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/reservation'>
                                        <SlCalender />
                                        Reservation</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/cart'>
                                        <TiShoppingCart />
                                        My Cart ({cart.length})</NavLink>
                                </li>

                                <li>

                                    <NavLink to='/dashboard/review'>
                                        <MdPreview />
                                        Add a Review</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/bookings'>
                                        <FaList />
                                        My Bookings</NavLink>
                                </li>
                            </>
                    }
                    {/* shared navlinks */}
                    <div className='divider'>  </div>
                    <li>

                        <NavLink to='/'>
                            <IoHomeSharp></IoHomeSharp>
                            Home</NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/salad'>
                            <FaSearch />
                            Menu</NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/contact'>
                            <IoMdContact />
                            Contact</NavLink>
                    </li>

                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;