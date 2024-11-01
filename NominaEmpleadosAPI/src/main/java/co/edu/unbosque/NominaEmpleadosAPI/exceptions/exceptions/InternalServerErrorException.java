package co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions;

public class InternalServerErrorException extends RuntimeException{

    public InternalServerErrorException(String mensaje){
        super(mensaje);
    }
}
