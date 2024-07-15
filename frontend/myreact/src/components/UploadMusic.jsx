import React, { useState } from 'react';

const UploadMusic = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('artist', artist);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
      alert("Song upload Successfuly");
      setName('');
      setArtist('');
      setFile(null);
      setError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Music</h2>
      <div style={{ backgroundColor: '#000000', padding: '20px', color: 'white' }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Artist</label>
            <input
              type="text"
              className="form-control"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">File</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadMusic;
