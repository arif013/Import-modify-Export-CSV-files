import React from 'react';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button'

const Download = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:3000/download/json');
      const jsonData = response.data;
      const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'data.json';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading JSON data:', error);
    }
  };

  return (
    <div>
      <h1>Download JSON Data</h1>
      <Button variant="contained" color="primary" component="span" style={{margin:"0 0 20px 0"}} onClick={handleDownload}>Download</Button>
    </div>
  );
};

export default Download;
