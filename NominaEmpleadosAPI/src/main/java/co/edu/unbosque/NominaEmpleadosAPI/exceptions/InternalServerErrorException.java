package co.edu.unbosque.NominaEmpleadosAPI.exceptions;

public class InternalServerErrorException extends RuntimeException{

    public InternalServerErrorException(String mensaje){
        super(mensaje);
    }
}
