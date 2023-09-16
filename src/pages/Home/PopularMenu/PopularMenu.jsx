import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    console.log(menu);

    useEffect(() => {
        fetch("menu.json")
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === "popular");
                setMenu(popularItems)
            })
    }, []);

    return (
        <section>
            <SectionTitle subHeading={"Check it out"} heading={"FROM OUR MENU"} />
            <div>
                {
                    menu.map(item => <MenuItem item={item} key={item._id}/>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;