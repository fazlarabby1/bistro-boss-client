
const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Dish Image" /></figure>
            <p className="bg-slate-900 text-yellow-400 absolute right-8 rounded p-1 top-1">${price}</p>
            <div className="card-body items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center mt-3">
                    <button className="btn btn-outline border-0 border-b-4 border-black text-black bg-slate-100 hover:text-yellow-300 hover:border-yellow-300">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;