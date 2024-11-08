package co.edu.unbosque.NominaEmpleadosAPI.exceptions.handler;

import co.edu.unbosque.NominaEmpleadosAPI.entity.BaseResponse;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<BaseResponse> handleBadRequestException(BadRequestException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new BaseResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<BaseResponse> handleEntityNotFoundException(EntityNotFoundException e) {
        return ResponseEntity.status(404)
                .body(new BaseResponse(e.getMessage(), 404));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<BaseResponse> handleBadCredentialsException(BadCredentialsException e) {
        return ResponseEntity.status(404)
                .body(new BaseResponse(e.getMessage(), 404));
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<BaseResponse> handleJWTVerificationException(JWTVerificationException e) {
        return ResponseEntity.status(404)
                .body(new BaseResponse(e.getMessage(), 404));
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<BaseResponse> handleUsernameNotFoundException(UsernameNotFoundException e) {
        return ResponseEntity.status(404)
                .body(new BaseResponse(e.getMessage(), 404));
    }


}
