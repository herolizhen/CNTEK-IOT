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
<script src="<%=basePath%>/views/dtu/js/info.js"></script>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=d0GGkN7Lnx6BqTGYzPiSHnPCj02daVYT"></script>
</head>

<body>

<!-- 设备配置信息维护 -->
	<div class="modal fade" id="infoModal" tabindex="-1"
		role="dialog" aria-labelledby="infoLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="infoLabel">设备基础台账信息</h4>
				</div>
				<form id="infoForm" name="infoForm" class="form-horizontal"
					role="form" novalidate="novalidate">
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">设备名称</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="dtuName" name="dtuName" class="form-control input-comm" placeholder="设备名称">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">SN号码</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="dtuSn" name="dtuSn" class="form-control input-comm" placeholder="A:00001">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">密码</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="dtuPw" name="dtuPw" class="form-control input-comm" placeholder="初始111111">
						</div>
					</div>
					
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">模块名称</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="moduleName" name="moduleName" class="form-control input-comm" placeholder="EMS3165">
						</div>
					</div>					
				
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">模块类型</p>
						</div>
						<div class="col-xs-8">
							<select id="moduleType" class="combobox selectpicker input-comm">
								<option value="1">2G</option>
								<option value="2">3G</option>
								<option value="3">4G</option>
								<option value="4">WIFI</option>
							</select>
						</div>
					</div>
					
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">固件版本</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="moduleType" name="moduleType" class="form-control input-comm" placeholder="0.0.1">
						</div>
					</div>
					
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">固件类型</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="moduleType" name="moduleType" class="form-control input-comm" placeholder="dtufirm">
						</div>
					</div>	
					
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">固件类型</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="iotVersion" name="iotVersion" class="form-control input-comm" placeholder="0.0.1">
						</div>
					</div>						

<!-- 					<div class="modal-body row"> -->
<!-- 						<div class="col-xs-3"> -->
<!-- 							<p class="text-right middle">是否激活</p> -->
<!-- 						</div> -->
<!-- 						<div class="col-xs-8"> -->
<!-- 							<label class="radio-inline">  -->
<!-- 								<input type="radio"	name="isActivate" id="isActivate0">否 -->
<!-- 							</label>  -->
<!-- 							<label class="radio-inline"> -->
<!-- 								<input type="radio" name="isActivate" id="isActivate1">是 -->
<!-- 							</label> -->
<!-- 						</div> -->
<!-- 					</div> -->
					
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">恢复出厂</p>
						</div>
						<div class="col-xs-8">
							<label class="radio-inline"> 
								<input type="radio"	name="isRecovery" id="isRecovery0">否
							</label> 
							<label class="radio-inline">
								<input type="radio" name="isRecovery" id="isRecovery1">是
							</label>
						</div>
					</div>										
					
<!-- 					<div class="modal-body row"> -->
<!-- 						<div class="col-xs-3"> -->
<!-- 							<p class="text-right middle">激活时间</p> -->
<!-- 						</div> -->
<!-- 						<div class="col-xs-8"> -->
<!-- 							<input type="text" id="activateTime" name="activateTime" class="form-control input-comm" placeholder="2018-12-12 02:03:01"> -->
<!-- 						</div> -->
<!-- 					</div>	 -->
					
					<input type="hidden" id="infoId">
				</form>
				<div class="modal-footer">
					<button id="btn_savinfo" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				DTU管理 <small>台账管理，设备基础台账维护</small>
			</h3>
		</div>
		<div id="infoToolbar">
			<button type="button" id="btn_newinfo" class="btn btn-primary">新增</button>
			<button type="button" id="btn_delinfo" class="btn btn-primary">删除</button>
		</div>
		<table id="infoTable" data-toolbar="#infoToolbar"/>
	</div>


	<script type="text/javascript">
		var userId = '${userId}';
		var orgId = '${orgId}';
	</script>
	
</body>
</html>
