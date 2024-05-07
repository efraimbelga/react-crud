import React, { useEffect, useReducer, useState } from "react";
import {
  deleteAllChecked,
  deleteEmployee,
  saveUpdateEmployee,
  setInitialEmployee,
} from "../httpRequests";
import AppModal from "./AppModal";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import EmployeeTableRow from "./EmployeeTableRow";
import Search from "./Search";
import { initialState, taskReducer } from "../customhooks/taskReducer";
import EmployeeInformation from "./EmployeeInformation";

const Home = () => {
  const [employeesState, dispatchSetEmployees] = useReducer(
    taskReducer,
    initialState
  );

  const [searchValue, setSearcheValue] = useState("");
  const [checkedEmployee, setCheckedEmployee] = useState([]);
  const [showModal, setShowModdal] = useState(false);

  const handleClose = () => setShowModdal(false);
  const [empId, setEmpId] = useState("");

  useEffect(() => {
    setInitialEmployee().then((data) => {
      if (data.error) {
        dispatchSetEmployees({
          type: "FETCH_ERROR",
          payload: data.message,
        });
      } else {
        dispatchSetEmployees({ type: "FETCH_SUCCESS", payload: data });
      }
    });
  }, []);

  // console.log(employeesState.data);
  const employees = employeesState.data;
  const employeeArray = employees
    .map((emp) => {
      if (checkedEmployee.includes(emp.id)) {
        return {
          ...emp,
          checked: true,
        };
      } else {
        return {
          ...emp,
          checked: false,
        };
      }
    })
    .filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        emp.middleName.toLowerCase().includes(searchValue.toLowerCase())
    );

  const handleDeleteAllChecked = () => {
    const selectedEmployees = employeeArray
      .filter((emp) => emp.checked === true)
      .map((emp) => ({
        id: emp.id,
      }));

    if (selectedEmployees.length > 0) {
      const answer = window.confirm("are you sure?");
      if (answer) {
        // deleteAllChecked(selectedEmployees);
        deleteAllChecked(selectedEmployees).then((data) =>
          dispatchSetEmployees({ type: "FETCH_SUCCESS", payload: data })
        );
      }
    } else {
      alert("No employees selected");
    }
  };

  const checkAllEmployees = (checked) => {
    setCheckedEmployee(checked ? employeeArray.map((emp) => emp.id) : []);
  };

  const checkRowEmployee = (checked, eid) => {
    setCheckedEmployee((checkedEmployee) =>
      checked
        ? [...checkedEmployee, eid]
        : checkedEmployee.filter((emp) => emp !== eid)
    );
  };

  function handleDeleteEmployee(eid) {
    const answer = window.confirm("are you sure?");
    if (answer) {
      deleteEmployee(eid).then((data) =>
        dispatchSetEmployees({ type: "FETCH_SUCCESS", payload: data })
      );
    }
  }

  const handleEmployeeShow = (id) => {
    setEmpId(id);
    setShowModdal(true);
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-end">
          <Search>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearcheValue(e.target.value)}
            />
          </Search>
          <button
            className="btn  btn-danger mr-3"
            type="button"
            onClick={handleDeleteAllChecked}
          >
            Delete Selected
          </button>
        </div>
        <div className="col-sm-12">
          <hr />
        </div>
        <div className="col-sm-12">
          <EmployeeTable
            checkAllEmployees={checkAllEmployees}
            isAllChecked={
              employeeArray.length <= 0
                ? false
                : checkedEmployee.length === employeeArray.length
            }
          >
            {employeesState.loading && (
              <tr>
                <td colSpan={"7"}>Loading...</td>
              </tr>
            )}
            {employeesState.error && (
              <tr>
                <td colSpan={"7"}>Error: {employeesState.error}</td>
              </tr>
            )}

            {employeeArray.map((employee) => (
              <EmployeeTableRow
                key={employee.id}
                employee={employee}
                checkRowEmployee={checkRowEmployee}
                onDelete={handleDeleteEmployee}
                handleEmployeeShow={handleEmployeeShow}
              />
            ))}
          </EmployeeTable>
        </div>
      </div>
      {showModal && (
        <AppModal
          show={showModal}
          title={"Employee Information"}
          handleClose={handleClose}
          size={"lg"}
        >
          <EmployeeInformation
            empId={empId}
            dispatchSetEmployees={dispatchSetEmployees}
          />
        </AppModal>
      )}
    </>
  );
};

export default Home;
