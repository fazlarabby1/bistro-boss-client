import { Link } from "react-router-dom";

const Navbar = () => {

    const navOptions =
    <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
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
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;