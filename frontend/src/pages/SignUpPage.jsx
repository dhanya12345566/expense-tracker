import { useState } from "react";
import { Link } from "react-router-dom";
import RadioButton from "../components/RadioButton";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/mutations/user.mutation";
import toast from "react-hot-toast";

// Import the image file to be displayed in the top-left corner of the page
import bca3Image from 'C:/Users/USER/OneDrive/Desktop/redo/bca4.png';

const SignUpPage = () => {
    // State to hold form input data
    const [signUpData, setSignUpData] = useState({
        name: "",
        username: "",
        password: "",
        gender: "",
    });

    // GraphQL mutation for signing up a new user
    const [signup, { loading }] = useMutation(SIGN_UP, {
        refetchQueries: ["GetAuthenticatedUser"],
    });

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the sign-up mutation
            await signup({
                variables: {
                    input: signUpData,
                },
            });
        } catch (error) {
            // Handle error during sign-up
            console.error("Error:", error);
            toast.error(error.message);
        }
    };

    // Handler for input changes
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "radio") {
            // Handle radio button change for gender
            setSignUpData((prevData) => ({
                ...prevData,
                gender: value,
            }));
        } else {
            // Handle other input changes
            setSignUpData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    return (
        <div className='h-screen flex justify-center items-center relative'> {/* Container with relative positioning */}
            {/* Add bca3 image in the top-left corner */}
            <div className='absolute top-100 left-20 p-4'> {/* Positioning classes */}
                <img src={bca3Image} alt='Top-left image' style={{ width: '300px', height: '300px' }} />
            </div>

            {/* Main form container */}
            <div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
                <div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
                    <div className='max-w-md w-full p-6'>
                        {/* Header */}
                        <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Sign Up</h1>
                        <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
                            Join to keep track of your expenses
                        </h1>
                        
                        {/* Form for signing up */}
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            {/* Full Name input */}
                            <InputField
                                label='Full Name'
                                id='name'
                                name='name'
                                value={signUpData.name}
                                onChange={handleChange}
                            />
                            {/* Username input */}
                            <InputField
                                label='Username'
                                id='username'
                                name='username'
                                value={signUpData.username}
                                onChange={handleChange}
                            />

                            {/* Password input */}
                            <InputField
                                label='Password'
                                id='password'
                                name='password'
                                type='password'
                                value={signUpData.password}
                                onChange={handleChange}
                            />

                            {/* Gender selection */}
                            <div className='flex gap-10'>
                                <RadioButton
                                    id='male'
                                    label='Male'
                                    name='gender'
                                    value='male'
                                    onChange={handleChange}
                                    checked={signUpData.gender === "male"}
                                />
                                <RadioButton
                                    id='female'
                                    label='Female'
                                    name='gender'
                                    value='female'
                                    onChange={handleChange}
                                    checked={signUpData.gender === "female"}
                                />
                            </div>

                            {/* Submit button */}
                            <div>
                                <button
                                    type='submit'
                                    className='w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Sign Up"}
                                </button>
                            </div>
                        </form>

                        {/* Link to the login page */}
                        <div className='mt-4 text-sm text-gray-600 text-center'>
                            <p>
                                Already have an account?{" "}
                                <Link to='/login' className='text-black hover:underline'>
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
