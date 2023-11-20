package customer.employee.Emp;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
@Component
@Transactional
public class EmployeeDAO
 {
    @PersistenceContext
    private EntityManager entityManager;
    
    public Collection<Employee1> getAllEmployee(){
        try {
            List<Employee1> result = new ArrayList<Employee1>();
            if(entityManager!= null)
            {
                StoredProcedureQuery spEmployee1 = entityManager.createStoredProcedureQuery("GETALLEMPDETAILS", "employee1_mapping");
                spEmployee1.execute();
                @SuppressWarnings("unchecked")
                List<Employee1> tempResult = spEmployee1.getResultList();
                result.addAll(tempResult);
            }

    

            return result;
        } catch (Exception exception) {
           throw exception;
        }
    }

}
