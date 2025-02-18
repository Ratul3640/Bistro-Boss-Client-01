import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axisSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axisSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h2 className="text-3xl">Total Payments: {payments.lenght}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th></th>
                            <th>price</th>
                            <th>TransactionID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)}


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;