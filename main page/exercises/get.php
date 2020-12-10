<?php
	$db = mysqli_connect('127.0.0.1','root','root','learningenglish'); // Підключення до БД
	$sql = "SELECT * FROM maintable";  // Витягування всіх(*) даних
	$result = mysqli_query($db,$sql); // 
	$arr = mysqli_fetch_all($result);
	echo(json_encode($arr)); // КОдування в джсон шоб передати дані в джс

	