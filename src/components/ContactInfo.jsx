import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
    const contactItems = [
        {
            icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
            title: "Our Location",
            details: [
                "123 Caregiving Street, Suite 100",
                "New York, NY 10001"
            ]
        },
        {
            icon: <FaPhone className="text-3xl text-green-600" />,
            title: "Phone Number",
            details: [
                "+1 (800) 555-1234",
                "+1 (800) 555-5678"
            ]
        },
        {
            icon: <FaEnvelope className="text-3xl text-orange-500" />,
            title: "Email Address",
            details: [
                "info@familycaregive.com",
                "support@familycaregive.com"
            ]
        },
        {
            icon: <FaClock className="text-3xl text-purple-600" />,
            title: "Working Hours",
            details: [
                "Monday - Friday: 8:00 AM - 8:00 PM",
                "Saturday: 9:00 AM - 5:00 PM",
                "Sunday: Closed"
            ]
        }
    ];

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center"
                        >
                            <div className="bg-yellow-50 p-4 rounded-full mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                            <div className="space-y-1 text-gray-600">
                                {item.details.map((detail, i) => (
                                    <p key={i} className="text-sm sm:text-base">{detail}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
