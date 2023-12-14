package customer.employee.Emp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class EmployeeService {
    @Autowired
    EmployeeDAO employeeDAO; // Assuming you have a repository

    public Collection<Employee1> getEmployees() {

        return employeeDAO.getAllEmployeeByselectedfields();
    }

    // public Collection<Employee1> getEmployees() {
    // return employeeDAO.getAllEmployee();
    // }

    public Employee1 getEmployeeById(Long id) {
        return employeeDAO.getEmpById(id);
    }

    public void deleteEmployeeById(Long id) {
        employeeDAO.deleteEmpById(id);
    }

    public void addEmployee(Employee1 employee) {
        employeeDAO.addEmployee(employee);
    }

    public void updateEmployee(Long empId, Employee1 updatedEmployee) {
        employeeDAO.updateEmployee(empId, updatedEmployee);
    }
}
