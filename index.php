<?php

var_dump($_FILES);
    foreach ($_FILES as $file) {
        $article_number = sizeof(scandir("./inputs")) - 1;
        mkdir("./inputs/".strval($article_number));
        $zip_path = "./inputs/".strval($article_number)."/site.rar";
        move_uploaded_file($file['tmp_name'], $zip_path);
        $unzipper = new ZipArchive();
        chmod("./inputs/".strval($article_number), 0777);
        chmod($zip_path, 0777);
        var_dump($unzipper->open($zip_path) == true);
        $unzipper->extractTo("./inputs/".strval($article_number)."/");
        $unzipper->close();
        echo(json_encode(["response" => "Fichier reçus"]));
        // unlink("./inputs/".strval($article_number."/".$file["name"]));
    }
}else{
    echo(json_encode(["response" => "Fichier non traités"]));
}
