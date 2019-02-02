<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ path + "/";
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
<script src="<%=basePath%>/views/design/js/modbus-master.js"></script>
<script src="<%=basePath%>/views/design/js/modbus-metadata.js"></script>
<script src="<%=basePath%>/views/design/js/modbus-topo.js"></script>
</head>
<body>
	<!-- 模态框 规则定义 -->
	<div class="modal fade" id="detailMasterModal" tabindex="-1" role="dialog" aria-labelledby="detailMasterLabel" aria-hidden="true" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="detailMasterLabel">模态框（Modal）标题</h4>
				</div>
				<div class="modal-body row">
					<div class="col-xs-12">
						<div class="input-group ">
							<span class="input-group-addon">规则名称</span> <input type="text" id="name" class="form-control">
						</div>
						<br>
						<div class="input-group ">
							<span class="input-group-addon">规则说明</span>
							<textarea class="form-control" id="description" placeholder="规则说明" rows="3"></textarea>
						</div>
						<br>
						<div class="input-group ">
							<span class="input-group-addon">数据展示</span>
							<div class="form-control">
								<label class="radio-inline"> <input type="radio" name="displayType" id="displayType0"> 列表展示
								</label> <label class="radio-inline"> <input type="radio" name="displayType" id="displayType1"> 组态展示
								</label>
							</div>
						</div>
						<br>
						<div class="input-group ">
							<span class="input-group-addon">控制权限</span>
							<div class="form-control">
								<label class="radio-inline"> <input type="radio" name="powWrite" id="powWrite0"> 不可以
								</label> <label class="radio-inline"> <input type="radio" name="powWrite" id="powWrite1">可以
								</label>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="id"> <input type="hidden" id="masterId">
				<div class="modal-footer">
					<button id="btn_savmaster" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 元数据列表-->
	<div class="modal fade" id="mbMdTableModal" tabindex="-1" role="dialog" aria-labelledby="mbMdTableLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:900px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="mbMdTableLabel">模态框（Modal）标题</h4>
				</div>
				<div id="toolbarmbMdTableModal">
					<button type="button" id="btn_download" class="btn btn-primary" onClick="$('#mbMdTable').tableExport({ type: 'excel', escape: 'false' })">数据导出</button>
					<button type="button" id="btn_delmbmd" class="btn btn-primary">删除</button>
					<button type="button" id="btn_newmbmd" class="btn btn-primary">新增</button>
				</div>
				<table id="mbMdTable" data-toolbar="#toolbarmbMdTableModal"></table>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 元数据定义-->
	<div class="modal fade" id="mbMdModifyModal" tabindex="-1" role="dialog" aria-labelledby="mbMdModifyLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="mbMdModifyLabel">新增元素</h4>
				</div>
				<form id="addOrUpdateMbmdForm" name="addOrUpdateMbmdForm" class="form-horizontal" role="form" novalidate="novalidate">
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">数据名称</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="dataName" name="dataName" class="form-control input-comm" placeholder="例如：温度1#">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3 ">
							<p class="text-right middle">设备从站地址</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="gateNo" name="gateNo" class="form-control input-comm" >
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">功能码</p>
						</div>
						<div class="col-xs-8">
							<select id="funCode"  class="form-control input-comm">
								<option value="1">01:读线圈</option>
								<option value="2">02:读离散量输入</option>
								<option value="3">03:读保持寄存器</option>
								<option value="4">04:读输入寄存器</option>
							</select>
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">寄存器地址</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="regAddress" name="regAddress" class="form-control input-comm ">
						</div>
					</div>
					<div class="modal-body row" id="d_dataType">
						<div class="col-xs-3">
							<p class="text-right middle">数值类型</p>
						</div>
						<div class="col-xs-8">
							<select id="dataType"  class="form-control input-comm">
								<option value="1">16位整形(有符号)</option>
								<option value="2">16位整形(无符号)</option>
								<option value="3">32位整形(有符号)</option>
								<option value="4">32位整形(无符号)</option>
								<option value="5">浮点型</option>
								<option value="6">开关型</option>
							</select>
						</div>
					</div>
					<div class="modal-body row" id="d_dataDecode">
						<div class="col-xs-3">
							<p class="text-right middle">解码顺序</p>
						</div>
						<div class="col-xs-8">
							<select  id="dataDecode"  class="form-control input-comm">
								<option value="1">1234</option>
								<option value="2">2143</option>
								<option value="3">3412</option>
								<option value="4">4321</option>
							</select>
						</div>
					</div>
					<div class="modal-body row" id="d_dataUnit">
						<div class="col-xs-3">
							<p class="text-right middle">单位</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="dataUnit" name="dataUnit" class="form-control input-comm" placeholder="℃">
						</div>
					</div>
					<div class="modal-body row" id="d_dataFun">
						<div class="col-xs-3">
							<p class="text-right middle">计算公式</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="formula" name="formula" class="form-control input-comm ">
						</div>
					</div>
					<div class="modal-body row" id="d_dataBitPos">
						<div class="col-xs-3">
							<p class="text-right middle">bit位</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="dataBitPos" name="dataBotPos" class="form-control input-comm ">
						</div>
					</div>
					<div class="modal-body row" id="d_data0Dis">
						<div class="col-xs-3">
							<p class="text-right middle">0对应内容</p>
						</div>
						<div class="col-xs-8">
							<select  id="data0Dis" class="form-control input-comm ">
								<option value="0">OFF</option>
								<option value="1">ON</option>
							</select>
						</div>
					</div>
					<div class="modal-body row" id="d_data1Dis">
						<div class="col-xs-3">
							<p class="text-right middle">1对应内容</p>
						</div>
						<div class="col-xs-8">
							<select id="data1Dis" class="form-control input-comm ">
								<option value="0">OFF</option>
								<option value="1">ON</option>
							</select>
						</div>
					</div>
					<input type="hidden" id="metadataId"> <input type="hidden" id="disOrder">
				</form>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="btn_newmbmd">新增</button>
					<button type="button" class="btn btn-primary" id="btn_mbmdSave">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!--topo 列表-->
	<div class="modal fade" id="topoTableModal" tabindex="-1" role="dialog" aria-labelledby="topoTableLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="topoTableLabel">模态框（Modal）标题</h4>
				</div>
				<div id="toolbarTopoTable">
					<button type="button" id="btn_deltopo" class="btn btn-primary">删除</button>
					<button type="button" id="btn_newtopo" class="btn btn-primary">新增</button>
				</div>
				<table id="topoTable" data-toolbar="#toolbarTopoTable"></table>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- topo 新增 -->
	<div class="modal fade" id="topoModifyModal" tabindex="-1" role="dialog" aria-labelledby="topoModifyLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="topoModifyLabel">新增组态画面</h4>
				</div>
				<form id="topoForm" name="topoForm" class="form-horizontal" role="form" novalidate="novalidate">
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">页面标题</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="title" name="title" class="form-control input-comm" placeholder="标题1#">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">页面尺寸</p>
						</div>
						<div class="col-xs-8">
							<select id="size" class="defult-select">
								<option value="800*600">800×600</option>
								<option value="960*600">960×600</option>
								<option value="1024*600">1024×600</option>
								<option value="1024*768">1024×768</option>
								<option value="1280*768">1280×768</option>
								<option value="1366*768">1360×768</option>
								<option value="1280*1024">1280×1024</option>
								<option value="1920*1080">1920×1080</option>
								<option value="">自定义</option>
							</select>
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">页面宽度</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="pageWidth" name="pageWidth" disabled="disabled" class="form-control input-comm">
						</div>
					</div>
					<div class="modal-body row">
						<div class="col-xs-3">
							<p class="text-right middle">页面高度</p>
						</div>
						<div class="col-xs-8">
							<input type="text" id="pageHeight" name="pageHeight" disabled="disabled" class="form-control input-comm">
						</div>
					</div>
					<input type="hidden" id="topoId">
				</form>
				<div class="modal-footer">
					<button id="btn_savtopo" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid div_dev">
		<div class="page-header">
			<h3>
				设备规则定义 <small>定义设备元数据及展示界面</small>
			</h3>
		</div>
		<div id="toolbar">
			<!--<button class="btn btn-primary" onClick="$('#tableData').tableExport({ type: 'excel', escape: 'false' })">数据导出</button> -->
			<button type="button" id="btn_newmaster" class="btn btn-primary">新增</button>
			<button type="button" id="btn_delmaster" class="btn btn-primary">删除</button>
		</div>
		<table id="tableData" data-toolbar="#toolbar">
		</table>
	</div>
	<script type="text/javascript">
		var orgId = '${orgId}';
		var userId = '${userId}';
	</script>
</body>
</html>
