<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<title>组态设计工具</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta name="content-type" content="text/html; charset=UTF-8">

<link rel="stylesheet"
	href="<%=basePath%>assets/jquery-easyui/themes/default/easyui.css">
<link rel='stylesheet'
	href='<%=basePath%>views/design/css/uc-color-picker.css' />
<link rel='stylesheet'
	href='<%=basePath%>views/design/css/uc-goal-thermometer.css' />

<script src="<%=basePath%>assets/jquery/jquery-3.3.1.js"></script>
<script src="<%=basePath%>assets/jquery-easyui/jquery.easyui.min.js"></script>
<script src='<%=basePath%>/views/design/js/echarts.js'></script> 
<script src="<%=basePath%>views/design/js/uc-goal-thermometer.js"></script>
<script src='<%=basePath%>views/design/js/uc-color-picker.js'></script>
<script src="<%=basePath%>views/design/js/topo-show.js"></script>
<script src="<%=basePath%>views/design/js/easyui-lang-zh_CN.js"></script>


<style>
* {
	margin: 0;
	padding: 0;
}

.i_attrName {
	width: 85px;
}

ul {
	list-style: none;
	height: 580px;
}

#controlNameBox li {
	margin-top: 3px;
}

#controlNameBox li:hover {
	background: #ccc;
}

.controlName {
	display: inline-block;
	width: 140px;
	height: 24px;
	font: 13px bold 微软雅黑;
	color: #000;
	line-height: 24px;
	margin-left: 8px;
}

.CNicons {
	width: 24px;
	height: 24px;
	display: inline-block;
	vertical-align: top;
}

.clear {
	clear: both;
}

.smallocxdiv {
	border: 1px solid #ccc;
	float: left;
	margin-left: 2px;
	margin-top: 2px;
}

.triangle-down {
	position: absolute;
	left: 138px;
	top: 3px;
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 12px solid #000;
	z-index: 1;
}
</style>
</head>
<body class="easyui-layout" style="width:100%;height:100%;">

	<div title="预览" data-options="closable:false"
		style="padding:4px;position:relative;" id="previewBox"></div>

	<script type="text/javascript">
		var topoId = '${topoId}';
		var masterId = '${masterId}';
		var deviced = $.parseJSON('${topo}');
	</script>
</body>
</html>