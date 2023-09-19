import { useForm } from 'react-hook-form';
import signupImg from '../../assets/others/authentication1.png';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        createUser(data?.email, data?.password)
        .then(result => {
            const loggedUser = result.user; 
            console.log(loggedUser);
            Swal.fire({
                title: 'User Created Successfully',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        })
        .catch(err=>console.log(err));
        reset();
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
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
                                <input type="password" name='password' placeholder="Example: P@ssword1" className="input input-bordered" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 10,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} />
                                {errors.password && <span className='text-red-700'>Password is required and should have minimum 6 to 10 characters, and must be strong</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-orange-400 hover:bg-orange-600 text-white" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center pb-4 text-orange-400'><small>Already Have an Account? <Link to="/login" className='font-semibold hover:underline hover:text-blue-600'>Please Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;