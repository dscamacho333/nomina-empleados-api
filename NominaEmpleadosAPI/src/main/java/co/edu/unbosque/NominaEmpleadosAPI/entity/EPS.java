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
@Table(name = "EPS")
public class EPS extends EntidadBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_eps")
    private Integer id;

    @Column(name = "nombre_eps")
    private String nombreEPS;

    @OneToMany(mappedBy = "eps")
    private List<Empleado> empleados = new ArrayList<>();
}
