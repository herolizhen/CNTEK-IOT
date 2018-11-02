<?php
	header("Content-type: text/html; charset=gb2312"); 
	$file_path="../json/deviceid_data.json";
	$pageNum=$_POST['page'];
	$pageSize=$_POST['rows'];
	// $devName=$_POST['devname'];
	

	if(file_exists($file_path)){
		$fp = fopen($file_path,"r");
		$str = fread($fp,filesize($file_path));//指定读取大小，这里把整个文件内容读取出来
	}
	$start=($pageNum-1)*$pageSize;
	$end=$pageNum*$pageSize;
	$array = explode('},',$str); 
	$outArr=array_slice($array,$start,$end);
	$json=implode('},',$outArr);
	if(count($array)<=$end){
		$outStr='{"total":"'.count($array).'","rows":['.$json.']}';
	}else{
		$outStr='{"total":"'.count($array).'","rows":['.$json.'}]}';
	}

	echo iconv("utf-8","gb2312//IGNORE",$outStr);