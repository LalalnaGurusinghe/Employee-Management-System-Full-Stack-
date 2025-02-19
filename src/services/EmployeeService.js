import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employee";

export const listEmployees = async () => {
    try {
        const response = await axios.get(`${EMPLOYEE_API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};


export const saveEmployee = async (employee) =>{
    try {
        const response = await axios.post(`${EMPLOYEE_API_BASE_URL}/add`, employee);
        return response.data;
    }
    catch (error) {
        console.error("Error saving employee:", error);
        throw error;
    }
}

export const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);  // Correct URL
        return response.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw error;
    }
};

export const updateEmployee = async (employeeId, employee) => {
    try {
        const response = await axios.put(`${EMPLOYEE_API_BASE_URL}/update/${employeeId}`, employee);
        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

export const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(`${EMPLOYEE_API_BASE_URL}/delete/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };

