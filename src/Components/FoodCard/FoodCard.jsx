// import React, { useContext } from 'react';
// import { AuthContext } from '../../Providers/AuthProvider';

import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";



const FoodCard = ({ item }) => {
    const { _id, image, price, name, recipe } = item;
    const { user } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axisSecure = useAxiosSecure();
    const [,refetch]=useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            // console.log(user.email, food)

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axisSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        let timerInterval;
                        Swal.fire({
                            title: "food order Confirmed",
                            html: `${name}added to your cart`,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                        });
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...You are not login",
                text: "Please login add to the cart?",
                footer: '<a href="#">Why do I have this issue?</a>'
            })
                .then(result => {
                    if (result.isConfirmed) {
                        navigate('/login', { state: { form: location } })
                    }
                })

        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className='bg-stone-900 absolute right-0 mr-4 mt-4 px-4 rounded text-white'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleAddToCart}
                        className='btn btn-outline border-0 bg-slate-200 border-orange-400 border-b-4'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;