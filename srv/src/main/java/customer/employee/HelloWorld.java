package customer.employee;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HelloWorld {
    @GetMapping("/")
    public String HelloWorld()
    {
        return "Hello, World";
    }  
}


