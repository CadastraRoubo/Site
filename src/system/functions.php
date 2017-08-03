<?php
    
    // Checa se dados enviados atraves de formulario são validos
    function testInput($data) { // pronta
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        
        return $data;
    }
    // Valida conteudo e tamanho de strings
    function checkString($text,$tam){ // pronto
        if(strlen($text) > $tam)
            return false;
        
        $teste1 = preg_match("/^[a-zA-Z ]*$/",$text);
        $teste2 = preg_match("#[0-9]+#", $text);
        if (!$teste1 and !$teste2)
            return false;
        else
            return true;
    }
    // Valida email de usuario
    function checkEmail($email){ // pronto
        if(strlen($email) > 50)
            return false;
        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            return false;
        else
            return true;
    }
?>