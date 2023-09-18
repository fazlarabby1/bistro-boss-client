import { useForm } from 'react-hook-form';
import signupImg from '../../assets/others/authentication1.png';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-2">Sign Up Here</h1>
                    <img src={signupImg} alt="Signup Image" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" {...register("name", { required: true })} />
                            {errors.name && <span className='text-red-700'>Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && <span className='text-red-700'>Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" {...register("password", { required: true, minLength: 6, maxLength: 10 })} />
                            {errors.password && <span className='text-red-700'>Password is required and should have minimum 6 and maximum 10 characters</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-orange-400 hover:bg-orange-600 text-white" type="submit" value="SignUp" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;