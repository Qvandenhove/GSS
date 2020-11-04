<?php
if (sizeof($_FILES) > 0){
    foreach($_FILES as $key => $file)
    $article_number = sizeof(scandir("./")) - 2;
    mkdir("./".strval($article_number));
    var_dump(move_uploaded_file($_FILES[$key]['tmp_name'], "./".$article_number."/".$_FILES[$key]["name"]));
    $unzipper = new ZipArchive();
    $unzipper->open("./".strval($article_number."/".$_FILES[$key]["name"]));
    $unzipper->extractTo("./".strval($article_number."/"));
}else{
    var_dump($_FILES);
    var_dump($_POST);
}

var_dump($_FILES);