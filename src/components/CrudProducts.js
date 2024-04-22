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
  const [showDialog, setShowdialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://arba-dev-backend-1.onrender.com/api/products"
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
        "https://arba-dev-backend-1.onrender.com/api/products",
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
        `https://arba-dev-backend-1.onrender.com/api/products/${product._id}`,
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

  const handleDialog = () => {
    setShowdialog(true);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setShowdialog(false);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://arba-dev-backend-1.onrender.com/api/products/${productId}`
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
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => saveEditedProduct(product)}
                  style={button}
                >
                  Save
                </button>
                <button onClick={() => cancelEdit()} style={button}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => startEdit(product)} style={button}>
                Edit
              </button>
              <button onClick={() => handleDelete(product._id)} style={button}>
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <>
      {showDialog && (
        <div className="ProductDialog">
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <h1 style={{ textAlign: "center" }}>Create Products</h1>
          <form
            onSubmit={handleSubmit}
            style={{
              margin: "auto",
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "0%",
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
              type="number"
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
            <button
              type="submit"
              style={{
                padding: "8px",
                borderRadius: "5px",
                marginTop: "30px",
                backgroundColor: "#00abc5",
                color: "white",
                borderstyle: "none",
                border: "1px solid #00abc5",
              }}
            >
              Create Product
            </button>
          </form>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={button} onClick={handleRefresh}>
          Refresh
        </button>
        <button style={button} onClick={handleDialog}>
          Add
        </button>
      </div>

      <h1 style={{ textAlign: "center" }}>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="product-table">
          <thead style={{ backgroundColor: "red" }}>
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

const button = {
  padding: "8px",
  borderRadius: "5px",
  marginTop: "30px",
  backgroundColor: "#00abc5",
  color: "white",
  borderstyle: "none",
  border: "1px solid #00abc5",
  cursor: "pointer",
};
