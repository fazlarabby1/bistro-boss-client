import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        const result = res.json();
        return result;
    });

    const handleMakeAdmin = (user) =>{
        fetch(`http://localhost:5000/users/admin/${user?._id}`,{
            method:'PATCH'
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an admin now.`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDelete = (user) => {
        console.log(user?._id);
    }

    return (
        <div className="w-full md:px-14">
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <div className="p-3 rounded bg-slate-300">

                <div className="uppercase font-medium">
                    <h2 className="text-2xl">Total Users: {users?.length}</h2>
                </div>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054]">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-right">Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, i) =>
                                    <tr key={user?._id} className="hover cursor-pointer">
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td className="opacity-80">
                                            {user?.name}
                                        </td>
                                        <td className="opacity-80">
                                            {user?.email}
                                        </td>
                                        <td className="opacity-80 text-right">
                                            {
                                                user?.role === 'admin' ? <span className="uppercase text-green-600">Admin</span>
                                                    :
                                                    <button onClick={() => handleMakeAdmin(user)} className="btn-sm p-[6px] rounded text-lg text-white bg-[#e99312] hover:bg-[#735324] "><FaUserShield /></button>
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className="btn-sm p-[6px] rounded text-lg text-white bg-red-500 hover:bg-red-700 "><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;