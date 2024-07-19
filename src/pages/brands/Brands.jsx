import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ title: "", images: null });

  const token = localStorage.getItem('token');
 
  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getBrands = () => {
    setLoading(true);
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
      .then(res => res.json())
      .then(data => {
        setBrands(data?.data ?? []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  const handleEdit = (item) => {
    setId(item?.id);
    setData({ title: item?.title, images: item?.image_src });
    setModalType('edit');
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        if (res?.success) {
          const newBrands = brands.filter(brand => brand?.id !== id);
          setBrands(newBrands);
          message.success("Brand deleted successfully.");
        } else {
          message.error("Failed to delete brand.");
        }
      })
      .catch(error => {
        console.error('Error deleting brand:', error);
        message.error("Failed to delete brand.");
      });
  };

  const handleAdd = () => {
    setModalType('add');
    setData({ title: "", images: null });
    setOpenModal(true);
  };

  const addBrand = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data?.title);
    if (data?.images instanceof File) {
      formData.append('images', data?.images);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res?.success) {
          handleClose();
          getBrands();
          message.success("Brand added successfully.");
        } else {
          message.error("Failed to add brand.");
        }
      })
      .catch(error => {
        console.error('Error adding brand:', error);
        message.error("Failed to add brand.");
      });
  };

  const editBrand = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data?.title);
    if (data?.images instanceof File) {
      formData.append('images', data?.images);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "PUT",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res?.success) {
          handleClose();
          getBrands();
          message.success("Brand updated successfully.");
        } else {
          message.error("Failed to update brand.");
        }
      })
      .catch(error => {
        console.error('Error updating brand:', error);
        message.error("Failed to update brand.");
      });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const confirmDelete = (id) => {
    setId(id);
    setModalType('delete');
    setOpenModal(true);
  };

  const deleteBrand = () => {
    handleDelete(id);
    setOpenModal(false);
  };

  return (
    <div>
      <div className="brands-adds">
        <h1>Brands</h1>
        <Button type="primary" className="add-button" onClick={handleAdd} icon={<PlusOutlined />}></Button>
      </div>
      <table className="customers">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            brands.map((item, index) => (
              <tr key={item?.id}>
                <td>{index + 1}</td>
                <td><img src={`${urlImg}${item?.image_src}`} alt={item?.title} style={{ width: '50px' }} /></td>
                <td>{item?.title}</td>
                <td>
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(item)}>Edit</Button>
                  <Button type="link" icon={<DeleteOutlined />} onClick={() => confirmDelete(item?.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal
        title={modalType === 'edit' ? "Edit Brand" : modalType === 'add' ? "Add Brand" : "Delete Brand"}
        open={openModal}
        onCancel={handleClose}
        footer={
          modalType === 'delete' ? [
            <Button key="cancel" onClick={handleClose}>
              Cancel
            </Button>,
            <Button key="delete" type="primary" danger onClick={deleteBrand}>
              Delete
            </Button>
          ] : null
        }
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this brand?</p>
        ) : (
          <form onSubmit={modalType === 'edit' ? editBrand : addBrand}>
            <label>Title:</label>
            <input type="text" value={data?.title} onChange={e => setData({ ...data, title: e.target?.value })} />
            <label>Image:</label>
            <input type="file" onChange={e => setData({ ...data, images: e.target?.files[0] })} accept="image/*" />
            <Button type="primary" htmlType="submit">{modalType === 'edit' ? "Update" : "Add"}</Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Brands;
