<?php
    require("./functions.php");
    header('Access-Control-Allow-Origin: *');
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = null; $email = null; $assunto = null; $mensagem = null;

        if(isset($_POST['nome'])){
          $nome=$_POST['nome'];
        }
        if(isset($_POST['email'])){
          $email=$_POST['email'];
        }
        if(isset($_POST['assunto'])){
          $assunto=$_POST['assunto'];
        }
        if(isset($_POST['mensagem'])){
          $mensagem=$_POST['mensagem'];
        }

        // Check if all vars are setted
        if(!$nome || !$email || !$assunto || !$mensagem){
            http_response_code(202);
            echo "202 deu ruim";
            exit;
        }

        $teste = true;

        $nome = testInput($_POST["nome"]);
        $nome = filter_var($nome, FILTER_SANITIZE_STRING);
        $email = testInput($_POST["email"]);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $assunto = testInput($_POST["assunto"]);
        $assunto = filter_var($assunto, FILTER_SANITIZE_STRING);
        $mensagem = testInput($_POST["mensagem"]);
        $mensagem = filter_var($mensagem, FILTER_SANITIZE_STRING);
        
        if(!checkString($nome,50))
            $teste = false;
        if(!checkEmail($email))
            $teste = false;
        if(strlen($assunto) > 40)
            $teste = false;
        if(strlen($mensagem) > 500)
            $teste = false;
        
        if( ! empty($nome) and ! empty($email) and ! empty($assunto) and ! empty($mensagem) and $teste){
            $mensagem .= "<br><br>Menssagem de: " . $email . ".<br>Nome: " . $nome . "<br><br>";
            $to = "admin@uchiha.xyz";
            $subject = $assunto;
            $message = wordwrap($mensagem,70);
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= 'To: Admin Uchiha <admin@uchiha.xyz>' . "\r\n";
            $headers .= 'From: Crimapp <crimapp@uchiha.xyz>' . "\r\n";
            mail($to,$subject,$message,$headers);
            
            http_response_code(200);
            echo "deu certo :D";
            exit;
        }
        else{
            http_response_code(203);
            echo "deu ruim nos dados";
            exit;
        }
    }
?>