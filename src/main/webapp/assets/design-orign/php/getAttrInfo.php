<?php
	header ("Content-type:text/html;charset=gb2312");
	$file_path="../data/AttrInfo.json";
	if(file_exists($file_path)){
		$fp = fopen($file_path,"r");
		$str = fread($fp,filesize($file_path));//指定读取大小，这里把整个文件内容读取出来
	}
	echo $str;
