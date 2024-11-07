package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "incapacidad")
public class Incapacidad extends EntidadBase{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incapacidad")
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
