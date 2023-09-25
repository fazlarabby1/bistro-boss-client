import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    return (
        <div className="w-full md:px-20">
            <Helmet>
                <title>Bistro Boss | Manage Items</title>
            </Helmet>
            <SectionTitle subHeading='Hurry Up!' heading='Manage All Items' />
            <div className="bg-white p-2 md:p-5">
                <h1 className="text-xl font-bold uppercase">Total Items: {menu?.length}</h1>
                <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054]">
                            <tr className="">
                                <th>#</th>
                                <th>Item Image</th>
                                <th>Name</th>
                                <th className="text-right">Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu?.map((item, i) =>
                                    <tr key={item?._id} className="hover cursor-pointer">
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>

                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.image} alt="Food Image" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="opacity-80">
                                            {item?.name}
                                        </td>
                                        <td className="opacity-80 text-right">${item?.price}</td>
                                        <td className="">
                                            <button className="btn-sm p-[6px] rounded text-lg text-white bg-[#D1A054] hover:bg-[#eaae56]"><FaEdit /></button>
                                        </td>
                                        <td>
                                            <button className="btn-sm p-[6px] rounded text-lg text-white bg-red-500 hover:bg-red-700 "><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
            </div>
        </div>
    );
};

export default ManageItems;