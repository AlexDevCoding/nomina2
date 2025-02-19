<?php
session_start();
include 'conexion.php'; // Asegúrate de tener tu archivo de conexión configurado correctamente

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = mysqli_real_escape_string($conn, $_POST['usuario']);
    $contrasena = mysqli_real_escape_string($conn, $_POST['contrasena']);

    $query = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        if (password_verify($contrasena, $user['contrasena'])) {
            $_SESSION['id_usuario'] = $user['id_usuario'];
            $_SESSION['rol'] = $user['rol'];

            if ($user['rol'] === 'Administrador') {
                header('Location: admin/index.php');
            } else {
                header('Location: empleado/index.php');
            }
            exit();
        } else {
            $error = 'Contraseña incorrecta';
        }
    } else {
        $error = 'Usuario no encontrado';
    }
}
?>