import React, { useEffect, useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                navigate("/myorders"); // Điều hướng tới trang "myorders" nếu thành công
            } else {
                window.location.replace("http://34.231.122.10:8000/"); // Điều hướng về trang chủ nếu thất bại
            }
        } catch (error) {
            console.error("Error during payment verification", error);
            window.location.replace("http://34.231.122.10:8000/"); // Điều hướng về trang chủ nếu có lỗi
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await verifyPayment();
        }
        fetchData();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify;
