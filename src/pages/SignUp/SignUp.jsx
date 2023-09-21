import { useForm } from 'react-hook-form';
import signupImg from '../../assets/others/authentication1.png';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {
    const navigate = useNavigate();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = data => {
        createUser(data?.email, data?.password)
            .then(() => {
                // const loggedUser = result.user;

                updateUserProfile(data?.name, data?.photoURL)
                    .then(() => {
                        const savedUser = { name: data?.name, email: data?.email };
                        fetch('http://localhost:5000/users', {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Created Successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    }).catch(err => console.log(err));
            })
            .catch(err => console.log(err));
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
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL" className="input input-bordered" {...register("photoURL", { required: true })} />
                                {errors.photoURL && <span className='text-red-700'>Photo URL is required</span>}
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
                        <SocialLogin />

                        <p className='text-center py-4 text-orange-400'><small>Already Have an Account? <Link to="/login" className='font-semibold hover:underline hover:text-blue-600'>Please Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;