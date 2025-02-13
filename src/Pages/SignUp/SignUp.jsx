import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const SignUp = () => {
    const axisPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updatedUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updatedUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axisPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');

                                    reset();

                                    Swal.fire({
                                        title: "Drag me!",
                                        icon: "User created successfully",
                                        draggable: true
                                    });
                                    navigate('/');

                                }
                            })
                        // console.log('user profile info updated')

                    })
                    .catch(error => {
                        console.log(error);

                    })

            })
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Menu</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="name" name='name' placeholder="name" className="input input-bordered" />

                                {errors.name && <span className='text-red-600 font-bold'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input {...register("photoURL", { required: true })} type="photo" placeholder="Photo URL" className="input input-bordered" />

                                {errors.photoURL && <span className='text-red-600 font-bold'> photoURL is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600 font-bold'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })} type="password" placeholder="password" className="input input-bordered" />

                                {errors.password?.type === 'required' && <p className='text-red-600 font-bold'> Password is required</p>}

                                {errors.password?.type === 'minLength' && <p className='text-red-600 font-bold'> Password must be 6 characters</p>}

                                {errors.password?.type === 'maxLength' && <p className='text-red-600 font-bold'> Password must be  less than 20 characters</p>}

                                {errors.password?.type === 'pattern' && <p className='text-red-600 font-bold'> Password must have one Upparcase,one number,one lowercase & one special characters</p>}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value='SignUp' />

                            </div>
                        </form>
                        <p className='px-10'><small className='font-bold'>Already have an account <Link className="text-blue-700 font-bold " to="/login">Login </Link ></small></p>
                             <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;