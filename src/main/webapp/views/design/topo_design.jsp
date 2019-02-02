<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<title>组态设计工具</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta name="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=basePath%>/assets/jquery-easyui/themes/default/easyui.css">
<link rel='stylesheet' href='<%=basePath%>/views/design/css/uc-color-picker.css' />
<link rel='stylesheet' href='<%=basePath%>/views/design/css/uc-goal-thermometer.css' />
<script src="<%=basePath%>/assets/jquery/jquery-3.3.1.js"></script>
<script src="<%=basePath%>/assets/jquery-easyui/jquery.easyui.min.js"></script>
<script src='<%=basePath%>/views/design/js/echarts.js'></script>
<script src='<%=basePath%>/views/design/js/uc-goal-thermometer.js'></script>
<script src='<%=basePath%>/views/design/js/uc-color-picker.js'></script>
<script src="<%=basePath%>/views/design/js/topo-design.js"></script>
<script src="<%=basePath%>/views/design/js/easyui-lang-zh_CN.js"></script>
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
	<div region="north" class="easyui-panel" style="padding:5px;">
		<button id="btn_aline_left" type="button" class="easyui-linkbutton">左对齐</button>
		<button id="btn_aline_mid" type="button" class="easyui-linkbutton">垂直居中</button>
		<button id="btn_aline_right" type="button" class="easyui-linkbutton">右对齐</button>
		<button id="btn_aline_top" type="button" class="easyui-linkbutton">上对齐</button>
		<button id="btn_aline_center" type="button" class="easyui-linkbutton">水平居中</button>
		<button id="btn_aline_bottom" type="button" class="easyui-linkbutton">下对齐</button>
		<button id="btn_move_top" type="button" class="easyui-linkbutton">置于顶层</button>
		<button id="btn_move_pre" type="button" class="easyui-linkbutton">上移一层</button>
		<button id="btn_move_next" type="button" class="easyui-linkbutton">下移一层</button>
		<button id="btn_move_bottom" type="button" class="easyui-linkbutton">置于底层</button>
		<button id="btn_save" type="button" class="easyui-linkbutton">保存</button>
		<button id="btn_dele" type="button" class="easyui-linkbutton">删除</button>
	</div>
	<div region="west" split="true" style="width:200px;">
		<div title="工具箱" class="easyui-panel" id="ToolMenu" style="border:none;overflow: hidden;" fit="true">
			<ul style="width:100%;height:100%;" id="controlNameBox">
				<li data-cIndex='2'><img src="<%=basePath%>/views/design/images/icons/text.png" class="CNicons" alt=""> <a id="a_2" class=" controlName" group="">静态标签</a></li>
				<li data-cIndex='5'><img src="<%=basePath%>/views/design/images/icons/info.png" class="CNicons" alt=""> <a id="a_5" class=" controlName" group="">监测点信息</a></li>
				<li data-cIndex='11'><img src="<%=basePath%>/views/design/images/icons/button.png" class="CNicons" alt=""> <a id="a_11" class=" controlName"
					group="">控制按钮</a></li>
				<li data-cIndex='8'><img src="<%=basePath%>/views/design/images/icons/switch.png" class="CNicons" alt=""> <a id="a_8" class=" controlName"
					group="">开关量</a></li>
				<li data-cIndex='14'><img src="<%=basePath%>/views/design/images/icons/dash.png" class="CNicons" alt=""> <a id="a_14" class=" controlName"
					group="">表盘</a></li>
				<li data-cIndex='15'><img src="<%=basePath%>/views/design/images/icons/termometer.png" class="CNicons" alt=""> <a id="a_15" class=" controlName"
					group="">刻度表</a></li>
				<li data-cIndex='24'><img src="<%=basePath%>/views/design/images/icons/chart.png" class="CNicons" alt=""> <a id="a_24" class=" controlName"
					group="">图表控件</a></li>
			</ul>
		</div>
	</div>
	<div region="center" split="true">
		<div id="centerTabs" class="easyui-tabs" style="width:100%;height:100%;">
			<div title="组态图设计" id="contentBox" data-options="closable:false" style="padding:4px;position:relative;">
				<div id="resizeBox" style="position:relative;width:100%;height:100%;z-index:2;border:1px solid #ccc;overflow:hidden;" data-Box="bgBox"></div>
			</div>
			<div title="预览" data-options="closable:false" style="padding:4px;position:relative;" id="previewBox"></div>
		</div>
	</div>
	<div region="east" split="true" style="width:280px;" collapsed='false' title="属性|背景" id="eastBox">
		<div class="panel" style="width:100%; left: 976px; top: 29px;">
			<div id="dv_property">
				<table id="t_property" cellpadding="1" cellspacing="1">
					<tbody>
						<tr class="static">
							<td colspan="3"><select autocomplete="off" id="selele" name="selele" onclick="chg_selele()" style=" width:120px;">
									<option data-Id="bg" value="bg">背景</option>
							</select> <input type="button" value="删除" id="deleAttr"> <input type="button" value="保存" id="saveAttr"></td>
						</tr>
						<tr id="tr_buju" class="static">
							<td class="tct">-</td>
							<td class="tit" colspan="2">布局</td>
						</tr>
						<tr id="tr_i_x" class="static">
							<td></td>
							<td class="txt i_attrName">X</td>
							<td class="txt"><input id="i_x" name="x" class="input0" value="0" style="width:150px;"> px</td>
						</tr>
						<tr id="tr_i_y" class="static">
							<td></td>
							<td class="txt i_attrName">Y</td>
							<td class="txt"><input id="i_y" name="y" class="input0" value="0" style="width:150px;"> px</td>
						</tr>
						<tr id="tr_i_w" class="static">
							<td></td>
							<td class="txt i_attrName">宽度</td>
							<td class="txt"><input id="i_w" name="w" class="input0" value="20" style="width:150px;"> px</td>
						</tr>
						<tr id="tr_i_h" class="static">
							<td></td>
							<td class="txt i_attrName">高度</td>
							<td class="txt"><input id="i_h" name="h" class="input0" value="20" style="width:150px;"> px</td>
						</tr>
						<tr id="tr_waiguan" class="static">
							<td class="tct">-</td>
							<td class="tit" colspan="2">外观</td>
						</tr>
						<tr id="tr_i_borderwidth" class="static">
							<td></td>
							<td class="txt i_attrName">边框宽度</td>
							<td class="txt"><input id="i_borderwidth" name="borderWidth" class="input0" style="width:150px;"> px</td>
						</tr>
						<tr id="tr_i_padding" class="static">
							<td></td>
							<td class="txt i_attrName">边距</td>
							<td class="txt"><input id="i_padding" name="padding" style="width:150px;"> px</td>
						</tr>
						<tr id="tr_i_bordercolor" class="static">
							<td></td>
							<td class="txt i_attrName">边框颜色</td>
							<td class="txt"><input type="text" class="colorPicker" id="i_bordercolor" name="borderColor" value="#ccc"></td>
						</tr>
						<tr id="tr_i_scroll" style="display:none;">
							<td></td>
							<td class="txt i_attrName">背景滚动条</td>
							<td class="txt"><select id="i_scroll" name="scroll">
									<option value="hidden">无</option>
									<option value="auto">有</option>
							</select></td>
						</tr>
						<tr id="tr_i_panelStyle" style="display:none;">
							<td></td>
							<td class="txt i_attrName">测量数据类型</td>
							<td class="txt"><input id="i_panelStyle" name="panelStyle" class="input0" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_panelName" style="display:none;">
							<td></td>
							<td class="txt i_attrName">测量数据名称</td>
							<td class="txt"><input id="i_panelName" name="panelName" class="input0" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_Unit" style="display:none;">
							<td></td>
							<td class="txt i_attrName">单位</td>
							<td class="txt"><input id="i_Unit" name="Unit" class="input0" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_lineValue" style="display:none;">
							<td></td>
							<td class="txt i_attrName">分段</td>
							<td class="txt"><input id="i_lineValue" name="lineValue" class="input0" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_lineStyle" style="display:none;">
							<td></td>
							<td class="txt i_attrName">分段样式</td>
							<td class="txt"><input id="i_lineStyle" name="lineStyle" class="input0" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_panStyle" style="display:none;">
							<td></td>
							<td class="txt i_attrName">表盘样式</td>
							<td class="txt input0"><select name="panAngle" id="panAngle">
									<option value="240,-60">240,-60</option>
									<option value="150,-150">150,-150</option>
									<option value="360,1">360,0</option>
									<option value="180,0">180,0</option>
									<option value="330,30">330,30</option>
							</select></td>
						</tr>
						<tr id="tr_i_panelColor" style="display:none;">
							<td></td>
							<td class="txt i_attrName">表盘颜色</td>
							<td class="txt input0"><input type="text" class="colorPicker" name="panelColor" id="i_panelColor" value="#fff"></td>
						</tr>
						<tr id="tr_i_alpanelColor" style="display:none;">
							<td></td>
							<td class="txt i_attrName">表盘告警颜色</td>
							<td class="txt input0"><input type="text" class="colorPicker" name="alpanelColor" id="i_alpanelColor" value="#fff"></td>
						</tr>
						<tr id="tr_shuju" class="static">
							<td class="tct">-</td>
							<td class="tit" colspan="2">数据</td>
						</tr>
						<tr id="tr_i_tagtype" style="display:none;">
							<td></td>
							<td class="txt i_attrName">标签类型</td>
							<td class="txt"><select id="i_tagtype" name="tagtype">
									<option value="pic">图片类型</option>
									<option value="text">文本类型</option>
									<option value="group">组合类型</option>
							</select></td>
						</tr>
						<tr id="tr_i_deviceid" style="display:none;">
							<td></td>
							<td class="txt i_attrName" id="td_i_deviceid_tit">监测点</td>
							<td class="txt"><input id="i_deviceid" name="devname" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_moniShowMode" style="display:none;">
							<td></td>
							<td class="txt i_attrName">显示模式</td>
							<td class="txt"><select id="i_moniShowMode" name="moniShowMode">
									<option value="0">监测点</option>
									<option value="1">监测点值</option>
									<option value="2">监测点和值</option>
							</select></td>
						</tr>
						<tr id="tr_i_devnameShowMode" style="display:none;">
							<td></td>
							<td class="txt i_attrName">显示监测点文本</td>
							<td class="txt"><select id="i_devnameShowMode" name="devnameShowMode">
									<option value="0">否</option>
									<option value="1">是</option>
							</select></td>
						</tr>
						<tr id="tr_i_linkjson" style=" display:none;">
							<td></td>
							<td class="txt i_attrName" id="td_i_linkjson_tit">监测点集合</td>
							<td class="txt"><input id="i_linkjson" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_devtype" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">器件类型</td>
							<td class="txt"><select id="i_devtype" name="devtype">
									<optgroup label="常用器件">
										<option value="Switch">开关</option>
										<option value="Smoke">烟感</option>
										<option value="Infrared">红外</option>
										<option value="Leaker">漏水</option>
										<option value="Fan">风扇</option>
									</optgroup>
									<optgroup label="自定义器件" id="userDef">
										<option value="Definde">自定义图片类型</option>
										<option value="DefText">自定义文本类型</option>
									</optgroup>
							</select></td>
						</tr>
						<tr id="tr_i_DoorState" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">门状态点</td>
							<td class="txt"><input type="text" id="i_DoorState" name="DoorState" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_OpenStateValue" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">门打开值</td>
							<td class="txt"><select id="i_OpenStateValue" name="openValue">
									<option value="0">0</option>
									<option value="1">1</option>
							</select></td>
						</tr>
						<tr id="tr_i_OpenDoorState" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">开门控制点</td>
							<td class="txt"><input type="text" id="i_OpenDoorState" name="OpenDoorState" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_linkdeviceid" style=" display:none;">
							<td></td>
							<td class="txt" id="td_i_linkdeviceid_tit">联动点</td>
							<td class="txt i_attrName"><input id="i_linkdeviceid" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_CardReader" style=" display:none;">
							<td></td>
							<td class="txt" id="td1">读头</td>
							<td class="txt i_attrName"><input id="i_CardReader" name="CardReader" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_wenduid" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">温度</td>
							<td class="txt"><input id="i_wenduname" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_shiduid" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">湿度</td>
							<td class="txt"><input id="i_shiduname" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_dmaxvalue" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">量程最大值</td>
							<td class="txt"><input id="i_dmaxvalue" name="dmaxvalue" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_dminvalue" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">量程最小值</td>
							<td class="txt"><input id="i_dminvalue" name="dminvalue" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_imgurl" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">图片</td>
							<td class="txt"><input id="i_imgurl" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_alarmshowvalue" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">告警值</td>
							<td class="txt"><select id="i_alarmshowvalue" name="alarmValue">
									<option value="1">1</option>
									<option value="0">0</option>
							</select></td>
						</tr>
						<tr id="tr_i_inverse" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">开关图片反选</td>
							<td class="txt"><input type="checkbox" id="i_inverse" name="inverse" value="0" style="vertical-align: middle;" /> 反选</td>
						</tr>
						<tr id="tr_i_alarmMaxValue" style="display:none;">
							<td></td>
							<td class="txt i_attrName">告警上限</td>
							<td class="txt"><input type="text" id="i_alarmMaxValue" name="alarmMaxValue" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_alarmMinValue" style="display:none;">
							<td></td>
							<td class="txt i_attrName">告警下限</td>
							<td class="txt"><input type="text" id="i_alarmMinValue" name="alarmMinValue" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_alarmMode" style="display:none;">
							<td></td>
							<td class="txt">告警模式</td>
							<td class="txt"><select name="alarmMode" id="i_alarmMode">
									<option value="0">值告警</option>
									<option value="1">点/值告警</option>
							</select></td>
						</tr>
						<tr id="tr_i_photochgtime" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">切换速度</td>
							<td class="txt"><input id="i_photochgtime" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_photourl" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">照片路径</td>
							<td class="txt"><input id="i_photourl" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_photoindex" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">索引号</td>
							<td class="txt"><input id="i_photoindex" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_xingwei" style="display:none;">
							<td class="tct">-</td>
							<td class="tit" colspan="2">行为</td>
						</tr>
						<tr id="tr_i_txtauto" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">文本自动省略</td>
							<td class="txt"><select id="i_txtauto" onchange="i_txtauto_chg()">
									<option value="1">是</option>
									<option value="0">否</option>
							</select></td>
						</tr>
						<tr id="tr_i_alarmimgurl" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">告警图片</td>
							<td class="txt"><input id="i_alarmimgurl" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_userDefinde" style="display:none;">
							<td></td>
							<td class="txt i_attrName">自定义器件名称</td>
							<td class="txt"><input type="text" id="i_userDefinde" name="userDefinde" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_btnType" style="display:none;">
							<td></td>
							<td class="txt i_btnType">按钮类型</td>
							<td class="txt"><select name="btnType" id="i_btnType">
									<option value="general">普通按钮</option>
									<option value="ctrl">控制按钮</option>
									<option value="submit">提交按钮</option>
							</select></td>
						</tr>
						<tr id="tr_i_btnTogger" style="display:none;">
							<td></td>
							<td class="txt i_attrName">按钮显示模式</td>
							<td class="txt"><select name="btnStyle" id="i_btnTogger">
									<option value="pic">图片</option>
									<option value="text">文本</option>
									<option value="group">图文组合</option>
							</select></td>
						</tr>
						<tr id="tr_i_shape" style="display:none;">
							<td></td>
							<td class="txt i_attrName">显示形状</td>
							<td class="txt"><select name="shape" id="i_shape">
									<option value="rectangle">矩形</option>
									<option value="circle">圆形</option>
							</select></td>
						</tr>
						<tr id="tr_i_confirm" style="display:none;">
							<td></td>
							<td class="txt i_attrName">确认密码</td>
							<td class="txt"><select name="confirm" id="i_confirm">
									<option value="no">不需要</option>
									<option value="yes">需要</option>
							</select></td>
						</tr>
						<tr id="tr_i_sendValue" style="display:none;">
							<td></td>
							<td class="txt i_attrName">发送的值</td>
							<td class="txt"><select name="sendValue" id="i_sendValue">
									<option value="0">0</option>
									<option value="1">1</option>
							</select></td>
						</tr>
						<tr id="tr_i_dopenimgurl" style="display:none;">
							<td></td>
							<td class="txt i_attrName">值为0时图片</td>
							<td class="txt"><input id="i_dopenimgurl" name="openImgurl" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_dcloseimgurl" style="display:none;">
							<td></td>
							<td class="txt i_attrName">值为1时图片</td>
							<td class="txt"><input id="i_dcloseimgurl" name="closeImgurl" class="input0" value="" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_bj" style="display: none;">
							<td></td>
							<td class="txt i_attrName">背景图片</td>
							<td class="txt"><input id="i_bj" name="bgImg" class="input0" type="text" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_showmode" style="display: none;">
							<td></td>
							<td class="txt i_attrName">图片显示模式</td>
							<td class="txt"><select id="i_showmode" name="showmode">
									<option value="normal">正常</option>
									<option value="strech">拉伸</option>
									<option value="repeat">平铺</option>
									<option value="none">无图片</option>
							</select></td>
						</tr>
						<tr id="tr_i_dopenText" style="display:none;">
							<td></td>
							<td class="txt i_attrName">值为0时文本</td>
							<td class="txt"><input id="i_dopenText" name="openText" class="input0" value="打开" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_dcloseText" style="display:none;">
							<td></td>
							<td class="txt i_attrName">值为1时文本</td>
							<td class="txt"><input id="i_dcloseText" name="closeText" class="input0" value="关闭" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_tagtext" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">文本</td>
							<td class="txt"><input id="i_tagtext" name="tagtext" class="input0" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_markFont" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">刻度值字体</td>
							<td class="txt"><select name="markFont" id="i_markFont">
									<option value="mark">刻度值</option>
									<option value="measured">测量值</option>
							</select></td>
						</tr>
						<tr id="tr_i_font" style=" display:none;">
							<td></td>
							<td colspan="2">
								<table id="table_font" cellpadding="0" cellspacing="0">
									<tr id="tr_i_fontFamily" class="fontStyle">
										<td class="txt fontTxt i_attrName">文本字体</td>
										<td class="txt"><select id="i_fontFamily" name="fontFamily">
												<option value="Arial">Arial</option>
												<option value="Tahoma">Tahoma</option>
												<option value="Verdana">Verdana</option>
												<option value="SimSun">宋体</option>
												<option value="Microsoft Yahei">微软雅黑</option>
												<option value="STHeiti">华文黑体</option>
												<option value="Heiti SC">黑体-简</option>
												<option value="FangSong">仿宋</option>
												<option value="KaiTi">楷体</option>
										</select></td>
									</tr>
									<tr id="tr_i_textWeight" class="fontStyle">
										<td class="txt fontTxt i_attrName">文本粗细</td>
										<td class="txt"><select id="i_textWeight" name="fontWeight">
												<option value="normal">正常</option>
												<option value="bold">粗体</option>
										</select></td>
									</tr>
									<tr id="tr_i_fontSize" class="fontStyle">
										<td class="txt fontTxt i_attrName">文本大小</td>
										<td class="txt"><input type="text" id="i_fontSize" name="fontSize" value="14" style="width:150px;"> px</td>
									</tr>
									<tr id="tr_i_fontColor" class="fontStyle">
										<td class="txt fontTxt i_attrName">文本颜色</td>
										<td class="txt"><input type="text" class="colorPicker" id="i_fontColor" name="fontColor" value="#333" style="width:150px;"></td>
									</tr>
								</table>
							</td>
						</tr>
						<tr id="tr_i_textAlign" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">文本位置</td>
							<td class="txt"><select id="i_textAlign" name="textAlign">
									<option value="0">左上</option>
									<option value="1">中上</option>
									<option value="2">右上</option>
									<option value="3">左中</option>
									<option value="4">居中</option>
									<option value="5">右中</option>
									<option value="6">左下</option>
									<option value="7">中下</option>
									<option value="8">右下</option>
							</select></td>
						</tr>
						<tr id="tr_i_linkorgidstatus" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">是否链接</td>
							<td class="txt"><select id="i_linkorgidstatus" name="linkorgidstatus">
									<option value="0">否</option>
									<option value="1">是</option>
							</select></td>
						</tr>
						<!-- 						<tr id="tr_i_devGroupId" style="display:none;"> -->
						<!-- 							<td></td> -->
						<!-- 							<td class="txt i_attrName">组ID</td> -->
						<!-- 							<td class="txt input0"><input type="text" id="i_devGroupId" -->
						<!-- 								name="devGroupId" style="width:150px;"></td> -->
						<!-- 						</tr> -->
						<tr id="tr_i_moniDevId" style="display:none;">
							<td></td>
							<td class="txt i_attrName">监控点</td>
							<td class="txt input0"><input type="text" id="i_moniDevId" name="moniDevId" style="width:150px;"></td>
						</tr>
						<!-- 						<tr id="tr_i_MarkerLng" style="display:none;"> -->
						<!-- 							<td></td> -->
						<!-- 							<td class="txt i_attrName">经度</td> -->
						<!-- 							<td class="txt input0"><input type="text" id="i_MarkerLng" -->
						<!-- 								name="MarkerLng" style="width:150px;" class="marker"></td> -->
						<!-- 						</tr> -->
						<!-- 						<tr id="tr_i_MarkerLat" style="display:none;"> -->
						<!-- 							<td></td> -->
						<!-- 							<td class="txt i_attrName">纬度</td> -->
						<!-- 							<td class="txt input0"><input type="text" id="i_MarkerLat" -->
						<!-- 								name="MarkerLat" style="width:150px;" class="marker"></td> -->
						<!-- 						</tr> -->
						<!-- 						<tr id="tr_i_MarkerLable" style="display:none;"> -->
						<!-- 							<td></td> -->
						<!-- 							<td class="txt i_attrName">标记点文本</td> -->
						<!-- 							<td class="txt input0"><input type="text" id="i_MarkerLable" -->
						<!-- 								name="MarkerLable" style="width:150px;" class="marker"> -->
						<!-- 							</td> -->
						<!-- 						</tr> -->
						<tr id="tr_i_bjcolor" style="display: none;">
							<td></td>
							<td class="txt i_attrName">正常背景色</td>
							<td class="txt"><input id="i_bjcolor" name="bgColor" type="text" class="colorPicker marker" value="rgba(255,255,255,0)" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_alarmbjcolor" style="display: none;">
							<td></td>
							<td class="txt i_attrName">告警背景色</td>
							<td class="txt"><input id="i_alarmbjcolor" name="albgColor" type="text" class="colorPicker marker" value="rgba(255,255,255,0)" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_titleText" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">图表标题</td>
							<td class="txt"><input id="i_titleText" name="titleText" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_chartType" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">图表类型</td>
							<td class="txt"><select name="chartType" id="i_chartType">
									<option value="line">折线图</option>
									<option value="bar">柱状图</option>
							</select></td>
						</tr>
						<tr id="tr_i_chartSplit" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">X轴分段段数</td>
							<td class="txt"><input type="text" id="i_chartSplit" name="chartSplit"></td>
						</tr>
						<tr id="tr_i_addMoniState" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">添加监测点</td>
							<td class="txt"><input id="i_addMoniState" name="addMoniState" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_chartcolor" style="display: none;">
							<td></td>
							<td class="txt i_attrName">图例颜色</td>
							<td class="txt"><input id="i_chartcolor" name="chartcolor" type="text" class="colorPicker marker" value="rgba(0,0,0,1)" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_charttext" style="display: none;">
							<td></td>
							<td class="txt i_attrName">标记点文本</td>
							<td class="txt"><input id="i_charttext" name="charttext" type="text" style="width:150px;"></td>
						</tr>
						<tr id="tr_i_devlevel" class="static" style=" display:none;">
							<td></td>
							<td class="txt i_attrName">层级调整</td>
							<td class="txt input0"><select name="devlevel" id="i_devlevel">
									<option value="">--请选择--</option>
									<option value="top">置顶</option>
									<option value="pre">上一层</option>
									<option value="next">下一层</option>
									<option value="bottom">置底</option>
							</select></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div region="south" style="height:30px;" id='dev_south'>调试信息</div>
	<script type="text/javascript">
		var topoId   = '${topoId}';
		var masterId = '${masterId}';
		var devices  = {};
		if('${topo}' !=''){
			devices =  $.parseJSON('${topo}');
		}
 		console.log('${topo}');
	</script>
	<script src="<%=basePath%>/views/design/js/topo-design-init.js"></script>
</body>
</html>