import { Table, Button, message, Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

function Cars() {
  const [cars, setCars] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [categroy , setCategory] = useState([])
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    color: '',
    city: '',
    year: '',
    seconds: '',
    speed: '',
    maxPeople: '',
    motors: '',
    transmission: '',
    driveSide: '',
    engine: '',
    premiumProtectionPrice: '',
    priceAED: '',
    priceUSD: '',
    priceUSDold: '',
    description: '',
    carNumber: '',
  });

  useEffect(() => {
    getCities();
    getCategotry()
  }, []);
  const getCategotry = () =>{
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato so\'rov yuborildi');
      }
      return response.json();
    })
    .then(data => {
      console.log(data?.data);
      setCategory(data?.data || []);
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
      message.error('Ma\'lumotlar yuklanishida xatolik yuz berdi');
    });
  }
  const getBrand = () =>{
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato so\'rov yuborildi');
      }
      return response.json();
    })
    .then(data => {
      // console.log(data?.data);
      setCategory(data?.data || []);
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
      message.error('Ma\'lumotlar yuklanishida xatolik yuz berdi');
    });
  }



  const getCities = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then(response => {
        if (!response.ok) {
          throw new Error('Xato so\'rov yuborildi');
        }
        return response.json();
      })
      .then(data => {
        console.log(data?.data);
        setCars(data?.data || []);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        message.error('Ma\'lumotlar yuklanishida xatolik yuz berdi');
      });
  };

  const postCities = () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('brand', formData.brand);
    formData.append('model', formData.model);
    formData.append('color', formData.color);
    formData.append('city', formData.city);
    formData.append('year', formData.year);
    formData.append('seconds', formData.seconds);
    formData.append('speed', formData.speed);
    formData.append('maxPeople', formData.maxPeople);
    formData.append('motors', formData.motors);
    formData.append('transmission', formData.transmission);
    formData.append('driveSide', formData.driveSide);
    formData.append('engine', formData.engine);
    formData.append('premiumProtectionPrice', formData.premiumProtectionPrice);
    formData.append('priceAED', formData.priceAED);
    formData.append('priceUSD', formData.priceUSD);
    formData.append('priceUSDold', formData.priceUSDold);
    formData.append('description', formData.description);
    formData.append('carNumber', formData.carNumber);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Tokenni headerga qo'shish
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato so\'rov yuborildi');
      }
      return response.json();
    })
    .then(data => {
      console.log(data?.data);
      setAddModal(false); 
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
      message.error('Ma\'lumotlar yuklanishida xatolik yuz berdi');
    });
  };

  const dataSource = cars.map((car, index) => ({
    key: index + 1,
    brandTitle: car?.brand?.title || 'Unknown',
    modelName: car?.model?.name || 'Unknown',
    color: car?.model?.color || 'Unknown',
    cityName: car?.city?.name || 'Unknown',
  }));

  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brandTitle',
      key: 'brandTitle',
    },
    {
      title: 'Model',
      dataIndex: 'modelName',
      key: 'modelName',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="primary">Edit</Button>
          <Button type="danger" style={{ marginLeft: 8 }}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postCities();
  };

  const openAddModal = () => {
    setAddModal(true);
  };

  const handleModalCancel = () => {
    setAddModal(false);
  };

  return (
    <div>
      <Modal
        title="Add Car"
        visible={addModal}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit}>Submit</Button>
        ]}
      >
        <Form layout="vertical" onSubmit={handleFormSubmit}>
        <Form.Item label="Category">
  <Select name="brand" onChange={handleInputChange} defaultValue={formData.brand}>
    {cars && cars.map((item, index) => (
      <Select.Option key={index} value={item?.categroy?.name_en}>{item?.category?.name_en}</Select.Option>
    ))}
  </Select>
</Form.Item>
<Form.Item label="Brand">
  <Select name="brand" onChange={handleInputChange} defaultValue={formData.brand}>
    {cars && cars.map((item, index) => (
      <Select.Option key={index} value={item?.brand?.title}>{item.name_en}</Select.Option>
    ))}
  </Select>
</Form.Item>
          <Form.Item label="Model">
            <Input name="model" value={formData.model} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Color">
            <Input name="color" value={formData.color} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="City">
            <Input name="city" value={formData.city} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Year">
            <Input name="year" value={formData.year} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Seconds">
            <Input name="seconds" value={formData.seconds} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Speed">
            <Input name="speed" value={formData.speed} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Max People">
            <Input name="maxPeople" value={formData.maxPeople} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Motors">
            <Input name="motors" value={formData.motors} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Transmission">
            <Input name="transmission" value={formData.transmission} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Drive Side">
            <Input name="driveSide" value={formData.driveSide} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Engine">
            <Input name="engine" value={formData.engine} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Premium Protection Price">
            <Input name="premiumProtectionPrice" value={formData.premiumProtectionPrice} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Price in AED">
            <Input name="priceAED" value={formData.priceAED} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Price in USD">
            <Input name="priceUSD" value={formData.priceUSD} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Price in USD(old)">
            <Input name="priceUSDold" value={formData.priceUSDold} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Description">
            <Input name="description" value={formData.description} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Car Number">
            <Input name="carNumber" value={formData.carNumber} onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={openAddModal}>Add Car</Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Cars;
