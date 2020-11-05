<?php
// echo phpinfo();

if (sizeof($_FILES) > 0){
    foreach ($_FILES as $file) {
        mkdir("./inputs/".strval($_GET['name']));
        $zip_path = "./inputs/".strval($_GET['name'])."/site.rar";
        move_uploaded_file($file['tmp_name'], $zip_path);
        $unzipper = new ZipArchive();
        chmod("./inputs/".strval($_GET['name']), 0777);
        chmod($zip_path, 0777);
        var_dump($unzipper->open($zip_path) == true);
        $unzipper->extractTo("./inputs/".strval($_GET['name'])."/");
        $unzipper->close();
        echo(json_encode(["response" => "Fichier reçus"]));
        // unlink("./inputs/".strval($article_number."/".$file["name"]));
    }
}else{
    echo(json_encode(["response" => "Fichier non traités"]));
}