package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "Novedad")
public class Novedad extends EntidadBase{

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

    @OneToMany(mappedBy = "novedad")
    private List<Vacaciones> vacaciones = new ArrayList<>();

    @OneToMany(mappedBy = "novedad")
    private List<Incapacidad> incapacidades = new ArrayList<>();

}
