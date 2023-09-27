import { FaBook, FaCalendarAlt, FaHome, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { GiHamburgerMenu, } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useMenu from "../hooks/useMenu";

const DashBoard = () => {
    const [cart] = useCart();
    const [menu] = useMenu();

    const [isAdmin] = useAdmin();
    // if(isAdminLoading){
    //     return <span className="loading loading-infinity loading-lg"></span>
    // }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-64 lg:w-80 min-h-full bg-[#D1A054]">

                    {/* Sidebar content here */}
                    <li className="mb-3"><h1 className="text-3xl font-bold uppercase">Bistro Boss</h1><span className="text-2xl font-semibold uppercase tracking-[0.2em]"> Restaurant</span></li>

                    {
                        isAdmin ?
                            <>
                                <li className="uppercase tracking-wider my-1 font-medium "><NavLink to='/dashboard/adminhome'><FaHome /> Admin Home</NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/addItem'><FaUtensils className=" mr-1" /> Add Items</NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/manageitems'><FaShoppingCart /> Manage Items <span className="badge badge-secondary right-2 absolute font-bold p-2">{menu?.length || 0}</span></NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/history'><FaBook className=" mr-1" /> Manage Bookings</NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/allusers'><FaUsers className=" mr-1" /> All Users</NavLink></li>
                            </>
                            :
                            <>
                                <li className="uppercase tracking-wider my-1 font-medium "><NavLink to='/dashboard/userhome'><FaHome /> User Home</NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/reservation'><FaCalendarAlt className=" mr-1" /> Reservation</NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/mycart'><FaShoppingCart /> My Cart <span className="badge badge-secondary right-2 absolute font-bold p-2">{cart?.length || 0}</span></NavLink></li>
                                <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/dashboard/history'><FaWallet className=" mr-1" /> Payment History</NavLink></li>
                            </>
                    }



                    <div className="my-5 border rounded h-1 bg-white"></div>
                    <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/'><FaHome className=" mr-1" />Home</NavLink></li>
                    <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/menu'><GiHamburgerMenu className=" mr-1" />Menu</NavLink></li>
                    <li className="uppercase tracking-wider my-1 font-medium"><NavLink to='/order/salad'><FaShoppingBag className=" mr-1" />Shop</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoard;