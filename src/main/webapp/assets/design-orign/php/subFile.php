<?php
    header("Content-type: text/html; charset=gb2312"); 
	//包含一个文件上传类中的上传类
    include "uploadFile.php";
  

    $up = new fileupload;
    //设置属性(上传的位置， 大小， 类型， 名是是否要随机生成)
    $up -> set("path", "../data/");
    $up -> set("maxsize", 2000000);
    $up -> set("allowtype", array("jpeg", "jpg","png","gif"));
    $up -> set("israndname", false);

  
    //使用对象中的upload方法， 就可以上传文件， 方法需要传一个上传表单的名子 pic, 如果成功返回true, 失败返回false
    if($up -> upload("file")){
        $name = $_FILES['file']['name'];
        echo $name;
  
    } else {
        echo 0;
    }

