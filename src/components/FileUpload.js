import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ uploadedFiles, setUploadedFiles }) {
  const onDrop = useCallback(acceptedFiles => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, [setUploadedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <div className="upload-icon">📄</div>
        <p>Upload CVs</p>
        <p className="upload-subtitle">Drag and drop your CV files or click to browse</p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded CVs</h3>
          <p>{uploadedFiles.length} CVs uploaded</p>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-item">
              <span className="file-name">{file.name}</span>
              <button 
                className="remove-button"
                onClick={() => removeFile(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload; 