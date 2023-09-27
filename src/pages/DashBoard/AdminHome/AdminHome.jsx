import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {

    const { user } = useAuth();

    return (
        <div className="w-full m-4">
            <h1 className="text-3xl font-semibold">Welcome Back, <span className="text-[#D1A054]">{user?.displayName}</span></h1>
        </div>
    );
};

export default AdminHome;