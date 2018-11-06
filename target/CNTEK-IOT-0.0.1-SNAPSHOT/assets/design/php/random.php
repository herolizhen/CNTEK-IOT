<?php
	header('Content-type:text/html;chaarset=gb2312');
	$arr = $_POST;
	
    $out=[];
    foreach ($arr as $key => $value) {
    	$num = count($arr[$key]);
    	foreach ($value as $jian => $zhi) {
    		$out[$jian]=$zhi;
    		foreach ($zhi as $dev => $index) {
    			$out[$jian][$dev]=$index;
    			if($index==8||$index==16){
    				$num=rand(0,1);
    				$out[$jian]["nowValue"]=$num;
    			}else if($index==14||$index==15||$index==5){
    				$num=rand(0,100);
    				$out[$jian]["nowValue"]=$num;
    			}else if($dev=='marker'){
                    foreach ($index as $markerId => $markerVal) {
                        $out[$jian][$dev][$markerId]=$markerVal;
                        foreach ($markerVal as $k => $v) {
                            $out[$jian][$dev][$markerId][$k]=$v;//php 的rand和mt_rand都不能生成0-1之间的小数
                            $lngAttr = [113.273811,113.278123,113.277405,113.272805,113.278267,113.28416,113.286172,113.275967];
                            $latAttr = [23.144148,23.137368,23.143217,23.136571,23.136438,23.136571,23.132184,23.149996];
                            $lng = $lngAttr[array_rand($lngAttr,1)];
                            $lat =$latAttr[array_rand($latAttr,1)];
                            $out[$jian][$dev][$markerId]['pointLng']=$lng;
                            $out[$jian][$dev][$markerId]['pointLat']=$lat;
                        }
                    }
                }
    		}
    	}
    }
   
   
    echo json_encode($out);
