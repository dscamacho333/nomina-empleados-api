package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "Novedad")
public class Novedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_novedad")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_empleado")
    private Empleado empleado;

    @Column(name = "numero_dias")
    private int numeroDias;

    @Column(name = "bonificacion")
    private double bonificacion;

    @Column(name = "transporte")
    private double transporte;
}
