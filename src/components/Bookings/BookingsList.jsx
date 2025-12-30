import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Space, Tag, message, Modal } from 'antd';
import './BookingsList.css';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BookingForm from '../Forms/BookingForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleBookingSuccess = () => {
        setIsModalVisible(false);
        fetchBookings(); // Refresh the bookings list
        message.success('Booking created successfully!');
    };

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('Please log in to view bookings');
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/bookings', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setBookings(response.data.data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            message.error(error.response?.data?.message || 'Failed to load bookings');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            key: 'date',
            render: (date) => date ? new Date(date).toLocaleString() : 'N/A',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (!status) return <Tag>PENDING</Tag>;
                const statusMap = {
                    'pending': { color: 'orange', text: 'PENDING' },
                    'confirmed': { color: 'green', text: 'CONFIRMED' },
                    'cancelled': { color: 'red', text: 'CANCELLED' },
                    'completed': { color: 'blue', text: 'COMPLETED' }
                };
                const statusInfo = statusMap[status.toLowerCase()] || { color: 'default', text: status.toUpperCase() };
                return (
                    <Tag color={statusInfo.color}>
                        {statusInfo.text}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    {/* <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/family/book-service/edit/${record.id}`)}
                        title="Edit"
                    >
                        Edit
                    </Button> */}
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        className='text-red'
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this booking?')) {
                                handleDelete(record.id);
                            }
                        }}
                        title="Delete"
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success('Booking deleted successfully');
            await fetchBookings();
        } catch (error) {
            console.error('Error deleting booking:', error);
            message.error(error.response?.data?.message || 'Failed to delete booking');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    // onClick={showModal}
                    onClick={() => navigate('/family/book-service')}
                    size="large"
                    className="justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed h-11"
                >
                    New Booking
                </Button>
                {/* <Modal
                    title="New Booking"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={600}
                    destroyOnClose
                >
                    <div className="p-4">
                        <BookingForm onSuccess={handleBookingSuccess} />
                    </div>
                </Modal> */}
            </div>
            <div className="bg-white rounded-lg shadow">
                <Table
                    columns={columns}
                    dataSource={bookings}
                    loading={loading}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    className="bookings-table"
                    bordered
                    style={{
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}
                    rowClassName={() => 'table-row'}
                    locale={{
                        emptyText: (
                            <div className="py-8">
                                <p className="text-gray-500">No bookings found</p>
                                <Button
                                    type="primary"
                                    className="mt-4"
                                    onClick={() => navigate('/forms/bookingform')}
                                >
                                    Book a Service
                                </Button>
                            </div>
                        )
                    }}
                />
            </div >
        </div >
    );
};

export default BookingsList;