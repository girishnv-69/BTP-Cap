package customer.employee.Emp;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ParameterMode;

@Component
@Repository
@Transactional
public class EmployeeDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public Collection<Employee1> getAllEmployeeByselectedfields() {
        try {
            StoredProcedureQuery spCompanies = entityManager
                    .createStoredProcedureQuery("GETALLEMPDETAILS", "employee1_mapping");
            spCompanies.execute();
            @SuppressWarnings("unchecked")
            List<Employee1> results = spCompanies.getResultList();
            return results;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public Employee1 getEmpById(Long id) {
        try {
            // Create a stored procedure query named "GETEMPLOYEEBYID" with the result
            // mapping "employee1_mapping".
            StoredProcedureQuery spEmployee1ById = entityManager.createStoredProcedureQuery("GETEMPLOYEEBYID",
                    "employee1_mapping");

            // Set parameters for the stored procedure (assuming your stored procedure
            // requires an ID parameter).
            spEmployee1ById.registerStoredProcedureParameter("empId", Long.class, ParameterMode.IN);
            spEmployee1ById.setParameter("empId", id);

            // Execute the stored procedure.
            spEmployee1ById.execute();

            // Get the single result from the stored procedure execution.
            Employee1 result = (Employee1) spEmployee1ById.getSingleResult();
            return result;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void deleteEmpById(Long id) {
        try {
            StoredProcedureQuery spDeleteEmployee = entityManager.createStoredProcedureQuery("DELETEEMPBYID");
            spDeleteEmployee.registerStoredProcedureParameter("empId", Long.class, ParameterMode.IN);
            spDeleteEmployee.setParameter("empId", id);
            spDeleteEmployee.execute();
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void addEmployee(Employee1 employee) {
        try {
            // Assuming you have a stored procedure or a query for adding an employee
            StoredProcedureQuery spAddEmployee = entityManager.createStoredProcedureQuery("ADDEMP");
            // spAddEmployee.registerStoredProcedureParameter("empId", Integer.class,
            // ParameterMode.IN);
            spAddEmployee.registerStoredProcedureParameter("empName", String.class, ParameterMode.IN);
            spAddEmployee.registerStoredProcedureParameter("empLocation", String.class, ParameterMode.IN);
            spAddEmployee.registerStoredProcedureParameter("deptno", Integer.class, ParameterMode.IN);

            // spAddEmployee.setParameter("empId", employee.getEmpId());
            spAddEmployee.setParameter("empName", employee.getEmpName());
            spAddEmployee.setParameter("empLocation", employee.getEmpLoc());
            spAddEmployee.setParameter("deptno", employee.getDeptno());

            spAddEmployee.execute();
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void updateEmployee(Long empId, Employee1 updatedEmployee) {
        try {
            StoredProcedureQuery spUpdateEmployee = entityManager.createStoredProcedureQuery("UPDATEEMPLOYEE");
            spUpdateEmployee.registerStoredProcedureParameter("empId", Long.class, ParameterMode.IN);
            spUpdateEmployee.registerStoredProcedureParameter("empName", String.class, ParameterMode.IN);
            spUpdateEmployee.registerStoredProcedureParameter("empLocation", String.class, ParameterMode.IN);
            spUpdateEmployee.registerStoredProcedureParameter("deptNo", Integer.class, ParameterMode.IN);

            spUpdateEmployee.setParameter("empId", empId);
            spUpdateEmployee.setParameter("empName", updatedEmployee.getEmpName());
            spUpdateEmployee.setParameter("empLocation", updatedEmployee.getEmpLoc());
            spUpdateEmployee.setParameter("deptNo", updatedEmployee.getDeptno());

            spUpdateEmployee.execute();
        } catch (Exception exception) {
            throw exception;
        }
    }

}