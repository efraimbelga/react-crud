import React, { useEffect, useState } from "react";
import { getEmployee, saveUpdateEmployee } from "../httpRequests";
import EmployeeForm from "./EmployeeForm";

const EmployeeInformation = ({ empId, dispatchSetEmployees }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  const [employee, setEmployee] = useState();
  useEffect(() => {
    getEmployee(empId)
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => console.log(error));
  }, [empId]);

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formJson = Object.fromEntries(formData.entries());
    formJson = {
      ...formJson,
      id: empId,
    };

    saveUpdateEmployee(empId, formJson).then((data) => {
      setIsUpdated(true);
      dispatchSetEmployees({ type: "FETCH_SUCCESS", payload: data });
    });
  };

  return (
    <>
      <EmployeeForm employee={employee} onFormSubmit={handleUpdateEmployee} />
      {isUpdated && <p>Employee data updated!</p>}
    </>
  );
};

export default EmployeeInformation;
