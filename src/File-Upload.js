import React, { useState, useEffect  } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('1');
    const [files, setFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDeleteFile = async (fileId) => {
        try {
            await axios.delete(`http://localhost:8080/api/files/delete`, {
                params: {
                    id: fileId,
                    user: user,
                },
            });
            setFiles(files.filter((file) => file.id !== fileId)); // Eliminar el archivo de la lista
            setUploadMessage('File deleted successfully!');
        } catch (error) {
            setUploadMessage(`Failed to delete file: ${error.message}`);
        }
    };

    const handleFileUpload = async () => {
        if (!file || !user) {
            setUploadMessage('Please select a file and enter a username!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:8080/api/files/upload?user=${user}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadMessage('File uploaded successfully!');
            loadUserFiles();
        } catch (error) {
            setUploadMessage(`File upload failed: ${error.message}`);
        }
    };

    const handleDownloadFile = async (fileId, fileName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/files/download`, {
                params: { id: fileId, user: user },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            setUploadMessage(`Failed to download file: ${error.message}`);
        }
    };

    const loadUserFiles = async () => {
        try {
            setErrorMessage('');
            const response = await axios.get(`http://localhost:8080/api/files/user/${user}`);
            setFiles(response.data);
        } catch (error) {
            setErrorMessage(`Error fetching files for user: ${error.message}`);
            setFiles([]);
        }
    };

    useEffect(() => {
        if (user) {
            loadUserFiles();
        }
    }, [user]);

    return (
        <div style={styles.container}>
            <h1>File Upload and User File Manager</h1>

            <input type="file" onChange={handleFileChange} style={styles.fileInput}/>

            <button onClick={handleFileUpload} style={styles.uploadButton}>Upload File</button>

            {uploadMessage && <p>{uploadMessage}</p>}

            {errorMessage && <p style={styles.error}>{errorMessage}</p>}

            {files.length > 0 && (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>File Name</th>
                        <th>Upload Timestamp</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.id}</td>
                            <td>{file.fileName}</td>
                            <td>{file.uploadTimestamp}</td>
                            <td>
                                <button onClick={() => handleDeleteFile(file.id)} style={styles.deleteButton}>Delete
                                </button>
                                <button onClick={() => handleDownloadFile(file.id, file.fileName)}
                                        style={styles.downloadButton}>Download
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
    },
    fileInput: {
        margin: '20px',
    },
    uploadButton: {
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
};

export default FileUpload;
