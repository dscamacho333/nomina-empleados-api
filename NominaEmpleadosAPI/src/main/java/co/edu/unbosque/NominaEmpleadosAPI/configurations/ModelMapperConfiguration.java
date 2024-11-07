package co.edu.unbosque.NominaEmpleadosAPI.configurations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.*;
import co.edu.unbosque.NominaEmpleadosAPI.entity.*;
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

        modelMapper.typeMap(Novedad.class, NovedadDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getEmpleado(), NovedadDTO::setEmpleadoDTO);
        });

        modelMapper.typeMap(Incapacidad.class, IncapacidadDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getNovedad(), IncapacidadDTO::setNovedadDTO);
        });

        modelMapper.typeMap(RolUsuario.class, RolUsuarioDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUsuario(), RolUsuarioDTO::setUsuarioDTO);
            mapper.map(src -> src.getRol(), RolUsuarioDTO::setRolDTO);
        });


        modelMapper.typeMap(PermisoRol.class, PermisoRolDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getRol(), PermisoRolDTO::setRolDTO);
            mapper.map(src -> src.getPermiso(), PermisoRolDTO::setPermisoDTO);
        });

    }
}
