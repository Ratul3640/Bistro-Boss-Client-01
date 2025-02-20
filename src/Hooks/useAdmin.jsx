import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = UseAuth()
    const axisSecure = useAxiosSecure()

    const { data: isAdmin, ispending: isAdminLogin } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axisSecure.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLogin]
};

export default useAdmin;