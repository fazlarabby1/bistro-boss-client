import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, coverImage }) => {
    return (
        <div className="my-10">
            {title && <Cover img={coverImage} title={title}></Cover>}
            <div className="my-10">
                <div className="grid md:grid-cols-2 gap-10">
                    {
                        items.map(item => <MenuItem item={item} key={item._id} />)
                    }
                </div>
                <div className="flex justify-center mt-10">
                    <button className="btn btn-outline border-0 border-b-4 border-black text-black">Order Your Favourite Food</button>
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;