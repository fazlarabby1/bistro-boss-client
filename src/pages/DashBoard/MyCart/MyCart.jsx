import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

    const handleDelete = (item) => {
        Swal.fire({
            title: `Are you sure to delete ${item?.name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item?._id}`, {
                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                        }
                    })
            }
        })
    }

    return (
        <div className="md:px-5 lg:px-0 w-full lg:w-[650px]">
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className=" p-3 rounded bg-slate-300">

                <div className="uppercase flex justify-evenly font-medium">
                    <h2 className="text-2xl">Total Items: {cart?.length}</h2>
                    <h2 className="text-2xl">Total Price: ${totalPrice}</h2>
                    <Link to='/dashboard/payment'><button className="btn btn-warning rounded-md btn-sm">Pay</button></Link>
                </div>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054]">
                            <tr className="">
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th className="text-right">Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.map((item, i) =>
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
                                        <td>
                                            <button onClick={() => handleDelete(item)} className="btn-sm p-[6px] rounded text-lg text-white bg-red-500 hover:bg-red-700 "><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th className="text-xs">
                                    {
                                        cart?.length ? <span>We are happy with you. Thank You</span> :
                                            <Link to="/order/salad" className="text-blue-400 hover:text-blue-600 hover:underline">Check our food list to order</Link>
                                    }
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;