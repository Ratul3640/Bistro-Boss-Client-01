import React from 'react';

const MenuItems = ({ item }) => {
    const { image, price, name, recipe } = item;
    return (
        <div className='space-x-4 flex'>
            <img style={{ borderRadius: '0 200px 200px 200px' }} className='w-[120px] h-[120px]' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}--------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>{price}</p>
        </div>
    );
};

export default MenuItems;