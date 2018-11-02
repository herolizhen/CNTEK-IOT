<?php
	header("Content-type: text/html; charset=gb2312"); 
	$Attr = $_POST;
	$str = json_encode($Attr);
	$num = file_put_contents("../data/AttrInfo.json",$str,FILE_APPEND);
	echo json_encode($num);