//gis变量
var marker;

$(function() {
	initTable();
	$('.form_datetime').datetimepicker({
		language : 'cn',
		minView : "month", //选择日期后，不会再跳转去选择时分秒 
		format : 'yyyy-mm-dd',
		weekStart : 1,
		todayBtn : true,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		forceParse : 0,
		showMeridian : 1
	});

	$('#orgForm').validate({
		rules : {
			'name' : {
				required : true,
				minlength : 2,
				maxlength : 20
			},
			'address' : {
				required : true,
				minlength : 5,
				maxlength : 200
			},
			'legalName' : {
				required : false,
				maxlength : 10
			}
		},
		messages : {
			'name' : {
				required : '请输入组织机构名称',
				maxlength : '组织机构名称不能超过{0}个字符',
				minlength : '组织机构名称不能少于{0}个字符'
			},
			'address' : {
				required : '请输入地址信息',
				maxlength : '地址信息不能超过{0}个字符',
				minlength : '地址信息不能少于{0}个字符'
			},
			'legalName' : {
				maxlength : '法人名称不能超过{0}个字符'
			}
		}
	});

	$('#btn_new').click(function() {
		newOrg();
	});

	$('#btn_sav').click(function() {
		if (!$('#orgForm').valid()) {
			return;
		}
		savOrg();
	});

	$('#btn_del').click(function() {
		delOrg();
	});

	$('#btn_openGis').click(function() {
		$('#gisModal').modal('show');
		$('#gislModalLabel').text("设备：" + $('#name').val() + "地理位置");
	});
	
	$('#gisModal').on('shown.bs.modal', function() {
		openGis();
	});
	
	$("#btn_selGisPoint").click(function() {
		selGisPoint();
	});
});

function initTable() {
	$('#orgTable').bootstrapTable({
		url : 'selOrgByPage', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		showRefresh : true, //刷新按钮
		pagination : true, //开启分页
		sidePagination : 'server', //服务器端分页
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 20, 50, 100 ], //可选的每页数据
		search : true,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(res) {
			return res;
		},
		queryParams : function(params) {
			return {
				limit : params.limit,
				offset : params.offset
			}
		}, //请求服务器数据时的参数
		columns : [
			{
				checkbox : true,
				align : 'center',
				visible : true
			},
			{
				field : 'name',
				title : '企业名称',
				width : '200',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'legalName',
				title : '企业法人',
				width : '100',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'address',
				title : '所在地',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'creditId',
				title : '信用代码',
				width : '200',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'businessScope',
				title : '业务范围',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'operate',
				title : '修改信息',
				align : 'center',
				width : '160',
				formatter : operateFormatter
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}

function operateFormatter(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;"  data-toggle="modal" data-target="#orgModal"',
		' onclick="editOrg(\'' + escape(JSON.stringify(row)) + '\')">编辑</button>'
	].join('');
}

function editOrg(escap) {
	$("#orgForm").validate().resetForm();
	var row = unescape(escap);
	row = JSON.parse(row);
	$('#orgId').val(row.orgId);
	$('#name').val(row.name);
	$('#longitude').val(row.longitude);
	$('#latitude').val(row.latitude);
	$('#address').val(row.address);
	$('#legalName').val(row.legalName);
	$('#creditId').val(row.creditId);
	$('#businessScope').val(row.businessScope);
	$('#appId').val(row.appId);

	var timestamp = new Date(row.foundDate);
	var beijing_datetime = timestamp.toLocaleDateString().replace(/\//g, "-");
	$('#foundDate').val(beijing_datetime);
}

var marker;

function openGis() {
	var longitude,
		latitude;
	if ($('#longitude').val() == '') {
		longitude = '116.413036';
		latitude = '39.896559';
	} else {
		longitude = $('#longitude').val();
		latitude = $('#latitude').val();
	}

	// 百度地图API功能
	var baiduMap = new BMap.Map("baiduMap");
	var point = new BMap.Point(longitude, latitude);

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
	baiduMap.addEventListener("dblclick", baiduMapDBClick);
	function baiduMapDBClick(e) {
		// 创建标注
		var point = new BMap.Point(e.point.lng, e.point.lat);
		var myIcon = new BMap.Icon("../static/bootstrap-solid.svg", new BMap.Size(20, 20));
		marker = new BMap.Marker(point, {
			icon : myIcon
		});
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, function(rs) {
			$('#address').val(rs.address);
		});
		baiduMap.clearOverlays(); //清除地图上所有覆盖物
		baiduMap.addOverlay(marker); // 将标注添加到地图中  
	}

	var ac = new BMap.Autocomplete( //建立一个自动完成的对象
		{
			"input" : "suggestId",
			"location" : baiduMap
		});
	var myValue;
	ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
		setPlace(baiduMap);
	});

	function setPlace(baiduMap) {
		baiduMap.clearOverlays(); //清除地图上所有覆盖物
		function myFun() {
			var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
			baiduMap.centerAndZoom(pp, 18);
			baiduMap.addOverlay(new BMap.Marker(pp)); //添加标注
		}
		var local = new BMap.LocalSearch(baiduMap, { //智能搜索
			onSearchComplete : myFun
		});
		local.search(myValue);
	}
}

function selGisPoint() {
	var point = marker.getPosition();
	$('#longitude').val(point.lng);
	$('#latitude').val(point.lat);
	var geoc = new BMap.Geocoder();
	geoc.getLocation(point, function(rs) {
		var addComp = rs.addressComponents;
		$('#address').val(rs.address);
	});
	$('#gisModal').modal('hide');
}

function newOrg() {
	$("#orgForm").validate().resetForm();
	$('#orgId').val('');
	$('#name').val('');
	$('#longitude').val('');
	$('#latitude').val('');
	$('#address').val('');
	$('#legalName').val('');
	$('#creditId').val('');
	$('#businessScope').val('');
	$('#appId').val('');
	$('#orgModal').modal('show');
	$('#orgModal').modal({
		keyboard : false
	});
}


function delOrg() {
	var ids = '';
	$.each($('#orgTable').bootstrapTable('getSelections'), function(i, item) {
		if (i == 0) {
			ids += item.orgId;
		} else {
			ids += ',' + item.orgId;
		}
	});
	$.ajax({
		url : 'delOrg',
		type : 'POST',
		data : {
			'ids' : ids
		},
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#orgTable').bootstrapTable('refresh');
			} else {
				alert('信息删除失败！');
			}
		},
		error : function(xhr) {
			console.log(JSON.stringify(xhr));
			alert('信息删除失败！');
		}
	});
}

function savOrg() {
	var data = {};
	data.orgId = $('#orgId').val();
	data.name = $('#name').val();
	data.longitude = $('#longitude').val();
	data.latitude = $('#latitude').val();
	data.address = $('#address').val();
	data.legalName = $('#legalName').val();
	data.creditId = $('#creditId').val();
	data.businessScope = $('#businessScope').val();
	data.appId = $('#appId').val();
	data.foundDate = $('#foundDate').val();

	$.ajax({
		url : 'savOrg',
		type : 'POST',
		data : data,
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#orgTable').bootstrapTable('refresh');
				$('#orgId').val(ret.data.orgId);
				$('#appId').val(ret.data.appId);
				$('#orgModal').modal('hide');
			} else {
				alert('信息保存失败！');
			}
		},
		error : function(xhr) {
			console.log(JSON.stringify(xhr));
			alert('信息保存失败！');
		}
	});
}