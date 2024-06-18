import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, rowIndex }) => {
  const [formState, setFormState] = useState(
    defaultValue || {}
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.firstName && formState.lastName && formState.email && formState.phone) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState, rowIndex);
    // console.log(formState)
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" onChange={handleChange} value={formState.firstName} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" onChange={handleChange} value={formState.lastName} />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input name="email" onChange={handleChange} value={formState.email} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input name="phone" onChange={handleChange} value={formState.phone} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};