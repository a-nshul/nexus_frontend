import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import axios from 'axios';

function SchedulePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [form] = Form.useForm();

  // Fetch events from API when the component mounts
    useEffect(() => {
      const fetchEvents = async () => {
          try {
              const response = await axios.get('http://localhost:3002/api/event');
              console.log(response.data); // Log the response to verify structure
              const events = response.data.events || [];
              if (Array.isArray(events)) {
                  setSchedule(events);
              } else {
                  message.error('Event data is missing or incomplete.');
              }
          } catch (error) {
              console.error('Failed to fetch events:', error);
              message.error('Failed to fetch events. Please try again.');
          }
      };
  
      fetchEvents();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post('http://localhost:3002/api/event/create', {
        title: values.title,
        date: values.date,
        description: values.description,
        email: values.email,
      });
      message.success('Event created successfully!');
      setSchedule([...schedule, response.data.event]); // Add the new event to the schedule
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create event. Please try again.');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="bg-blue-600 text-white p-8 text-center font-oswald">
      <div className="bg-gray-100 p-8 md:p-12 rounded-lg shadow-lg max-w-3xl mx-auto my-10 font-oswald relative">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-oswald text-center text-blue-800">Event Schedule</h2>
          <Button type="primary" onClick={showModal} className='font-oswald'>
            Create Event
          </Button>
        </div>
        <ul className="mt-6 space-y-6">
          {schedule.length > 0 ? (
              schedule.map((item) => (
                  <li key={item._id} className="font-oswald bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                      <p className="text-xl font-oswald text-gray-800">
                          <strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "No Date Available"}
                      </p>
                      <p className="text-lg text-gray-700 font-oswald">
                          <strong>Title:</strong> {item.title || "No Title Available"}
                      </p>
                      <p className="text-lg text-gray-700 font-oswald">
                          <strong>Description:</strong> {item.description || "No Description Available"}
                      </p>
                      <p className="text-lg text-gray-700 font-oswald">
                          <strong>Email:</strong> {item.email || "No Email Available"}
                      </p>
                  </li>
              ))
          ) : (
              <p className="text-gray-800">No events available.</p>
          )}
      </ul>

      </div>

      {/* Modal for creating an event */}
      <Modal
        title="Create New Event"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className='font-oswald '
      >
        <Form form={form} layout="vertical" className="font-oswald">
          <Form.Item
            name="title"
            label={<span className="font-oswald">Event Title</span>}
            rules={[{ required: true, message: 'Please input the event title!' }]}
          >
            <Input className="font-oswald" placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            name="date"
            label={<span className="font-oswald">Event Date</span>}
            rules={[{ required: true, message: 'Please select the event date!' }]}
          >
            <Input type="datetime-local" className="font-oswald" placeholder="Select event date" />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="font-oswald">Event Description</span>}
            rules={[{ required: true, message: 'Please input the event description!' }]}
          >
            <Input.TextArea rows={4} className="font-oswald" placeholder="Enter event description" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="font-oswald">Contact Email</span>}
            rules={[
              { required: true, message: 'Please input the contact email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input className="font-oswald" placeholder="Enter contact email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SchedulePage;
