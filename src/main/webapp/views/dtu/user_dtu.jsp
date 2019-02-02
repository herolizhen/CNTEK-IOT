<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<title>用户设备管理</title>
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
	<div class="modal fade" id="configModal" tabindex="-1" role="dialog" aria-labelledby="configLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="configLabel">设备详情</h4>
				</div>
				<div class="modal-body row" id="dtuImg">
					<div class="col-xs-3"></div>
					<div class="col-xs-6">
						<img id="equipImg" src="" class="img-responsive" alt="设备图"
							style="display: block;">
					</div>
					<div class="col-xs-3"></div>
				</div>
				<div class="modal-body row">
					<div class="col-xs-3">
						<p class="text-right middle">设备名称</p>
					</div>
					<div class="col-xs-8">
						<input type="text" id="name" name="name" class="form-control input-comm"  readonly="readonly">
					</div>
				</div>
				<div class="modal-body row">
					<div class="col-xs-3">
						<p class="text-right middle">备注</p>
					</div>
					<div class="col-xs-8">
						<input type="text" id="memo" name="memo" class="form-control input-comm" readonly="readonly" >
					</div>
				</div>
				<div class="modal-body row">
					<div class="col-xs-3">
						<p class="text-right middle">模块sn码</p>
					</div>
					<div class="col-xs-3">
						<input type="text" id="dtuSn" name="dtuSn" class="form-control input-comm" readonly="readonly" >
					</div>
					<div class="col-xs-2">
						<p class="text-right middle">数据规则</p>
					</div>
					<div class="col-xs-3">
						<input type="text" id="ruleName" name="ruleName" class="form-control input-comm" readonly="readonly">
					</div>
				</div>
				<div class="modal-body row">
					<div class="col-xs-3">
						<p class="text-right middle">是否公开</p>
					</div>
					<div class="col-xs-8">
						<label class="radio-inline"> <input type="radio" name="isOpen" id="isOpen0"> 不公开
						</label> <label class="radio-inline"> <input type="radio" name="isOpen" id="isOpen1"> 公开
						</label>
					</div>
				</div>
				<div class="modal-body row">
					<div class="col-xs-3">
						<p class="text-right middle">所在地</p>
					</div>
					<div class="col-xs-8">
						<input type="text" id="location" name="location" class="form-control input-comm" readonly="readonly" >
					</div>
				</div>
				<div class="modal-body row">
					<div class="col-xs-3">
						<p class="text-right middle">经纬度</p>
					</div>
					<div class="col-xs-4">
						<input type="text" id="longitude" name="longitude" class="form-control input-comm" readonly="readonly">
					</div>
					<div class="col-xs-4">
						<input type="text" id="latitude" name="latitude" class="form-control input-comm" readonly="readonly">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
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
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				用户设备列表<small>用户的DTU设备</small>
			</h3>
		</div>
		<table id="userDtuListTable" />
	</div>
	<script type="text/javascript">
		var userId = '${userId}';
		var orgId = '${orgId}';
	</script>
</body>
</html>
