import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ name_en: '', name_ru: '', image: null });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const urlImg = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/';
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODYxNTMzOCwiZXhwIjoxNzUwMTUxMzM4fQ.8VHqHugzBuuXAF2A01S6etFMf2Ou_YD1OiZn3Uc96oI'; 

  const getCategory = () => {
    setLoading(true);
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleEdit = (item) => {
    setId(item.id);
    setData({ name_en: item.name_en, name_ru: item.name_ru, image: item.image_src });
    setOpenEditModal(true);
  };

  const handleAdd = () => {
    setData({ name_en: '', name_ru: '', image: null });
    setOpenAddModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const newCategories = categories.filter((category) => category.id !== id);
          setCategories(newCategories);
          message.success('Category deleted successfully.');
        } else {
          message.error('Failed to delete category.');
        }
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        message.error('Failed to delete category.');
        setOpenDeleteModal(false);
      });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    if (data.image instanceof File) {
      formData.append('images', data.image);
    }

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleClose();
          setCategories([...categories, res.data]); 
          message.success('Category added successfully.');
        } else {
          message.error('Failed to add category.');
        }
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        message.error('Failed to add category.');
      });
  };

  const editCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    if (data.image instanceof File) {
      formData.append('images', data.image);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'PUT',
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleClose();
          getCategory(); 
          message.success('Category updated successfully.');
        } else {
          message.error('Failed to update category.');
        }
      })
      .catch((error) => {
        console.error('Error updating category:', error);
        message.error('Failed to update category.');
      });
  };

  const handleClose = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };

  const confirmDelete = (id) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const deleteCategory = () => {
    handleDelete(id);
  };

  return (
    <div className="category">
      <div className="category-adds">
        <h1>Categories</h1>
        <Button
          type="primary"
          className="add-category-btn"
          onClick={handleAdd}
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </div>
      <table className="customers">
        <thead>
          <tr>
            <th>No</th>
            <th>Name EN</th>
            <th>Name RU</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">
                <div className="spinner"></div>
              </td>
            </tr>
          ) : (
            categories.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name_en}</td>
                <td>{item.name_ru}</td>
                <td>
                  <img src={`${urlImg}${item.image_src}`} alt={item.name_en} />
                </td>
                <td>
                  <Button
                    type="link"
                    className="edit"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    className="delete"
                    icon={<DeleteOutlined />}
                    onClick={() => confirmDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal title="Edit Category" visible={openEditModal} onCancel={handleClose} footer={null}>
        <form onSubmit={editCategory}>
          <label>Name EN:</label>
          <input
            type="text"
            value={data.name_en}
            onChange={(e) => setData({ ...data, name_en: e.target.value })}
          />
          <label>Name RU:</label>
          <input
            type="text"
            value={data.name_ru}
            onChange={(e) => setData({ ...data, name_ru: e.target.value })}
          />
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            accept="image/*"
          />
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Update
            </button>
          </div>
        </form>
      </Modal>

      <Modal title="Add Category" visible={openAddModal} onCancel={handleClose} footer={null}>
        <form onSubmit={addCategory}>
          <label>Name EN:</label>
          <input
            type="text"
            value={data.name_en}
            onChange={(e) => setData({ ...data, name_en: e.target.value })}
          />
          <label>Name RU:</label>
          <input
            type="text"
            value={data.name_ru}
            onChange={(e) => setData({ ...data, name_ru: e.target.value })}
          />
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            accept="image/*"
          />
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Add
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Delete Category"
        visible={openDeleteModal}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={deleteCategory}>
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
};

export default Category;
