import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { client } from '../sanityClient';

import logoWhite from '../assets/logowhite.png';
import loginVideo from '../assets/share.mp4';

const Login = () => {

    const navigate = useNavigate();

    const createOrGetUser = async (responce) => {
        const decoded = jwt_decode(responce.credential);
        const { name, picture, sub } = decoded;

        localStorage.setItem('user', JSON.stringify(decoded))

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }
        
        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', {replace: true})
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={loginVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />

                <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
                    <div className="p-5">
                        <img src={logoWhite} alt="logo" width="130px" />
                    </div>
                    <div className="shadow-2x1">
  
                                (<GoogleLogin
                                    onSuccess={(createOrGetUser)}
                                    onError={() => console.log('error')}
                                />)

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login