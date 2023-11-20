package customer.employee.Emp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;


@Service
public class EmployeeService {
    @Autowired
    EmployeeDAO employeeDAO; // Assuming you have a repository


    public Collection<Employee1> getEmployees() {
        return   employeeDAO.getAllEmployee();
    }
}


