import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Available.css";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { BASEURL, IMAGEURL } from "../../../../url/BaseUrl";

function Available() {
  // State variables to manage form fields, pop-up visibility, and available foods
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility
  const [foods, setFoods] = useState([]);

  // Function to fetch available foods
  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${BASEURL}/getFoods`);
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching available foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('image', image);

      const response = await axios.post(
        `${BASEURL}/addFood`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log("Food item added successfully", response);

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
      setShowPopup(false);

      // Fetch updated list of available foods
      fetchFoods();
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`${BASEURL}/deleteFood/${foodId}`);
      // Fetch updated list of available foods after deletion
      fetchFoods();
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <div>
      <div onClick={() => setShowPopup(true)} className="icon-container">
        <FaPlus className="add-icon" />
        <h2>Add Food</h2>
      </div>
      {showPopup && (
        <div className="popup">
          <FaTimes className="close-icon" onClick={() => setShowPopup(false)} />

          <h2>Add New Food</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">About:</label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit">Add Food</button>
          </form>
        </div>
      )}

      <div className="food-cards-container">
        {foods &&
          foods.map((food) => (
            <div key={food._id} className="food-card">
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <p>{food.price}/-</p>
                <p>{food.category}</p>
                <div className="delete-button">
                <button onClick={() => handleDelete(food._id)}>
                  <FaTrash /><p>Delete</p>
                </button>
              </div>
              </div>
              <div className="food-image">
                <img src={`${IMAGEURL}/${food.image}`} alt={food.name} />
              </div>

            </div>
          ))}
      </div>
    </div>
  );
}

export default Available;
