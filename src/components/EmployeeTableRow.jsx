import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AppModal from "./AppModal";
import EmployeeForm from "./EmployeeForm";
import { Button } from "bootstrap";

const EmployeeTableRow = ({
  employee,
  checkRowEmployee,
  onDelete,
  handleEmployeeShow,
}) => {
  const [empId, setEmpId] = useState(null);

  return (
    <>
      <tr key={employee.id}>
        <td>
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            className="form-check-input"
            checked={Boolean(employee.checked)}
            onChange={(e) => checkRowEmployee(e.target.checked, employee.id)}
          />
        </td>
        <td>
          {employee.firstName} {employee.middleName} {employee.lastName}
        </td>
        <td>{employee.gender}</td>
        <td>{employee.jobTitle}</td>
        <td>{employee.address}</td>
        <td>{employee.number}</td>
        <td>
          <button
            className="btn btn-sm btn-default"
            // onClick={() => {
            //   setEmpId(employee.id);
            //   setShow(true);
            // }}
            onClick={() => handleEmployeeShow(employee.id)}
          >
            👁️
          </button>
          <button
            className="btn btn-sm btn-default"
            onClick={() => onDelete(employee.id)}
          >
            🗑️
          </button>
        </td>
      </tr>
    </>
  );
};

export default EmployeeTableRow;
