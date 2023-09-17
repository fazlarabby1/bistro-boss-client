import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();

    return (
        <section className="mb-12">
            <SectionTitle subHeading={"Check it out"} heading={"FROM OUR MENU"} />
            <div className="grid md:grid-cols-2 gap-10">
                {
                    (menu.filter(menuItem => menuItem.category === "popular")).map(item => <MenuItem item={item} key={item._id} />)
                }
            </div>
            <div className="flex justify-center mt-10">
                <button className="btn btn-outline border-0 border-b-4 border-black text-black">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;