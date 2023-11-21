package customer.employee.Emp;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

@Component
@Transactional
public class EmployeeDAO
 {
    @PersistenceContext                  //used to inject an EntityManager into the application.
                                        // An EntityManager is part of the Java Persistence API (JPA) and 
                                        //provides methods for interacting with the database
    private EntityManager entityManager;
    
    public Collection<Employee1> getAllEmployee(){
        try {
            List<Employee1> result = new ArrayList<Employee1>(); // Creating the empty arrayList
            if(entityManager!= null)
            {
                StoredProcedureQuery spEmployee1 = entityManager.createStoredProcedureQuery("GETALLEMPDETAILS", "employee1_mapping");
                spEmployee1.execute(); // Executing the store procedure
                @SuppressWarnings("unchecked")
                List<Employee1> tempResult = spEmployee1.getResultList();
                result.addAll(tempResult);
            }
            return result;
        } catch (Exception exception) {
           throw exception;
        }
    }

    public Employee1 getEmpById(Long id) {
        try {
            // Create a stored procedure query named "GETEMPLOYEEBYID" with the result mapping "employee1_mapping".
            StoredProcedureQuery spEmployee1ById = entityManager.createStoredProcedureQuery("GETEMPLOYEEBYID", "employee1_mapping");
            
            // Set parameters for the stored procedure (assuming your stored procedure requires an ID parameter).
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
    
    

}
