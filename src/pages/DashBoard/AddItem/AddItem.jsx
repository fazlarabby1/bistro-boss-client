import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";

const AddItem = () => {
    
    const {handleSubmit, register, formState:{errors} } = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

    return (
        <div className="w-full md:px-20">
            <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <SectionTitle subHeading="What's New?" heading="Add An Item" />
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded-sm">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" className="input input-bordered rounded-none w-full" {...register("name", {required: true})}/>
                    {errors.name && <span className='text-red-700'>Name is required</span>}
                </div>
                <div className="md:flex gap-10">
                    <div className="form-control w-full md:max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <select className="select select-bordered rounded-none" {...register("category", {required: true})}>
                            <option disabled selected>Choose A Category</option>
                            <option>salad</option>
                            <option>pizza</option>
                            <option>soups</option>
                            <option>desserts</option>
                            <option>drinks</option>
                        </select>
                        {errors.category && <span className='text-red-700'>Category is required</span>}
                    </div>
                    <div className="form-control w-full md:max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" placeholder="Price" className="input input-bordered rounded-none w-full" {...register("price", {required: true})} />
                        {errors.price && <span className='text-red-700'>Price is required</span>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </label>
                    <textarea className="textarea textarea-bordered rounded-none h-36" placeholder="Recipe Details" {...register("recipe", {required: true})}></textarea>
                    {errors.recipe && <span className='text-red-700'>Recipe detail is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Select Image*</span>
                    </label>
                    <input type="file" className="file-input rounded-none w-full max-w-xs" {...register("image", {required: true})} />
                    {errors.image && <span className='text-red-700'>Item image is required</span>}
                </div>
                <input className="btn rounded-sm my-3" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;