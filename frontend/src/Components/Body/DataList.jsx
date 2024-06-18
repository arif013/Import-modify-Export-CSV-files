import { React, useState } from "react";

import "./DataList.css";
import { Table } from "./Table";
import { Modal } from "./Modal";

function DataList(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    const id = props.arrayData[targetIndex]._id 
    // Assuming props.arrayData is immutable, we should create a new array without the deleted row
    const newArrayData = props.arrayData.filter((_, idx) => idx !== targetIndex);
    props.setArrayData(newArrayData); // Assuming you have a setter function to update arrayData
    console.log("deleted")
    console.log(targetIndex,id)

    fetch(`http://localhost:3000/api/delete/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json' 
      },
      // body: JSON.stringify(newRow)
    })

  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
    
  };

  const handleSubmitToBackend = (newRow, rowIndex)=>{
    const id = props.arrayData[rowIndex]._id; // Assuming MongoDB assigns IDs to documents

    fetch(`http://localhost:3000/api/update/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newRow)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update row in the backend");
      }
      console.log("Row updated successfully in the backend",id);
    })
    .catch((error) => {
      console.error("Error updating row in the backend:", error);
    });
  }

  const handleSubmit = (newRow, rowIndex) => {
    const newArrayData = rowToEdit === null
      ? [...props.arrayData, newRow] // If no row is being edited, add the new row
      : props.arrayData.map((currRow, idx) => (idx === rowToEdit ? newRow : currRow)); // Otherwise, replace the edited row
    props.setArrayData(newArrayData); // Update arrayData

    handleSubmitToBackend(newRow, rowIndex) //Sending data to backend
  };

  if (!props.arrayData) {
    return <div>Loading...</div>; // Or any other placeholder message
  }

  return (
    <div className="DataList">
      <Table tableValue={props.arrayData} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {/* <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button> */}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={(newRow)=>handleSubmit(newRow,rowToEdit)}
          defaultValue={rowToEdit !== null && props.arrayData[rowToEdit]}
        />
      )}
    </div>
  );
}

export default DataList;
