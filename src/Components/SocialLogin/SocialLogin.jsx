import React from 'react';
import { FaGoogle } from "react-icons/fa";
import UseAuth from '../../Hooks/UseAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = UseAuth();
    const axisPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axisPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
            })
    }
    return (
        <div className='p-6 '>
            <div className='divider'></div>
            <button onClick={handleGoogleSignIn} className='btn'>
                <FaGoogle className='mr-2' />
                Google
            </button>
        </div>
    );
};

export default SocialLogin;