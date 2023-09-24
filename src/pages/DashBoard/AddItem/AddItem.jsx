import { Helmet } from "react-helmet-async";

const AddItem = () => {
    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <h1 className="text-2xl">Add An Item</h1>
        </div>
    );
};

export default AddItem;