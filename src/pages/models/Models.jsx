import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '../../index.css'
function Models() {
  const [model, setModel] = useState([]);
  const [brands, setBrands] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false); // Modal for adding/editing
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal for delete confirmation
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState(null); // State for the model being edited
  const [form] = Form.useForm();

  useEffect(() => {
    getModels();
    getBrands();
  }, []);

  const getModels = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then(response => {
        if (!response.ok) {
          throw new Error('Xato so\'rov yuborildi');
        }
        return response.json();
      })
      .then(data => {
        setModel(data?.data || []);
      })
      .catch(error => {
        console.error('Error fetching models:', error);
        message.error('Ma\'lumotlar yuklanishida xatolik yuz berdi');
      });
  };

  const getBrands = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then(response => {
        if (!response.ok) {
          throw new Error('Xato so\'rov yuborildi');
        }
        return response.json();
      })
      .then(data => {
        setBrands(data?.data || []);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
        message.error('Brendlar yuklanishida xatolik yuz berdi');
      });
  };

  const deleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const deleteCancel = () => {
    setOpenDeleteModal(false);
    setDeleteId(null);
  };

  const deleteOk = () => {
    deleteModel(deleteId);
    setOpenDeleteModal(false);
  };

  const deleteModel = (id) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato so\'rov yuborildi');
      }
      return response.json();
    })
    .then(data => {
      if (data?.success) {
        message.success("Muvaffaqiyatli o'chirildi !");
        getModels(); // Refresh the models list
        getBrands(); // Refresh the brands list if necessary
      } else {
        message.error(data?.message || "O'chirishda xatolik yuz berdi");
      }
    })
    .catch(error => {
      console.error('Error deleting model:', error);
      message.error('Modelni o\'chirishda xatolik yuz berdi');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const addModel = (values) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Ensure correct content type if sending JSON data
      },
      body: JSON.stringify(values) // Convert JavaScript object to JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato so\'rov yuborildi');
      }
      return response.json();
    })
    .then(data => {
      if (data?.success) {
        message.success("Model muvaffaqiyatli qo'shildi");
        getModels(); // Refresh the models list
        getBrands(); // Refresh the brands list if necessary
        form.resetFields(); // Reset form fields after successful submission
        setOpenAddModal(false); // Close the modal after successful submission
      } else {
        message.error(data?.message || "Model qo'shishda xatolik yuz berdi");
        setOpenAddModal(false); 
      }
    })
    .catch(error => {
      console.error('Error adding model:', error);
      message.error('Model qo\'shishda xatolik yuz berdi');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const updateModel = (id, values) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Ensure correct content type if sending JSON data
      },
      body: JSON.stringify(values) // Convert JavaScript object to JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato so\'rov yuborildi');
      }
      return response.json();
    })
    .then(data => {
      if (data?.success) {
        message.success("Model muvaffaqiyatli yangilandi");
        getModels(); // Refresh the models list
        getBrands(); // Refresh the brands list if necessary
        form.resetFields(); // Reset form fields after successful submission
        setOpenAddModal(false); // Close the modal after successful submission
      } else {
        message.error(data?.message || "Model yangilashda xatolik yuz berdi");
      }
    })
    .catch(error => {
      console.error('Error updating model:', error);
      message.error('Model yangilashda xatolik yuz berdi');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenAddModal(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values) => {
    if (currentModel) {
      updateModel(currentModel.id, values);
    } else {
      addModel(values);
    }
  };

  const handleAdd = () => {
    setCurrentModel(null);
    form.resetFields();
    setOpenAddModal(true);
  };

  const handleEdit = (record) => {
    setCurrentModel(record);
    form.setFieldsValue({
      name: record?.name,
      brand_id: record?.brand_id,
    });
    setOpenAddModal(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand_title',
      key: 'brand',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button className=' bg-green-700 text-white' icon={<EditOutlined className=''/>} style={{ marginRight: 8 }} onClick={() => handleEdit(record)} />
          <Button className='bg-red-700 text-white' icon={<DeleteOutlined />} onClick={() => deleteModal(record.id)} />
        </span>
      ),
    },
  ];

  const options = brands.map((brand) => ({
    value: brand.id,
    label: brand.title,
  }));

  return (
    <div>
     <div className="w-full flex justify-end mb-[20px]">
  <Button type="primary" onClick={handleAdd}>
    <PlusOutlined /> Add Model
  </Button>
</div>


      <Table dataSource={model} columns={columns} />

      <Modal
        title={currentModel ? "Modelni tahrirlash" : "Model qo'shish"}
        visible={openAddModal}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="name"
            label="Model nomi"
            rules={[{ required: true, message: 'Iltimos, model nomini kiriting!' }]}
          >
            <Input placeholder="Model nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="brand_id"
            label="Brend nomi"
            rules={[{ required: true, message: 'Iltimos, brend nomini tanlang!' }]}
          >
            <Select options={options} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="O'chirishni xoxlaysizmi?"
        visible={openDeleteModal}
        onOk={deleteOk}
        onCancel={deleteCancel}
        confirmLoading={loading}
      >
        <p>Modelni o'chirishga ishonchingiz komilmi?</p>
      </Modal>

      
    </div>
  );
}

export default Models;
