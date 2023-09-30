import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menuItemId: _id, name, image, price, email: user?.email
            }
            fetch('https://bistro-boss-server-nine-pink.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); // refetch to update the number of items in the cart in Navbar
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: 'You Must Login First to Order Food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            })
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Dish Image" /></figure>
            <p className="bg-slate-900 text-yellow-400 absolute right-8 rounded p-1 top-1">${price}</p>
            <div className="card-body items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center mt-3">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 border-black text-black bg-slate-100 hover:text-yellow-300 hover:border-yellow-300">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;