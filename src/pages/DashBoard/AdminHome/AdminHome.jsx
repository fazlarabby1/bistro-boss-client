import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaWallet } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const AdminHome = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    return (
        <div className="w-full px-10 xl:px-14">
            <h1 className="text-3xl font-semibold">Welcome Back, <span className="text-[#D1A054]">{user?.displayName}</span></h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-5">
                <div className="text-white bg-gradient-to-r from-fuchsia-600 to-white flex gap-3 justify-center items-center py-7 rounded-lg shadow-lg">
                    <FaWallet className="text-5xl xl:-ml-10" />
                    <p className="text-2xl font-semibold">{stats.revenue} <br /><span className="text-sm">Revenue</span></p>
                </div>

                <div className="text-white bg-gradient-to-r from-[#eea02c] to-white flex gap-3 justify-center items-center py-7 rounded-lg shadow-lg">
                    <FaUsers className="text-5xl xl:-ml-10" />
                    <p className="text-2xl font-semibold">{stats.users} <br /><span className="text-sm">Users</span></p>
                </div>

                <div className="text-white bg-gradient-to-r from-pink-600 to-white flex gap-3 justify-center items-center py-7 rounded-lg shadow-lg">
                    <MdFastfood className="text-5xl xl:-ml-10" />
                    <p className="text-2xl font-semibold">{stats.revenue} <br /><span className="text-sm">Menu Items</span></p>
                </div>

                <div className="text-white bg-gradient-to-r from-cyan-500 to-white flex gap-3 justify-center items-center py-7 rounded-lg shadow-lg">
                    <TbTruckDelivery className="text-5xl xl:-ml-10" />
                    <p className="text-2xl font-semibold">{stats.orders} <br /><span className="text-sm">Orders</span></p>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;