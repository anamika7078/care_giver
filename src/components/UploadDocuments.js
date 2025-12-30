// FRONTEND/src/components/UploadDocument.js
import React, { useState } from 'react';
import { documentsAPI } from '../services/api';

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('document', file);

        try {
            setUploading(true);
            const response = await documentsAPI.uploadDocument(formData);
            console.log('Document uploaded:', response.data);
            // Handle successful upload (show success message, update UI, etc.)
        } catch (err) {
            console.error('Upload failed:', err.response?.data?.message || err.message);
            // Handle error
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="file" onChange={onFileChange} />
                </div>
                <button type="submit" disabled={!file || uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default UploadDocument;