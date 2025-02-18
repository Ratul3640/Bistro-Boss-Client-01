import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from './CheckoutFrom';


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

    return (
        <div>
            <SectionTitle heading="payment" subHeading="Please pay to eat"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;