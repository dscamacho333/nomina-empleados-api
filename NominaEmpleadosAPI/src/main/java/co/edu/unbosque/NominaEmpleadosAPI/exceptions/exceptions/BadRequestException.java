package co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions;

public class BadRequestException extends RuntimeException{

    public BadRequestException(String mensaje){
        super(mensaje);
    }
}
