import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(err => console.log(err));
    }

    const navOptions =
        <>
            <li><Link className="btn btn-ghost hover:text-white" to="/">Home</Link></li>
            <li><Link className="btn btn-ghost hover:text-white" to="/menu">Our Menu</Link></li>
            <li><Link className="btn btn-ghost hover:text-white" to="/order/salad">Order Food</Link></li>
            <li><Link className="btn btn-ghost hover:text-white" to="/secret">Secret</Link></li>
            {
                user ?
                    <li onClick={handleLogOut}><Link className="btn btn-ghost hover:text-white">Log Out</Link></li>
                    :
                    <li><Link className="btn btn-ghost hover:text-white" to="/login">Login</Link></li>
            }
        </>

    return (
        <>
            <div className="navbar fixed z-50 text-white bg-slate-700 bg-opacity-60 max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black font-semibold bg-white rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost uppercase text-lg">Bistro Boss <br />Restaurant</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                {user?.displayName && 
                <div className="navbar-end">
                    <a className="btn">{user?.displayName}</a>
                </div>}
            </div>
        </>
    );
};

export default Navbar;