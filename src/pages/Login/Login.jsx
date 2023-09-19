import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginImg from '../../assets/others/authentication1.png';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
    };

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }

    return (
        <>
        <Helmet>
            <title>Bistro Boss | Login</title>
        </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <img src={loginImg} alt="Login Image" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>

                                <input type="text"
                                    ref={captchaRef} name="captcha" placeholder="Enter The Captcha" className="input input-bordered" />
                                <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-3 w-14'>Match</button>
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disable} className="btn bg-orange-400 hover:bg-orange-600 text-white" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center pb-4 text-orange-400'><small>New Here? <Link to="/signup" className='font-semibold hover:underline hover:text-blue-600'>Create an account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;