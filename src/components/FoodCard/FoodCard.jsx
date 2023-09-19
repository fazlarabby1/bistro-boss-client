import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
    const {user} = useContext(AuthContext);
    const { name, image, price, recipe } = item;
    const navigate = useNavigate();

    const handleAddToCart = (item) => {
        console.log(item);
        if(user){
            fetch('http://localhost:5000/carts')
            .then(res => res.json())
            .then(data =>{
                if(data.insertedId){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
        else{
            Swal.fire({
                title: 'You Must Login First to Order Food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login');
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