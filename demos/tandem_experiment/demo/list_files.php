<?php
$level = isset($_GET['level']) ? $_GET['level'] : 'uploads';
$dir = realpath($level) . "/";

// Verificar que la ruta es válida y dentro de "uploads" (para seguridad)
if (strpos($dir, realpath("uploads")) !== 0 || !is_dir($dir)) {
    echo json_encode([]);
    exit;
}

// Obtener los elementos de la carpeta actual
$items = array_diff(scandir($dir), array('.', '..'));

// Filtrar directorios
$directories = array_filter($items, function($item) use ($dir) {
    return is_dir($dir . DIRECTORY_SEPARATOR . $item);
});

// Filtrar archivos
$files = array_filter($items, function($item) use ($dir) {
    return !is_dir($dir . DIRECTORY_SEPARATOR . $item);
});

// Ordenar con orden natural
natsort($directories);
natsort($files);

// Unir directorios y archivos
$response = [
    'directories' => array_values($directories),
    'files' => array_values($files)
];

header('Content-Type: application/json');
echo json_encode($response);
?>