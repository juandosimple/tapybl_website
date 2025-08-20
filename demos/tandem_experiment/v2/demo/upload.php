<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["file"]) && isset($_POST["level"])) {
    $level = trim($_POST["level"]);  // Eliminar espacios adicionales
    $level = preg_replace('/\s+/', '-', $level); // Reemplazar espacios internos con guiones por seguridad
    $uploadDir = "uploads/$level/"; // Directorio de destino
    
    // Verificar si la carpeta existe, si no, crearla
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Obtener el nombre original del archivo
    $fileName = basename($_FILES["file"]["name"]);

    // Limpiar el nombre del archivo (remover espacios y caracteres especiales)
    $fileName = preg_replace('/[^a-zA-Z0-9.-_]/', '', $fileName);

    $targetFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["success" => true, "filename" => $fileName, "message" => "File uploaded successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error uploading file"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>