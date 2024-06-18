import React from 'react';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button'

const DownloadCsv = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:3000/download/csv');
      const jsonData = response.data;
      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'data.csv';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading CSV data:', error);
    }
  };

  return (
    <div>
      <h1>Download CSV Data</h1>
      <Button variant="contained" color="primary" component="span" style={{margin:"0 0 20px 0"}} onClick={handleDownload}>Download</Button>
    </div>
  );
};

export default DownloadCsv;
