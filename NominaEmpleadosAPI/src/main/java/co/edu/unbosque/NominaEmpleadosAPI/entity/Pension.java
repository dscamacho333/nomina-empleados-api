package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Pension")
public class Pension extends EntidadBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pension")
    private Integer id;

    @Column(name = "nombre_pension")
    private String nombrePension;

    @OneToMany(mappedBy = "pension")
    private List<Empleado> empleados = new ArrayList<>();

}

