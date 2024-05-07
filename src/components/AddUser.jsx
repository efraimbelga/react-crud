import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { saveAddEmployee } from "../httpRequests";

const AddUser = () => {
  const [isAdded, setIsAdded] = useState(false);
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setIsAdded(false);
    const formData = new FormData(e.target);
    let formJson = Object.fromEntries(formData.entries());
    const newID = new Date().toLocaleString();
    formJson = { ...formJson, id: newID };

    saveAddEmployee(formJson).then(() => {
      e.target.reset();
      setIsAdded(true);
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center justify-content-center">
        <div className="col-lg-8">
          <EmployeeForm onFormSubmit={handleAddEmployee} />
          {isAdded && <p>Employee data added!</p>}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
