<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<title>设计主索引</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta name="content-type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="<%=basePath%>/assets/bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="<%=basePath%>/assets/bootstrap-table/src/bootstrap-table.css">
<link rel="stylesheet" href="<%=basePath%>/static/css/comm.css">

<script src="<%=basePath%>/assets/jquery/jquery-3.3.1.min.js"></script>
<script src="<%=basePath%>/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="<%=basePath%>/assets/bootstrap-table/src/bootstrap-table.js"></script>
<script src="<%=basePath%>/assets/bootstrap-table/src/tableExport.js"></script>
<script src="<%=basePath%>/assets/bootstrap-table/src/locale/bootstrap-table-zh-CN.js"></script>
<script src="<%=basePath%>/assets/jquery-validation/jquery.validate.js"></script>
<script src="<%=basePath%>/views/dtu/js/user-dtu.js"></script>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=d0GGkN7Lnx6BqTGYzPiSHnPCj02daVYT"></script>
</head>

<body>

	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				用户设备列表<small>用户的DTU设备</small>
			</h3>
		</div>
		<table id="userDtuListTable"/>
	</div>


	<script type="text/javascript">
		var userId = '${userId}';
		var orgId = '${orgId}';
	</script>
	
</body>
</html>
