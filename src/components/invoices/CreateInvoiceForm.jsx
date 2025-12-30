import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CreateInvoiceForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
        notes: '',
        taxRate: 0,
        discount: 0
    });

    const calculateTotal = () => {
        const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
        const tax = (subtotal * formData.taxRate) / 100;
        const total = subtotal + tax - formData.discount;
        return { subtotal, tax, total };
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...formData.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };

        // Calculate amount if quantity or rate changes
        if (field === 'quantity' || field === 'rate') {
            updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
        }

        setFormData({ ...formData, items: updatedItems });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
        });
    };

    const removeItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const invoice = {
            ...formData,
            id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            ...calculateTotal()
        };
        onSave(invoice);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const { subtotal, tax, total } = calculateTotal();

        // Add header
        doc.setFontSize(20);
        doc.text('INVOICE', 105, 20, { align: 'center' });

        // Add invoice info
        doc.setFontSize(10);
        doc.text(`Invoice #: ${formData.id || 'DRAFT'}`, 20, 40);
        doc.text(`Date: ${formData.invoiceDate}`, 20, 45);
        doc.text(`Due Date: ${formData.dueDate || 'N/A'}`, 20, 50);

        // Add client info
        doc.text('Bill To:', 20, 70);
        doc.text(formData.clientName || 'Client Name', 20, 75);
        doc.text(formData.clientEmail || 'client@example.com', 20, 80);
        doc.text(formData.clientAddress || 'Client Address', 20, 85);

        // Add items table
        const headers = [['Description', 'Qty', 'Rate', 'Amount']];
        const data = formData.items.map(item => [
            item.description || '-',
            item.quantity,
            `$${item.rate.toFixed(2)}`,
            `$${(item.quantity * item.rate).toFixed(2)}`
        ]);

        doc.autoTable({
            startY: 100,
            head: headers,
            body: data,
            margin: { left: 20 },
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 90 },
                1: { cellWidth: 20 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 }
            }
        });

        // Add totals
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, finalY);
        doc.text(`Tax (${formData.taxRate}%): $${tax.toFixed(2)}`, 140, finalY + 5);
        doc.text(`Discount: $${formData.discount.toFixed(2)}`, 140, finalY + 10);
        doc.text(`Total: $${total.toFixed(2)}`, 140, finalY + 20, { fontStyle: 'bold' });

        // Add notes if any
        if (formData.notes) {
            doc.text('Notes:', 20, finalY + 40);
            doc.text(formData.notes, 20, finalY + 45, { maxWidth: 150 });
        }

        doc.save(`invoice-${formData.id || 'draft'}.pdf`);
    };

    const handlePrint = useReactToPrint({
        content: () => document.getElementById('invoice-to-print'),
    });

    const { subtotal, tax, total } = calculateTotal();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-4xl shadow-xl">
                <div className=" top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold ">Create New Invoice</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg font-medium mb-4">Bill To</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        value={formData.clientName}
                                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.clientEmail}
                                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <textarea
                                        value={formData.clientAddress}
                                        onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-4">Invoice Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                                    <input
                                        type="date"
                                        value={formData.invoiceDate}
                                        onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                                        <input
                                            type="number"
                                            value={formData.taxRate}
                                            onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount ($)</label>
                                        <input
                                            type="number"
                                            value={formData.discount}
                                            onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Items</h3>
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                                <FiPlus className="mr-1" /> Add Item
                            </button>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                    required
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                                    className="w-20 p-1 border rounded text-right"
                                                    min="1"
                                                    required
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                                                    className="w-24 p-1 border rounded text-right"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                ${(item.quantity * item.rate).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {formData.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full p-2 border rounded"
                            rows="2"
                            placeholder="Any additional notes or terms..."
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-end space-x-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Subtotal:</div>
                                <div className="text-sm text-gray-500">Tax ({formData.taxRate}%):</div>
                                <div className="text-sm text-gray-500">Discount:</div>
                                <div className="font-semibold mt-2">Total:</div>
                            </div>
                            <div className="text-right w-32">
                                <div className="text-sm">${subtotal.toFixed(2)}</div>
                                <div className="text-sm">${tax.toFixed(2)}</div>
                                <div className="text-sm">${formData.discount.toFixed(2)}</div>
                                <div className="font-semibold mt-2">${total.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleExportPDF}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Export PDF
                        </button>
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Print
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Save Invoice
                        </button>
                    </div>
                </form>
            </div>

            {/* Hidden div for printing */}
            <div id="invoice-to-print" className="hidden">
                <div className="p-8 max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">INVOICE</h1>
                        <p className="text-gray-600">#{formData.id || 'DRAFT'}</p>
                    </div>

                    <div className="flex justify-between mb-8">
                        <div>
                            <h3 className="font-semibold">From:</h3>
                            <p>Your Company Name</p>
                            <p>123 Business St.</p>
                            <p>City, State, ZIP</p>
                            <p>Email: your@email.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </div>
                        <div className="text-right">
                            <h3 className="font-semibold">Bill To:</h3>
                            <p>{formData.clientName || 'Client Name'}</p>
                            <p>{formData.clientEmail || 'client@example.com'}</p>
                            <p>{formData.clientAddress || 'Client Address'}</p>
                            <p className="mt-2">
                                <span className="font-semibold">Invoice Date:</span> {formData.invoiceDate}
                            </p>
                            <p>
                                <span className="font-semibold">Due Date:</span> {formData.dueDate || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <table className="w-full border-collapse mb-8">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Description</th>
                                <th className="border p-2 text-right">Qty</th>
                                <th className="border p-2 text-right">Rate</th>
                                <th className="border p-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{item.description || '-'}</td>
                                    <td className="border p-2 text-right">{item.quantity}</td>
                                    <td className="border p-2 text-right">${item.rate.toFixed(2)}</td>
                                    <td className="border p-2 text-right">${(item.quantity * item.rate).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="border-t-2 border-b-0 border-l-0 border-r-0 p-2 text-right font-semibold">Subtotal:</td>
                                <td className="border-t-2 border-b-0 border-l-0 border-r-0 p-2 text-right">${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="border-0 p-2 text-right font-semibold">Tax ({formData.taxRate}%):</td>
                                <td className="border-0 p-2 text-right">${tax.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="border-0 p-2 text-right font-semibold">Discount:</td>
                                <td className="border-0 p-2 text-right">${formData.discount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="border-t border-b-2 border-l-0 border-r-0 p-2 text-right font-bold">Total:</td>
                                <td className="border-t border-b-2 border-l-0 border-r-0 p-2 text-right font-bold">${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>

                    {formData.notes && (
                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Notes:</h3>
                            <p className="whitespace-pre-line">{formData.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateInvoiceForm;
