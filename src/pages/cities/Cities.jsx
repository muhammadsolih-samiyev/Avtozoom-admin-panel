import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Cities.css';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [id, setId] = useState(null);
  const [data, setData] = useState({ name: "", slug: "", text: "", images: null });

  const token = localStorage.getItem('token');

  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getCities = () => {
    setLoading(true);
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
      .then(res => res.json())
      .then(data => {
        setCities(data?.data ?? []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleEdit = (item) => {
    setId(item?.id);
    setData({ name: item?.name, slug: item?.slug, text: item?.text, images: item?.image_src });
    setModalType('edit');
    setOpenModal(true);
  };

  const handleAdd = () => {
    setData({ name: "", slug: "", text: "", images: null });
    setModalType('add');
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    setId(id);
    setModalType('delete');
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data?.name ?? '');
    formData.append('text', data?.text ?? '');
    formData.append('slug', data?.slug ?? '');
    if (data?.images instanceof File) {
      formData.append('images', data?.images);
    }

    const url = modalType === 'edit' ? `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}` : 'https://autoapi.dezinfeksiyatashkent.uz/api/cities';
    const method = modalType === 'edit' ? 'PUT' : 'POST';

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method,
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res?.success) {
          handleClose();
          getCities();
          message.success(modalType === 'edit' ? "City updated successfully." : "City added successfully.");
        } else {
          message.error(modalType === 'edit' ? "Failed to update city." : "Failed to add city.");
        }
      })
      .catch(error => {
        console.error(`Error ${modalType === 'edit' ? 'updating' : 'adding'} city:`, error);
        message.error(`Failed to ${modalType === 'edit' ? 'update' : 'add'} city.`);
      });
  };

  const confirmDelete = () => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        if (res?.success) {
          const newCities = cities?.filter(city => city?.id !== id);
          setCities(newCities);
          message.success("City deleted successfully.");
          handleClose();
        } else {
          message.error("Failed to delete city.");
        }
      })
      .catch(error => {
        console.error('Error deleting city:', error);
        message.error("Failed to delete city.");
      });
  };

  return (
    <div>
      <div className="cities-adds">
        <h1>Cities</h1>
        <Button type="primary" className="add-button" onClick={handleAdd} icon={<PlusOutlined />}></Button>
      </div>
      <table className="customers">
        <thead>
          <tr>
            <th>No</th>
            <th>Images</th>
            <th>Name</th>
            <th>Text</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : (
            cities?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={`${urlImg}${item?.image_src}`} alt={item?.name} /></td>
                <td>{item?.name}</td>
                <td>{item?.text}</td>
                <td>{item?.slug}</td>
                <td>
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(item)}>Edit</Button>
                  <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(item?.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal
        title={modalType === 'edit' ? "Edit City" : modalType === 'add' ? "Add City" : "Delete City"}
        visible={openModal}
        onCancel={handleClose}
        footer={
          modalType === 'delete' ? [
            <Button key="cancel" onClick={handleClose}>Cancel</Button>,
            <Button key="delete" type="primary" danger onClick={confirmDelete}>Delete</Button>
          ] : null
        }
      >
        {modalType !== 'delete' ? (
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={data?.name ?? ''} onChange={e => setData({ ...data, name: e.target.value })} />
            <label>Text:</label>
            <input type="text" value={data?.text ?? ''} onChange={e => setData({ ...data, text: e.target.value })} />
            <label>Slug:</label>
            <input type="text" value={data?.slug ?? ''} onChange={e => setData({ ...data, slug: e.target.value })} />
            <label>Image:</label>
            <input type="file" onChange={e => setData({ ...data, images: e.target.files[0] })} accept="image/*" />
            <Button type="primary" htmlType="submit">{modalType === 'edit' ? "Update" : "Add"}</Button>
          </form>
        ) : (
          <p>Are you sure you want to delete this city?</p>
        )}
      </Modal>
    </div>
  );
};

export default Cities;

