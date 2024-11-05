import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Modal } from 'antd';
import axios from 'axios';
import { CheckCircleOutlined } from '@ant-design/icons'; // Importing tick mark icon

const { Option } = Select;

function RegistrationPage() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:3002/api/register/create', values);
      // message.success('Registration successful!');
      form.resetFields();
      setIsModalVisible(true); // Show modal on successful registration
      setTimeout(() => {
        setIsModalVisible(false); // Close modal after 3 seconds
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      message.error('Registration failed.');
    }
  };

  return (
    <div className="bg-blue-600 text-white p-8 text-center font-oswald">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-lg mx-auto my-10 font-oswald">
        <h2 className="font-oswald text-3xl font-semibold text-center text-blue-800">Register Now</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6 font-oswald"
        >
          <Form.Item name="name" label={<span className="font-oswald">Name</span>} rules={[{ required: true }]}>
            <Input className="font-oswald" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item name="email" label={<span className="font-oswald">Email</span>} rules={[{ required: true, type: 'email' }]}>
            <Input className="font-oswald" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="contact" label={<span className="font-oswald">Contact No.</span>} rules={[{ required: true }]}>
            <Input className="font-oswald" placeholder="Enter your contact number" />
          </Form.Item>
          <Form.Item name="organisation" label={<span className="font-oswald">Organisation</span>} rules={[{ required: true }]}>
            <Input className="font-oswald" placeholder="Enter your organisation name" />
          </Form.Item>
          <Form.Item name="delegates" label={<span className="font-oswald">No. of Delegates</span>} rules={[{ required: true }]}>
            <Select className="font-oswald" placeholder="Select delegate type">
              <Option value="Regular" className="font-oswald">Regular</Option>
              <Option value="VIP" className="font-oswald">VIP</Option>
              <Option value="Student" className="font-oswald">Student</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 font-oswald">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Modal for confirmation */}
      <Modal
        visible={isModalVisible}
        footer={null} // No footer since it closes automatically
        onCancel={() => setIsModalVisible(false)} // Close on clicking outside
        closable={false} // Disable close button
        centered // Center modal vertically and horizontally
      >
        <div className="flex flex-col items-center justify-center">
          <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
          <span className="font-oswald text-lg">Registration successful!</span>
        </div>
      </Modal>
    </div>
  );
}

export default RegistrationPage;
