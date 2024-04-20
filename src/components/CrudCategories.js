import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";

function CrudCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    slug: "",
    image: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
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
        "https://arba-dev-backend-1.onrender.com/api/categories"
      );
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://arba-dev-backend-1.onrender.com/api/categories",
        newCategory
      );
      setCategories([...categories, newCategory]);
      setNewCategory({
        name: "",
        slug: "",
        image: "",
      });
      setShowdialog(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const startEdit = (category) => {
    setEditCategoryId(category._id);
    setEditedCategory({
      name: category.name,
      slug: category.slug,
      image: category.image,
    });
  };

  const saveEditedCategory = async (category) => {
    try {
      const updatedCategory = { ...category, ...editedCategory };
      await axios.patch(
        `https://arba-dev-backend-1.onrender.com/api/categories/${category._id}`,
        updatedCategory
      );
      const updatedCategories = categories.map((c) =>
        c._id === category._id ? updatedCategory : c
      );
      setCategories(updatedCategories);
      setEditCategoryId(null);
      setEditedCategory({
        name: "",
        slug: "",
        image: "",
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const cancelEdit = () => {
    setEditCategoryId(null);
    setEditedCategory({
      name: "",
      slug: "",
      image: "",
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

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(
        `https://arba-dev-backend-1.onrender.com/api/categories/${categoryId}`
      );
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const renderCategoryRows = () => {
    return categories.map((category) => (
      <tr key={category._id}>
        <td>
          <img
            src={category.image}
            alt={category.name}
            style={{ width: "100px", height: "100px" }}
          />
        </td>
        <td>{category.name}</td>
        <td>{category.slug}</td>
        <td>
          {editCategoryId === category._id ? (
            <div>
              <input
                type="text"
                value={editedCategory.name}
                onChange={(e) =>
                  setEditedCategory({ ...editedCategory, name: e.target.value })
                }
              />
              <input
                type="text"
                value={editedCategory.slug}
                onChange={(e) =>
                  setEditedCategory({ ...editedCategory, slug: e.target.value })
                }
              />
              <input
                type="text"
                value={editedCategory.image}
                onChange={(e) =>
                  setEditedCategory({
                    ...editedCategory,
                    image: e.target.value,
                  })
                }
              />
              <button
                onClick={() => saveEditedCategory(category)}
                style={button}
              >
                Save
              </button>
              <button onClick={() => cancelEdit()} style={button}>
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => startEdit(category)} style={button}>
                Edit
              </button>
              <button onClick={() => handleDelete(category._id)} style={button}>
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
        <div className="categoryDialog">
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <h1 style={{ textAlign: "center", marginTop: "0px" }}>
            Create Category
          </h1>
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
              name="name"
              style={inputStyle}
              value={newCategory.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="slug"
              style={inputStyle}
              value={newCategory.slug}
              onChange={handleChange}
              placeholder="Slug"
              required
            />
            <input
              type="text"
              name="image"
              style={inputStyle}
              value={newCategory.image}
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
              Create Category
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
      <h1 style={{ textAlign: "center" }}>Category List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="category-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderCategoryRows()}</tbody>
        </table>
      )}
    </>
  );
}

export default CrudCategories;

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
