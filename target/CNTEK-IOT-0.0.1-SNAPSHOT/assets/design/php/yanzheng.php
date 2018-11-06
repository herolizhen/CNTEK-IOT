<?php
	header('Content-type:text/html;chaarset=gb2312');
	$pass = $_POST['Pass'];

	if($pass=="123456"){
		echo 1;
	}else{
		echo 0;
	}