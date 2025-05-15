import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://saikatportfoliobackend.vercel.app/',
    withCredentials: true,
})

export default axiosInstance