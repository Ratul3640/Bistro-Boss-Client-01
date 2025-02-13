import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './UseAuth'

const useCart = () => {
    const axisSecure = useAxiosSecure()
    const { user } = useAuth();
    const { refetch, data: cart = [] } = useQuery({
        querykey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axisSecure.get(`/carts?email=${user.email}`)
            return res.data;
        }
    })
    return [cart, refetch]
};

export default useCart;