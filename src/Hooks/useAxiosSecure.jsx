import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';



const axisSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = UseAuth()
    axisSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stooped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config;

    },
        function (error) {
            return Promise.reject(error);
        }
    )

    axisSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);

    })
    return axisSecure;
};

export default useAxiosSecure;