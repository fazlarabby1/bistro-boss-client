import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";

const AddItem = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <SectionTitle heading="What's new?" subHeading='Add An Item' />

            <form onSubmit={handleSubmit(onSubmit)} className="px-5 md:px-20">
                <div className="form-control w-full md:max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" className="input input-bordered rounded-none w-full md:max-w-xs" {...register("name", { required: true, maxLength: 120 })} />
                    {errors.name && <span className='text-red-700'>Recipe Name is required and must be within 120 characters</span>}
                </div>
                <div className="md:flex gap-10">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Category </span>
                        </label>
                        <select className="select select-bordered rounded-none" {...register("category", {required: true})}>
                            <option disabled selected>Choose a Category</option>

                            <option>salad</option>
                            <option>pizza</option>
                            <option>soups</option>
                            <option>desserts</option>
                            <option>drinks</option>
                        </select>
                        {errors.category && <span className='text-red-700'>Need to select a category to proceed.</span>}
                    </div>
                    <div className="form-control w-full md:max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" placeholder="Price" className="input input-bordered rounded-none w-full md:max-w-xs" {...register("price", { required: true })} />
                        {errors.price && <span className='text-red-700'>Recipe price is required.</span>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </label>
                    <textarea className="textarea textarea-bordered rounded-none h-32" placeholder="Recipe Details" {...register("recipe", { required: true })}></textarea>
                    {errors.recipe && <span className='text-red-700'>Recipe detail is required.</span>}
                </div>

                <div className="form-control w-full md:max-w-xs mb-3">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image*</span>
                    </label>
                    <input type="file" className="file-input w-full max-w-xs rounded-none bg-slate-300" {...register("image", { required: true })} />
                    {errors.image && <span className='text-red-700'>Cannot proceed without providing the recipe image.</span>}
                </div>
                <div className="form-control w-full md:w-36">
                    <input className="btn rounded-lg" type="submit" value="Add Item" />
                </div>
            </form>
        </div>
    );
};

export default AddItem;