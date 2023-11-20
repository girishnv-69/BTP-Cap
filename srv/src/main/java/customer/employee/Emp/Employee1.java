package customer.employee.Emp;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@SqlResultSetMapping(name = "employee1_mapping", classes = 
@ConstructorResult(targetClass = Employee1.class,columns ={
    @ColumnResult(name = "EmpId", type = long.class),
    @ColumnResult(name = "EmpName", type = String.class),
    @ColumnResult(name = "EmpLoc", type = String.class),
    @ColumnResult(name = "Deptno", type = Integer.class)
}))

@Entity
@Getter
@Setter
public class Employee1 {

    @Id
    private Long EmpId;
    private String EmpName;
    private String EmpLoc;
    private Integer Deptno;

    public Employee1()
    {

    }
    public Employee1(Long EmpId,String EmpName, String EmpLoc, Integer Deptno) {
        this.EmpName = EmpName;
        this.EmpLoc = EmpLoc;
        this.Deptno = Deptno;
    }
}
