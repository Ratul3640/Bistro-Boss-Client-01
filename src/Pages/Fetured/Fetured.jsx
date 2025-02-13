import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import feturedImg from '../../assets/home/featured.jpg'
import './featured.css'

const Fetured = () => {
    return (
        <div className='featured-item bg-fixed  text-white pt-10 my-20'>
            <SectionTitle
                subHeading="Check it Out" heading="Fetured Item"></SectionTitle>
            <div className='md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36'>
                <div>
                    <img src={feturedImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20,2029</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p className=' my-4 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi hic asperiores eos consectetur, magni rem tenetur nostrum voluptatibus aliquid pariatur laborum laudantium numquam earum. Consequatur tempora assumenda eos eligendi corporis.</p>
                    <button className='btn btn-outline border-0 border-b-4'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Fetured;