import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaWallet } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, PieChart, Pie, ResponsiveContainer, Legend } from "recharts";


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

    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-data'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full px-10">
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

            <div className="grid md:grid-cols-2">
                <div className="w-1/2">
                    <BarChart
                        width={400}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Legend></Legend>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell name={entry.category} key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;