import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu'
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axisSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axisSecure.delete(`/menu/${item._id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    }
    return (
        <div>
            <SectionTitle heading="Manage All Items" subHeading="Hurry Up"></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Image</th>
                                <th>Irem Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {menu.map((item, index) => <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}

                                </td>
                                <td className='text-right'>${item.price}</td>
                                <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button
                                            className="btn btn-ghost btn-sm bg-orange-500"><FaEdit className='text-white ' />
                                        </button>
                                    </Link>
                                </td>

                                <td>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg "><MdDelete className='text-red-600' /></button>
                                </td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;