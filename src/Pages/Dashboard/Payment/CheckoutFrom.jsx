import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutFrom = () => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    const [transctionId, setTransctionId] = useState('');
    const elements = useElements();
    const axisSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = UseAuth();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axisSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    },
        [axisSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);

        }
        else {
            console.log('paymentMethod', paymentMethod);
            setError('');

        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonynmous',
                    name: user?.displayName || 'anonynmous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');

        }
        else {
            console.log("payment intent", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transction id', paymentIntent.id);
                setTransctionId(paymentIntent.id)


                // now save the payment in the database

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transctionId: paymentIntent.id,
                    date: new Date(),   //utc date convert.user momnet js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axisSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {

                    
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka paisha",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/PaymentHistory')
                }

            }



        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-xl btn-primary gap-4 my-4' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-600'>{error}</p>
            {transctionId && <p className='text-black-600 text-xl '>Your Transction id: <span className='text-green-600'>{transctionId}</span></p>}
        </form>
    );
};

export default CheckoutFrom;