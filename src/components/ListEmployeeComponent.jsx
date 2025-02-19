import React, { useEffect, useState } from "react";
import { listEmployees , deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        console.log("API Response:", response); // Log the entire response

        setEmployee(response.data); // Set the employees directly if it's an array
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const addEmployee = () => {
    navigate("/add-employee");
  };

  const updateEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  // Delete an employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id); // Call deleteEmployee with the employee ID
        setEmployee(employee.filter((emp) => emp.id !== id)); // Update the employee list after deletion
        alert("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

  

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h2 className="text-center">List of Employees</h2>
      <button
        type="button"
        class="btn btn-outline-info"
        data-mdb-ripple-init
        data-mdb-ripple-color="dark"
        style={{ marginBottom: "10px" }}
        onClick={addEmployee}
      >
        Add Employee
      </button>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employee.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td><button type="button" class="btn btn-info" style={{marginLeft: "10px" }} onClick={()=>updateEmployee(employee.id)}>Update</button> <button type="button" className="btn btn-danger" style={{marginLeft: "10px" } } onClick={() => handleDelete(employee.id)}>Delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
