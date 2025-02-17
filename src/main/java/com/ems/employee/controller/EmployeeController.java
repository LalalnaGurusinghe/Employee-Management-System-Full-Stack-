package com.ems.employee.controller;

import com.ems.employee.dto.EmployeeDTO;
import com.ems.employee.dto.ResponseDTO;
import com.ems.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseDTO createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        return employeeService.createEmployee(employeeDTO);
    }

    @GetMapping("/{id}")
    public ResponseDTO getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @GetMapping("/all")
    public ResponseDTO getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PutMapping("/update/{Id}")
    public ResponseDTO updateEmployeeById(@RequestBody EmployeeDTO employeeDTO , @PathVariable Long id){
         return employeeService.updateEmployeeById(employeeDTO,id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseDTO deleteEmployeeById(@PathVariable Long id){
        return employeeService.deleteEmployeeById(id);
    }

}
