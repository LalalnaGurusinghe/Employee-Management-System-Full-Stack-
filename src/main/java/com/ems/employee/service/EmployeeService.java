package com.ems.employee.service;

import com.ems.employee.dto.EmployeeDTO;
import com.ems.employee.dto.ResponseDTO;
import com.ems.employee.entity.Employee;

public interface EmployeeService {

    public ResponseDTO createEmployee(EmployeeDTO employeeDTO);

    public ResponseDTO getEmployeeById(Long id);

    public ResponseDTO getAllEmployees();

    public ResponseDTO updateEmployeeById(EmployeeDTO employeeDTO , Long id);

    public ResponseDTO deleteEmployeeById(Long id);
}
