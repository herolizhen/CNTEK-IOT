
$(function() {
	initTable();
	$('#gisModal').on('shown.bs.modal', function() {
		openGis(rowdata);
	})
});
function initTable() {
	$('#userDtuListTable').bootstrapTable({
		url : 'getConfigPage', //服务器数据的加载地址
		showHeader : false,
		showRefresh : true,
		checkboxHeader : true,
		striped : true, //设置为 true 会有隔行变色效果
		pagination : true, //开启分页
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 50, 100, 1000 ], //可选的每页数据
		search : true,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(res) {
			return res;
		},
		queryParams : function(params) {
			return {
				limit : params.limit,
				offset : params.offset,
				userId : userId
			}
		}, //请求服务器数据时的参数
		columns : [
			{
				field : 'imgUrl',
				title : '我的设备',
				width : '200',
				halign : 'center',
				formatter : imgFromUrl
			},
			{
				field : 'name',
				title : '设备名称',
				width : '600',
				sortable : true,
				halign : 'center',
				align : 'left',
				valign : 'middle',
				formatter : dataFormatter
			},
			{
				field : 'operate',
				title : '操作',
				width : '120',
				halign : 'center',
				align : 'center',
				valign : 'middle',
				formatter : operateFormatter,
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}

function imgFromUrl(value, row, index) {
	var inHtml = [ '<a  target="_blank" href="topoShow?dtuId=' + row.id + '">',
		'<img  src="' + value + '"  style="padding:1px;background:#ACF1FD;border:solid #ACF1FD 1px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px; max-width: 100%" >',
		'</a>'
	].join('');
	return inHtml;
}

function dataFormatter(value, row, index) {
	var isOnline;
	if (row.isOnline) {
		isOnline = '在线';
	} else {
		isOnline = '离线';
	}

	return [
		'设备名称：' + row.name,
		'<br/>',
		'是否在线：' + isOnline,
		'<br/>',
		'备注：' + row.memo,
		'<br/>',
		'设备描述：' + row.memo,
		'<button type="button" class="btn btn-success  btn-xs" ',
		'style="margin-right:5px;"  data-toggle="modal" data-target="#configModal"',
		' onclick="showDetail(\'' + escape(JSON.stringify(row)) + '\')">设备详情</button>',
		'<br/>',
		'安装位置:' + row.location,
		'<button type="button" class="btn btn-success  btn-xs" ',
		'style="margin-right:5px;"   data-toggle="modal" data-target="#gisModal"',
		' onclick="preOpenGis(\'' + escape(JSON.stringify(row)) + '\')">GIS 位置</button>'
	].join('');

}

//gis变量
var marker;
var rowdata;

function preOpenGis(escap) {
	rowdata = escap;
}

function operateFormatter(value, row, index) {
	return [
		'<a class="btn btn-success  btn-lg" target="_blank" href="topoShow?dtuId=' + row.id + '">实时数据</a>'
	].join('');
}

function openGis(escap) {
	var row = unescape(escap);
	row = JSON.parse(row);

	$('#gislModalLabel').text("设备：" + row.name + "地理位置");
	$('#gisModal').modal('show');
	// 百度地图API功能
	var baiduMap = new BMap.Map("baiduMap");
	var point = new BMap.Point(row.longitude, row.latitude);

	baiduMap.centerAndZoom(point, 14);
	baiduMap.enableScrollWheelZoom();
	baiduMap.disableDoubleClickZoom();

	function add() {
		// 创建标注
		var myIcon = new BMap.Icon("../static/bootstrap-solid.svg", new BMap.Size(38, 38));
		marker = new BMap.Marker(point, {
			icon : myIcon
		});
		baiduMap.addOverlay(marker); // 将标注添加到地图中
		baiduMap.setCenter(point);
		baiduMap.removeEventListener("tilesloaded", add);
	}
	baiduMap.addEventListener("tilesloaded", add);
}

function showDetail(escap) {
	var row = unescape(escap);
	row = JSON.parse(row);
	$('#name').val(row.name);
	$('#configId').val(row.id);
	$('#memo').val(row.memo);
	$('#dtuSn').val(row.dtuSn);
	$('#ruleName').val(row.ruleName);
	$('#ruleId').val(row.ruleId);
	$('#imgUrl').val(row.imgUrl);
	if (row.isOpen == '1') {
		$('#isOpen1').prop('checked', true);
	} else {
		$('#isOpen0').prop('checked', true);
	}
	$('#location').val(row.location);
	$('#longitude').val(row.longitude);
	$('#latitude').val(row.latitude);
	$("#equipImg").attr('src', row.imgUrl);
	$("#imgUrl").val(row.imgUrl);
	$('#dtuImg').show();
}