import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";

function CrudProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/mystore/products");
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://arba-dev-backend.onrender.com/api/products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://arba-dev-backend.onrender.com/api/products",
        newProduct
      );
      setProducts([...products, newProduct]);
      setNewProduct({
        title: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const startEdit = (product) => {
    setEditProductId(product._id);
    setEditedProduct({
      title: product.title,
      price: product.price,
      description: product.description,
    });
  };

  const saveEditedProduct = async (product) => {
    try {
      const updatedProduct = { ...product, ...editedProduct };
      await axios.patch(
        `https://arba-dev-backend.onrender.com/api/products/${product._id}`,
        updatedProduct
      );
      const updatedProducts = products.map((p) =>
        p._id === product._id ? updatedProduct : p
      );
      setProducts(updatedProducts);
      setEditProductId(null);
      setEditedProduct({
        title: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setEditedProduct({
      title: "",
      price: "",
      description: "",
    });
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://arba-dev-backend.onrender.com/api/products/${productId}`
      );
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const renderProductRows = () => {
    return products.map((product) => (
      <tr key={product._id}>
        <td>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100px", height: "100px" }}
          />
        </td>
        <td>{product.price}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>
          {editProductId === product._id ? (
            <div>
              <input
                type="text"
                value={editedProduct.title}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, title: e.target.value })
                }
              />
              <input
                type="text"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, price: e.target.value })
                }
              />
              <input
                type="text"
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
              <button onClick={() => saveEditedProduct(product)}>Save</button>
              <button onClick={() => cancelEdit()}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={() => startEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Create Products</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name="title"
            style={inputStyle}
            value={newProduct.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="price"
            style={inputStyle}
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="description"
            style={inputStyle}
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="image"
            style={inputStyle}
            value={newProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
          <button type="submit">Create Product</button>
        </form>
      </div>
      <h1 style={{ textAlign: "center" }}>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Price</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderProductRows()}</tbody>
        </table>
      )}
    </>
  );
}

export default CrudProducts;

const inputStyle = {
  padding: "2px",
  borderRadius: "5px",
  marginTop: "20px",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "2px solid #0398f3",
};
