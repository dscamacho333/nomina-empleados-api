package co.edu.unbosque.NominaEmpleadosAPI.entity;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseExcel {

    private String message;
    private HttpStatus status;
}
