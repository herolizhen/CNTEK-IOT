<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<title>用户管理</title>
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
<script src="<%=basePath%>/views/pow/js/user-dtu.js"></script>
</head>
<body>
	<div class="modal fade" id="userDtuModal" tabindex="-1" role="dialog" aria-labelledby="userDtuLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:800px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="userLabel">用户信息</h4>
				</div>
				<div class="modal-body row">
					<div class="col-xs-5">
						<p class="text-center">可选设备</p>
						<table id="allDtuTable"></table>
					</div>
					<div class="col-xs-2">
						<br />
						<br />
						<button type="button" id="btn_addDtu" class="btn btn-primary">增加</button>
						<br /> <br />
						<button type="button" id="btn_delDtu" class="btn btn-primary">移除</button>
						<br />
					</div>
					<div class="col-xs-5">
						<p class="text-center">可选设备</p>
						<table id="userDtuTable"></table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				用户授权<small>用户设备授权</small>
			</h3>
		</div>
		<div id="userToolbar">
			<button type="button" id="btn_del" class="btn btn-primary">删除</button>
		</div>
		<table id="userTable" data-toolbar="#userToolbar" />
	</div>
</body>
</html>
