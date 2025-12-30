import React, { useState, useEffect } from 'react';
import {
    FiSearch,
    FiDownload,
    FiPrinter,
    FiMail,
    FiFilter,
    FiPlus,
    FiEdit,
    FiTrash2
} from 'react-icons/fi';
import CreateInvoiceForm from '../../components/invoices/CreateInvoiceForm';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    generatePdf
} from '../../api/invoice';

const Invoices = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);

    // Fetch invoices on component mount
    useEffect(() => {
        const fetchInvoices = async () => {
            setIsLoading(true);
            try {
                const data = await getInvoices();
                setInvoices(data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleEditInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setShowCreateForm(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                await deleteInvoice(id);
                setInvoices(invoices.filter(invoice => invoice.id !== id));
            } catch (error) {
                console.error('Error deleting invoice:', error);
            }
        }
    };

    const handleAddInvoice = async (newInvoice) => {
        try {
            setIsLoading(true);
            let updatedInvoices;

            if (selectedInvoice) {
                // Update existing invoice
                const updatedInvoice = await updateInvoice(selectedInvoice.id, newInvoice);
                updatedInvoices = invoices.map(inv =>
                    inv.id === selectedInvoice.id ? updatedInvoice : inv
                );
            } else {
                // Create new invoice
                const createdInvoice = await createInvoice(newInvoice);
                updatedInvoices = [...invoices, createdInvoice];
            }

            setInvoices(updatedInvoices);
            setShowCreateForm(false);
            setSelectedInvoice(null);
        } catch (error) {
            console.error('Error saving invoice:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportToExcel = () => {
        const data = invoices.map(invoice => ({
            'Invoice ID': invoice.id,
            'Date': invoice.date,
            'Client': invoice.clientName,
            'Email': invoice.clientEmail,
            'Subtotal': `$${invoice.subtotal?.toFixed(2) || '0.00'}`,
            'Tax': `$${invoice.tax?.toFixed(2) || '0.00'}`,
            'Discount': `$${invoice.discount?.toFixed(2) || '0.00'}`,
            'Total': `$${invoice.total?.toFixed(2) || '0.00'}`,
            'Status': invoice.status,
            'Notes': invoice.notes || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelData, `invoices_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const exportToCSV = () => {
        const data = invoices.map(invoice => ({
            'Invoice ID': invoice.id,
            'Date': invoice.date,
            'Client': invoice.clientName,
            'Email': invoice.clientEmail,
            'Subtotal': `$${invoice.subtotal?.toFixed(2) || '0.00'}`,
            'Tax': `$${invoice.tax?.toFixed(2) || '0.00'}`,
            'Discount': `$${invoice.discount?.toFixed(2) || '0.00'}`,
            'Total': `$${invoice.total?.toFixed(2) || '0.00'}`,
            'Status': invoice.status,
            'Notes': invoice.notes || ''
        }));

        const csv = XLSX.utils.json_to_sheet(data);
        const csvOutput = XLSX.utils.sheet_to_csv(csv);
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `invoices_${new Date().toISOString().split('T')[0]}.csv`);
    };

    const handlePrintInvoice = (invoice) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice ${invoice.id}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .info { margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .total { text-align: right; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>INVOICE</h1>
                        <p>#${invoice.id}</p>
                    </div>
                    <div class="info">
                        <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
                        <p><strong>Client:</strong> ${invoice.clientName}</p>
                        <p><strong>Email:</strong> ${invoice.clientEmail}</p>
                        <p><strong>Status:</strong> ${invoice.status}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoice.items.map(item => `
                                <tr>
                                    <td>${item.description}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.rate?.toFixed(2)}</td>
                                    <td>$${item.amount?.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="total">
                        <p>Subtotal: $${invoice.subtotal?.toFixed(2)}</p>
                        <p>Tax: $${invoice.tax?.toFixed(2)}</p>
                        ${invoice.discount ? `<p>Discount: $${invoice.discount?.toFixed(2)}</p>` : ''}
                        <p>Total: $${invoice.total?.toFixed(2)}</p>
                    </div>
                    ${invoice.notes ? `<div class="notes"><p><strong>Notes:</strong> ${invoice.notes}</p></div>` : ''}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleSendEmail = (invoice) => {
        const subject = `Invoice ${invoice.id} from Your Company`;
        const body = `Dear ${invoice.clientName},\n\nPlease find attached your invoice #${invoice.id} for ${invoice.date}.\n\nTotal Amount: $${invoice.total?.toFixed(2)}\n\nThank you for your business!`;
        window.location.href = `mailto:${invoice.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleDownloadPdf = async (invoiceId) => {
        try {
            const pdfBlob = await generatePdf(invoiceId);
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${invoiceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6 pt-8">
                <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
                <div className="flex space-x-3">
                    <div className="relative group">
                        <button
                            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            disabled={isLoading}
                        >
                            <FiDownload className="mr-2" /> Export
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <button
                                onClick={exportToExcel}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                disabled={isLoading}
                            >
                                Export to Excel
                            </button>
                            <button
                                onClick={exportToCSV}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                disabled={isLoading}
                            >
                                Export to CSV
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedInvoice(null);
                            setShowCreateForm(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <FiPlus className="mr-2" /> Create Invoice
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <FiFilter className="mr-2" /> Filter
                    </button>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {isLoading && invoices.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Loading invoices...</div>
                ) : filteredInvoices.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No invoices found</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                        {invoice.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(invoice.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{invoice.clientName}</div>
                                        <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        ${invoice.total?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'Paid'
                                                ? 'bg-green-100 text-green-800'
                                                : invoice.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleDownloadPdf(invoice.id)}
                                                className="text-gray-500 hover:text-gray-700"
                                                title="Download PDF"
                                                disabled={isLoading}
                                            >
                                                <FiDownload className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePrintInvoice(invoice)}
                                                className="text-gray-500 hover:text-gray-700"
                                                title="Print"
                                                disabled={isLoading}
                                            >
                                                <FiPrinter className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleSendEmail(invoice)}
                                                className="text-gray-500 hover:text-gray-700"
                                                title="Send Email"
                                                disabled={isLoading}
                                            >
                                                <FiMail className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditInvoice(invoice)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit"
                                                disabled={isLoading}
                                            >
                                                <FiEdit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(invoice.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                                disabled={isLoading}
                                            >
                                                <FiTrash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Create/Edit Invoice Modal */}
            {showCreateForm && (
                <CreateInvoiceForm
                    initialData={selectedInvoice}
                    onClose={() => {
                        setShowCreateForm(false);
                        setSelectedInvoice(null);
                    }}
                    onSave={handleAddInvoice}
                    isEditing={!!selectedInvoice}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default Invoices;