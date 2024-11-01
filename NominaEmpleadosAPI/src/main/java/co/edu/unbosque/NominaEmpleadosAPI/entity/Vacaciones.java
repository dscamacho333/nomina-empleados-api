package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "vacaciones")
public class Vacaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vacaciones")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_novedad")
    private Novedad novedad;

    @Column(name = "numero_dias")
    private int numeroDias;

    @Column(name = "fecha_inicio")
    private Date fechaInicio;

    @Column(name = "fecha_terminacion")
    private Date fechaTerminacion;
}
