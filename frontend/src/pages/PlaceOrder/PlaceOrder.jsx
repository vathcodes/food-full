import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    console.log("place order function called")
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items:orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Đặt hàng thất bại!");
    }
  }

  const navigate = useNavigate();
   
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);
  

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Thông Tin Giao Hàng</p>

        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Tên' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Họ' />
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Đường / Số nhà'/>

        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành phố' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Khu vực / Bang' />
        </div>

        <div className='multi-fields'>
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Mã bưu điện' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quốc gia' />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại'/>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Tổng Giỏ Hàng</h2>

          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{getTotalCartAmount()} $</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{getTotalCartAmount()===0?0:2} $</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2} $</b>
            </div>
          </div>

          <button type='submit'>TIẾP TỤC THANH TOÁN</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
