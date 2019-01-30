<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
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
<link rel="stylesheet" href="<%=basePath%>/assets/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.css">

<script src="<%=basePath%>/assets/jquery/jquery-3.3.1.min.js"></script>
<script src="<%=basePath%>/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="<%=basePath%>/assets/bootstrap-table/src/bootstrap-table.js"></script>
<script src="<%=basePath%>/assets/bootstrap-table/src/tableExport.js"></script>
<script src="<%=basePath%>/assets/bootstrap-table/src/locale/bootstrap-table-zh-CN.js"></script>
<script src="<%=basePath%>/assets/jquery-validation/jquery.validate.js"></script>
<script src="<%=basePath%>/assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js"></script>
<script src="<%=basePath%>/views/pow/js/user.js"></script>

</head>
<body>
	<div class="modal fade"  id="userModal" tabindex="-1" role="dialog" aria-labelledby="userLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="userLabel">用户信息</h4>
				</div>
				<form id="userForm" name="userForm" class="form-horizontal" role="form" novalidate="novalidate">
					<div class="modal-body row">
						<div class="col-xs-2">
							<p class="text-right middle">账号</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="username" name="username" class="form-control input-comm" placeholder="hero">
						</div>
						<div class="col-xs-2">
							<p class="text-right middle">密码</p>
						</div>
						<div class="col-xs-4">
							<input type="password" id="password" name="password" class="form-control input-comm">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-2">
							<p class="text-right middle">姓名</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="realname" name="realname" class="form-control input-comm" placeholder="hero">
						</div>
						<div class="col-xs-2">
							<p class="text-right middle">出生日期</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="birthday" name="birthday" date-format="yyyy-mm-dd" class="form-control input-comm  form_datetime">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-2">
							<p class="text-right middle">联系电话</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="tel" name="tel" class="form-control input-comm">
						</div>
						<div class="col-xs-2">
							<p class="text-right middle">电子邮箱</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="mail" name="mail" class="form-control input-comm">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-2">
							<p class="text-right middle">性别</p>
						</div>
						<div class="col-xs-4">
							<select class="form-control input-comm" id="sex" name="sex">
								<option value="0">男</option>
								<option value="1">女</option>
							</select>
						</div>
						<div class="col-xs-2">
							<p class="text-right middle">账户状态</p>
						</div>
						<div class="col-xs-4">
							<select class="form-control input-comm" id="status" name="status">
								<option value="0">启用</option>
								<option value="1">停用</option>
							</select>
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-2">
							<p class="text-right middle">居住地址</p>
						</div>
						<div class="col-xs-10">
							<input type="text" id="address" name="address" class="form-control input-comm">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-2">
							<p class="text-right middle">所在公司</p>
						</div>
						<div class="col-xs-4">
							<select class="form-control input-comm" id="companySel" name="companySel">
							</select>
						</div>
						<div class="col-xs-2">
							<p class="text-right middle">职务</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="job" name="job" class="form-control input-comm">
						</div>
					</div>
					<input type="hidden" id="company">
					<input type="hidden" id="orgId"> 
					<input type="hidden" id="appId"> 
				</form>
				<div class="modal-footer">
					<button id="btn_sav" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				用户管理<small>系统用户维护</small>
			</h3>
		</div>
		<div id="userToolbar">
			<button type="button" id="btn_new" class="btn btn-primary">新增</button>
			<button type="button" id="btn_del" class="btn btn-primary">删除</button>
		</div>
		<table id="userTable" data-toolbar="#userToolbar" />
	</div>
</body>
</html>
