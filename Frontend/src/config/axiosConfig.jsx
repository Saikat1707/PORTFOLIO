import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://saikatportfoliobackend.vercel.app/',
    //new
    withCredentials: true,
})

export default axiosInstance