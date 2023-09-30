import { useContext } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const savedUser = { name: loggedInUser?.displayName, email: loggedInUser?.email };

                fetch('https://bistro-boss-server-nine-pink.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })

            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="divider w-4/5 mx-auto"></div>
            <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
                <button className="btn btn-circle btn-outline mx-2">
                    <FaFacebook />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;