package com.ems.employee.service.impl;

import com.ems.employee.dto.EmployeeDTO;
import com.ems.employee.dto.ResponseDTO;
import com.ems.employee.entity.Employee;
import com.ems.employee.mapper.EmployeeMapper;
import com.ems.employee.repo.EmployeeRepo;
import com.ems.employee.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public ResponseDTO createEmployee(EmployeeDTO employeeDTO) {
        try {


            Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);

            Employee saveEmployee = employeeRepo.save(employee);

            EmployeeDTO saveEmployeeDTO = EmployeeMapper.mapToEmployeeDTO(saveEmployee);

            return ResponseDTO.builder().message("Employee Added").httpStatus(HttpStatus.OK).data(saveEmployeeDTO).build();

        } catch (Exception e) {

            return ResponseDTO.builder().message("Employee Not Added").httpStatus(HttpStatus.BAD_REQUEST).data(null).build();

        }


    }

    @Override
    public ResponseDTO getEmployeeById(Long id) {
        Optional<Employee> employee = Optional.ofNullable(employeeRepo.findAllById(id));

        if (employee.isPresent()) {
            return ResponseDTO.builder().message("Employee Found").httpStatus(HttpStatus.OK).data(employee.get()).build();
        } else {
            return ResponseDTO.builder().message("Employee Not Found").httpStatus(HttpStatus.NOT_FOUND).data(null).build();
        }
    }

    @Override
    public ResponseDTO getAllEmployees() {
        List<Employee> employeeList = employeeRepo.findAll();

        if (!employeeList.isEmpty()) {
            return ResponseDTO.builder().message("Employees Fetch Successfully").httpStatus(HttpStatus.OK).data(employeeList).build();
        } else {
            return ResponseDTO.builder().message("No Employees").httpStatus(HttpStatus.NOT_FOUND).data(null).build();
        }
    }

    @Override
    public ResponseDTO updateEmployeeById(EmployeeDTO employeeDTO, Long id) {

        Optional<Employee> employee = employeeRepo.findById(id);

        if(employee.isPresent()){
            Employee existEmployee = employee.get();

            existEmployee.setFirstName(employeeDTO.getFirstName());
            existEmployee.setLastName(employeeDTO.getLastName());
            existEmployee.setEmail(employeeDTO.getEmail());

            Employee updatedEmployee = employeeRepo.save(existEmployee);
            EmployeeDTO saveEmployeeDTO = EmployeeMapper.mapToEmployeeDTO(updatedEmployee);

            return ResponseDTO.builder().message("Employee Updated Successfully").httpStatus(HttpStatus.OK).data(saveEmployeeDTO).build();
        }
        else{
            return ResponseDTO.builder().message("Such Employee Not Found").httpStatus(HttpStatus.NOT_FOUND).data(null).build();
        }

    }

    @Override
    public ResponseDTO deleteEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepo.findById(id);

        if(employee.isPresent()){
            Employee existEmployee = employee.get();
            employeeRepo.delete(existEmployee);

            return ResponseDTO.builder().message("Employee Deleted Successfully").httpStatus(HttpStatus.OK).data(existEmployee).build();
        }
        else{
            return ResponseDTO.builder().message("Employee Not Found").httpStatus(HttpStatus.NOT_FOUND).data(null).build();
        }

    }
}
