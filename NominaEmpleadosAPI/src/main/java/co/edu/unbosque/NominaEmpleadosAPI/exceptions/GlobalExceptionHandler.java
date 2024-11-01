package co.edu.unbosque.NominaEmpleadosAPI.exceptions;

import co.edu.unbosque.NominaEmpleadosAPI.entity.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SuccessException.class)
    public ResponseEntity<BaseResponse> handleSuccessException(SuccessException e) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(e.getMessage(), HttpStatus.OK.value()));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<BaseResponse> handleBadRequestException(BadRequestException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new BaseResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<BaseResponse> handleInternalServerErrorException(InternalServerErrorException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new BaseResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }
}
