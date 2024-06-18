import React, { useState } from 'react';
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button'
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@mui/material';
import { useEffect } from 'react';
import DataList from './DataList';
import './Form.css'

function Form() {
  const [file, setFile] = useState(null);
  const [arrayData, setArrayData] = useState(null)
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Initiating the array to extract the data from the file

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append(`file`, file);

    // Uploading the file to the server
    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: data,
    })

    .then(data => console.log(data))
    .catch(err => console.error(err));
  };

  useEffect(()=>{
    // Fetching the data to frontend
    const response = async () => {
      const fetchData = await fetch('http://localhost:3000/api/uploads')
      const newData = await fetchData.json()
      setArrayData(newData)
      // console.log(newData)
    }
    response()
  })

  return (
   
    <div className='fileUpload'>
    <div >
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      <Button variant="contained" color="primary" component="span" onClick={handleUploadClick}>
        Upload File
      </Button>
      </div>
      <div>
      <DataList arrayData={arrayData} setArrayData={setArrayData}/>
      </div>
    </div>
    
  );
}

export default Form;
