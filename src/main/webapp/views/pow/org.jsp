<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<title>组织机构管理</title>
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
<script src="<%=basePath%>/views/pow/js/org.js"></script>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=d0GGkN7Lnx6BqTGYzPiSHnPCj02daVYT"></script>
</head>
<body>
	<div class="modal fade" id="orgModal" tabindex="-1" role="dialog" aria-labelledby="orgLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="orgLabel">组织机构信息</h4>
				</div>
				<form id="orgForm" name="orgForm" class="form-horizontal" role="form" novalidate="novalidate">
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">机构名称</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="name" name="name" class="form-control input-comm" placeholder="机构名称">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">法人姓名</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="legalName" name="legalName" class="form-control input-comm" placeholder="hero">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">业务范围</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="businessScope" name="businessScope" class="form-control input-comm" placeholder="云计算">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle ">成立日期</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="foundDate" name="foundDate" date-format="yyyy-mm-dd" class="form-control input-comm  form_datetime">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">所在地</p>
						</div>
						<div class="col-xs-6">
							<input type="text" id="address" name="address" class="form-control input-comm" placeholder="地址选择">
						</div>
						<div class="col-xs-2">
							<button type="button" id="btn_openGis" class="btn btn-primary">地图</button>
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">经纬度</p>
						</div>
						<div class="col-xs-4">
							<input type="text" id="longitude" name="longitude" class="form-control input-comm" placeholder="经度">
						</div>
						<div class="col-xs-4">
							<input type="text" id="latitude" name="latitude" class="form-control input-comm" placeholder="纬度">
						</div>
					</div>
					<input type="hidden" id="orgId"> <input type="hidden" id="appId">
				</form>
				<div class="modal-footer">
					<button id="btn_sav" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- GIS -->
	<div class="modal fade" id="gisModal" tabindex="-1" role="dialog" aria-labelledby="gisModalLabel" aria-hidden="true" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="gislModalLabel">设备地图</h4>
				</div>
				<div id="baiduMap"></div>
				<div class="modal-footer">
					<div class="modal-body row">
						<div class="col-xs-6">
							<div class="input-group ">
								<span class="input-group-addon">地址</span> <input type="text" id="suggestId" class="form-control">
							</div>
						</div>
						<div class="col-xs-6">
							<div class="input-group ">
								<button type="button" id="btn_selGisPoint" class="btn btn-primary">选择</button>
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				组织机构<small>机构信息维护</small>
			</h3>
		</div>
		<div id="orgToolbar">
			<button type="button" id="btn_new" class="btn btn-primary">新增</button>
			<button type="button" id="btn_del" class="btn btn-primary">删除</button>
		</div>
		<table id="orgTable" data-toolbar="#orgToolbar" />
	</div>
</body>
</html>