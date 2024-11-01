package co.edu.unbosque.NominaEmpleadosAPI.configurations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Empleado;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    public ModelMapper modelMapper(){

        ModelMapper modelMapper = new ModelMapper();
        cargarMapeos(modelMapper);
        return modelMapper;
    }

    private void cargarMapeos(ModelMapper modelMapper){
        modelMapper.typeMap(Empleado.class, EmpleadoDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getDependencia(), EmpleadoDTO::setDependenciaDTO);
            mapper.map(src -> src.getCargo(), EmpleadoDTO::setCargoDTO);
            mapper.map(src -> src.getEps(), EmpleadoDTO::setEpsDTO);
            mapper.map(src -> src.getArl(), EmpleadoDTO::setArlDTO);
            mapper.map(src -> src.getPension(), EmpleadoDTO::setPensionDTO);
        });
    }
}
