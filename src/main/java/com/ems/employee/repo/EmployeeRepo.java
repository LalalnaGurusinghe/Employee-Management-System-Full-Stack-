package com.ems.employee.repo;

import com.ems.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee , Long> {
    Employee findAllById(Long id);
}
