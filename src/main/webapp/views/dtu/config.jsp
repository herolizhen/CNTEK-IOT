<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<title>DTU配置管理</title>
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
<script src="<%=basePath%>/views/dtu/js/config.js"></script>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=d0GGkN7Lnx6BqTGYzPiSHnPCj02daVYT"></script>
</head>
<body>
	<div class="modal fade" id="configModal" tabindex="-1" role="dialog" aria-labelledby="configLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="configLabel">设备配置信息维护</h4>
				</div>
				<form id="configForm" name="configForm" class="form-horizontal" role="form" novalidate="novalidate">
					<div class="modal-body row" id="dtuImg">
						<div class="col-xs-3"></div>
						<div class="col-xs-6">
							<img id="equipImg" src="http://cdn.lfemcp.com/userimg/equip/fa/fa4a1792-f8f4-4e91-abb1-84a17e29a30b.jpg" class="img-responsive" alt="设备图"
								style="display: block;">
						</div>
						<div class="col-xs-3"></div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">选择图片</p>
						</div>
						<div class="col-xs-6">
							<input type="file" class="form-control input-comm" id="fileSelect" name="fileSelect" accept="image/jpeg,image/gif,image/png,image/svg">
						</div>
						<div class="col-xs-2">
							<button type="button" id="btn_uploadImg" class="btn btn-primary">上传</button>
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">设备名称</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="name" name="name" class="form-control input-comm" placeholder="设备名称">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">备注</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="memo" name="memo" class="form-control input-comm" placeholder="设备备注">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">模块sn码</p>
						</div>
						<div class="col-xs-3">
							<input type="text" id="dtuSn" name="dtuSn" class="form-control input-comm" placeholder="如：A00001">
						</div>
						<div class="col-xs-2">
							<p class="text-right middle">模块密码</p>
						</div>
						<div class="col-xs-3">
							<input type="text" id="password" name="password" class="form-control input-comm" placeholder="如：111111">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">数据规则</p>
						</div>
						<div class="col-xs-6">
							<input type="text" id="ruleName" name="ruleName" class="form-control input-comm">
						</div>
						<div class="col-xs-2">
							<button type="button" id="btn_openRule" class="btn btn-primary">选择</button>
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
						<div class="col-xs-6">
							<input type="text" id="location" name="location" class="form-control input-comm" placeholder="地址选择">
						</div>
						<div class="col-xs-2">
							<button type="button" id="btn_selectGis" class="btn btn-primary">地图</button>
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
					<input type="hidden" id="configId"> <input type="hidden" id="ruleId"> <input type="hidden" id="imgUrl">
				</form>
				<div class="modal-footer">
					<button id="btn_savconfig" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 选择展示规则 -->
	<div class="modal fade" id="ruleTableModal" tabindex="-1" role="dialog" aria-labelledby="ruleTableLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:700px">
			<div class="modal-content" style="padding: 1px 10px 1px;">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="ruleTableLabel">可选择的数据及展示规则</h4>
				</div>
				<div id="rulebarTopoTable"></div>
				<table id="ruleTable" data-toolbar="rulebarTopoTable"></table>
				<div class="modal-footer">
					<button id=btn_selRule type="button" class="btn btn-primary">选择</button>
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
								<button type="button" id="btn_selpoint" class="btn btn-primary">选择</button>
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
				设备管理<small>用户添加设备，选择元数据、监控界面</small>
			</h3>
		</div>
		<div id="configToolbar">
			<button type="button" id="btn_newconfig" class="btn btn-primary">新增</button>
			<button type="button" id="btn_delconfig" class="btn btn-primary">删除</button>
		</div>
		<table id="configTable" data-toolbar="#configToolbar" />
	</div>
	<script type="text/javascript">
		var userId = '${userId}';
		var orgId = '${orgId}';
	</script>
</body>
</html>
