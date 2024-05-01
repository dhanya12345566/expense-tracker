import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/mutations/user.mutation";
import toast from "react-hot-toast";

// Import images
import bca1Image from 'C:/Users/USER/OneDrive/Desktop/redo/bca13.png';
import anotherImage from 'C:/Users/USER/OneDrive/Desktop/redo/rich.png';
import bca3Image from 'C:/Users/USER/OneDrive/Desktop/redo/bca4.png'; // Import the new image

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [login, { loading }] = useMutation(LOGIN, {
        refetchQueries: ["GetAuthenticatedUser"],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            await login({ variables: { input: loginData } });
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            

            {/* First image section */}
            <div className='hidden md:flex items-center justify-center p-10'> {/* First image section */}
                <img
                    src={bca1Image}
                    alt='Description of the image'
                    className='w-auto h-auto'
                    style={{ width: '200px', height: '200px' }}
                />
            </div>

            {/* Login box section */}
            <div className='flex items-center justify-center bg-gray-100 rounded-lg p-6 mx-4 md:mx-0'> {/* Center login box */}
                <div className='max-w-md w-full'>
                    <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Login</h1>
                    <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
                        Welcome back! Log in to your account
                    </h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <InputField
                            label='Username'
                            id='username'
                            name='username'
                            value={loginData.username}
                            onChange={handleChange}
                        />
                        <InputField
                            label='Password'
                            id='password'
                            name='password'
                            type='password'
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <div>
                            <button
                                type='submit'
                                className='w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </form>
                    <div className='mt-4 text-sm text-gray-600 text-center'>
                        <p>
                            {"Don't"} have an account?{" "}
                            <Link to='/signup' className='text-black hover:underline'>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Second image section */}
            <div className='hidden md:flex items-center justify-center p-10'> {/* Second image section */}
                <img
                    src={anotherImage}
                    alt='Description of the new image'
                    className='w-auto h-auto'
                    style={{ width: '200px', height: '200px' }}
                />
            </div>
            
        </div>
    );
};

export default LoginPage;
