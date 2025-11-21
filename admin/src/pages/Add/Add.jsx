import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://3.237.38.212:4000";

  const [image, setImage] = useState(false); // file ảnh

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cơm",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    // Nếu người dùng chọn file ảnh
    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${url}/api/food/create`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Cơm",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" className="image-label">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Preview"
              className="image-preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category"> 
              <option value="Cơm">Cơm</option> 
            <option value="Món Nước">Món Nước</option>
            <option value="Món Cuốn">Món Cuốn</option>
            <option value="Lẩu">Lẩu</option>
            <option value="Đồ Nướng">Đồ Nướng</option>
            <option value="Ăn Vặt">Ăn Vặt</option>
            <option value="Bánh Ngọt">Bánh Ngọt</option>
            <option value="Đồ Uống">Đồ Uống</option>
            
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
