<?php
include 'conexion.php';

// Obtener el mes y año actual
$mes = date('m');
$anio = date('Y');

// Días laborales del mes
$dias_laborales = 22;

// Consultar empleados activos
$query = "SELECT e.id_empleado, e.nombre, e.apellido, e.salario
          FROM empleados e
          WHERE e.estado = 'Activo'";
$result = mysqli_query($conexion, $query);

while ($empleado = mysqli_fetch_assoc($result)) {
    $id_empleado = $empleado['id_empleado'];
    $salario_mensual = $empleado['salario'];
    $salario_diario = $salario_mensual / $dias_laborales;

    // Contar asistencias del empleado en el mes actual
    $asistencias_query = "SELECT COUNT(*) AS dias_trabajados
                          FROM asistencias
                          WHERE id_empleado = $id_empleado
                          AND estado = 'Presente'
                          AND MONTH(fecha) = $mes AND YEAR(fecha) = $anio";
    $asistencias_result = mysqli_query($conexion, $asistencias_query);
    $asistencias = mysqli_fetch_assoc($asistencias_result)['dias_trabajados'];

    // Calcular el salario basado en las asistencias
    $salario_calculado = $salario_diario * $asistencias;

    // Obtener el monto de cesta tickets del mes actual
    $cesta_ticket_query = "SELECT SUM(monto) AS total_cesta_ticket
                           FROM cesta_tickets
                           WHERE id_empleado = $id_empleado
                           AND MONTH(fecha) = $mes AND YEAR(fecha) = $anio";
    $cesta_ticket_result = mysqli_query($conexion, $cesta_ticket_query);
    $cesta_ticket = mysqli_fetch_assoc($cesta_ticket_result)['total_cesta_ticket'] ?? 0;

    // Salario total
    $salario_total = $salario_calculado + $cesta_ticket;

    // Registrar el pago en la base de datos
    $insert_pago = "INSERT INTO pagos (id_empleado, monto, fecha_pago, estado, metodo_pago)
                    VALUES ($id_empleado, $salario_total, NOW(), 'Pendiente', 'Transferencia')";
    mysqli_query($conexion, $insert_pago);

    echo "<p>Empleado: {$empleado['nombre']} {$empleado['apellido']} - Salario calculado: $salario_total</p>";
}

?>
