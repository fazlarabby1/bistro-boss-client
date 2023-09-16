
const MenuItem = ({item}) => {

    const {name, image, price, recipe} = item;

    return (
        <div className="flex space-x-3 mx-2">
            <img className="w-24 rounded-tr-full rounded-br-full rounded-bl-full" src={image} alt="Dish Image" />
            <div>
                <h3 className="uppercase">{name} -----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;