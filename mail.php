<?php
require 'php-mailer/PHPMailer.php';
require 'php-mailer/SMTP.php';
require 'php-mailer/Exception.php';

$body = json_decode(file_get_contents('php://input'));
$date = $body->date;
$phone = $body->phone;
$event = $body->userEvent;

$title = "Заявка | 1СПАРК | $date";
$body = "
<h2>Тестовое письмо</h2>
<b>Дата:</b> $date<br>
<b>Номер:</b> $phone<br>
<b>Событие:</b> $event<br><br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки письма, да простят меня боги разработки за захардкоженные данные учётки
    $mail->Host = 'smtp.yandex.ru';
    $mail->Username = 'uxername';
    $mail->Password = 'password';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('mail-sender@studio.ru', 'Заявки 1СПАРК');

    // Получатели письма
    $mail->addAddress('office@client.ru');
    $mail->addAddress('admin@example.com');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    if ($mail->send()) {
      $result = "success";
    } else {
      $result = "error";
    }
  } catch (Exception $e) {
      $result = "error";
      $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }

  echo json_encode([
    "result" => $result]);
?>
