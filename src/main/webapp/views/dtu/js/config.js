//gis变量
var marker;

$(function() {
	initConfigTable();

	$('#btn_newconfig').click(function() {
		$('#configId').val('');
		$('#name').val('');
		$('#memo').val('');
		$('#dtuSn').val('');
		$('#ruleName').val('');
		$('#ruleId').val('');
		$('#isOpen0').prop('checked', true);
		$('#location').val('');
		$('#longitude').val('119.87347');
		$('#latitude').val('31.98422');
		$('#dtuImg').hide();
		$('#configModal').modal('show');
		$('#configModal').modal({
			keyboard : false,
		})
	});

	$('#btn_delconfig').click(function() {
		var ids = '';
		$.each($('#configTable').bootstrapTable('getSelections'), function(i, item) {
			if (i == 0) {
				ids += item.id;
			} else {
				ids += ',' + item.id;
			}
		});
		$.ajax({
			url : 'delConfig',
			type : 'POST',
			data : {
				'ids' : ids
			},
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#configTable').bootstrapTable('refresh');
				} else {
					alert('信息删除失败！');
				}
			},
			error : function(xhr) {
				console.log(JSON.stringify(xhr));
				alert('信息删除失败！');
			}
		});
	});

	$('#btn_uploadImg').click(function() {
		uploadFile('fileSelect', '?userId=' + userId);
	});

	$('#btn_openRule').click(function() {
		initRuleTable();
		$('#ruleTableModal').modal('show');
		$('#ruleTableModal').modal({
			keyboard : false,
		})
	});

	$('#btn_selRule').click(function() {
		var row = $('#ruleTable').bootstrapTable('getSelections')[0];
		//		console.log(row.name);
		$('#ruleName').val(row.name);
		$('#ruleId').val(row.id);
		$('#ruleTableModal').modal('hide');
	});

	$('#btn_selectGis').click(function() {
		var longitude,
			latitude;
		if ($('#longitude').val() == '') {
			longitude = '116.413036';
			latitude = '39.896559';
		} else {
			longitude = $('#longitude').val();
			;
			latitude = $('#latitude').val();
		}

		$('#gisModal').modal('show');
		$('#gislModalLabel').text("设备：" + $('#name').val() + "地理位置");
		// 百度地图API功能
		var baiduMap = new BMap.Map("baiduMap");
		var point = new BMap.Point(longitude, latitude);
		baiduMap.centerAndZoom(point, 14);
		baiduMap.enableScrollWheelZoom();
		baiduMap.disableDoubleClickZoom();
		baiduMap.addEventListener("tilesloaded", function() {
			baiduMap.setCenter(point);
		});

		baiduMap.addEventListener("dblclick", baiduMapDBClick);
		function baiduMapDBClick(e) {
			// 创建标注
			var point = new BMap.Point(e.point.lng, e.point.lat);
			var myIcon = new BMap.Icon("../static/bootstrap-solid.svg", new BMap.Size(20, 20));
			marker = new BMap.Marker(point, {
				icon : myIcon
			});
			baiduMap.clearOverlays(); //清除地图上所有覆盖物
			baiduMap.addOverlay(marker); // 将标注添加到地图中  
		}
		// 创建标注
		var myIcon = new BMap.Icon("../static/bootstrap-solid.svg", new BMap.Size(38, 38));
		marker = new BMap.Marker(point, {
			icon : myIcon
		});
		baiduMap.addOverlay(marker); // 将标注添加到地图中
		baiduMap.setCenter(point);

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
	});

	$("#btn_selpoint").click(function() {
		var point = marker.getPosition();
		//		console.log(JSON.stringify(point));
		$('#longitude').val(point.lng);
		$('#latitude').val(point.lat);
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			$('#location').val(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
		});
		$('#gisModal').modal('hide');
	})

	$('#btn_savconfig').click(function() {
		if (!valid.form()) {
			return;
		}
		var data = {};
		data.id = $('#configId').val();
		data.imgUrl = $('#imgUrl').val();
		data.name = $('#name').val();
		data.memo = $('#memo').val();
		data.pageHeight = $('#pageHeight').val();
		data.dtuSn = $('#dtuSn').val();
		data.ruleName = $('#ruleName').val();
		if ($('#isOpen1').prop('checked') == true) {
			data.isOpen = 1;
		} else {
			data.isOpen = 0;
		}
		data.ruleId = $('#ruleId').val();
		data.isOpen = $('#isOpen').val();
		data.dataCount = $('#dataCount').val();
		data.saveCycle = $('#saveCycle').val();
		data.longitude = $('#longitude').val();
		data.latitude = $('#latitude').val();
		data.location = $('#location').val();
		data.userId = userId;

		$.ajax({
			url : 'savConfig',
			type : 'POST',
			data : data,
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#configTable').bootstrapTable('refresh');
					$('#configId').val(ret.data.id);
				} else {
					alert('信息保存失败！');
				}
			},
			error : function(xhr) {
				console.log(JSON.stringify(xhr));
				alert('信息保存失败！');
			}
		});
	});

	var valid = validateForm();
	function validateForm() {
		var valid = $('#configForm').validate({
			rules : {
				'name' : {
					required : true,
					minlength : 2,
					maxlength : 20
				},
				'location' : {
					required : true,
					minlength : 5,
					maxlength : 200
				},
				'memo' : {
					required : false,
					maxlength : 250
				},
				'dtuSn':{
			   		required: true,
			   		onkeyup:false,
			    	minlength: 8,
			    	maxlength: 8,
			   		remote: {
		 			    url: "validSn",
		 			    type: "POST",
		 			    dataType: "json",
		 			    data: {
		 			       'dtuSn':function(){return $("#dtuSn").val()},
		 			       'configId':function(){return $("#configId").val()}
		 			    }
		 			}
			   	},
				'password':{
			   		required: true,
			   		onkeyup:false,
			    	minlength: 6,
			    	maxlength: 6,
			   		remote: {
		 			    url: "validPw",
		 			    type: "POST",
		 			    dataType: "json",
		 			    data: {
		 			       'dtuSn':function(){return $("#dtuSn").val()},
		 			       'password':function(){return $("#password").val()}
		 			    }
		 			}
			   	}
			},
			messages : {
				'name' : {
					required : '请输入数据名称',
					maxlength : '数据名称不能超过{0}个字符',
					minlength : '数据名称不能少于{0}个字符'
				},
				'location' : {
					required : '请输入数据名称',
					maxlength : '数据名称不能超过{0}个字符',
					minlength : '数据名称不能少于{0}个字符'
				},
				'memo' : {
					maxlength : '数据名称不能超过{0}个字符'
				},
				'dtuSn':{
			   		required: "请填写sn码",
			    	minlength: "只能输入8位sn码",
			    	maxlength: "只能输入8位sn码",
			   		remote:"sn码不存在或已被使用"
			   	},
				'password':{
			   		required: "请填写密码",
			    	minlength: "密码长度6位",
			    	maxlength: "密码长度6位",
			   		remote:"密码错误"
			   	}
			}
		});
		return valid;
	}

});

function initConfigTable() {
	$('#configTable').bootstrapTable({
		url : 'getConfigPage', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		pagination : true, //开启分页
		//sidePagination : 'server', //服务器端分页
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 50, 100, 1000 ], //可选的每页数据
		search : true,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(res) {
			// 在ajax获取到数据，渲染表格之前，修改数据源
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
				checkbox : true,
				align : 'center',
				visible : true
			},
			{
				field : 'name',
				title : '名称',
				width : '200',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'userId',
				title : '所属用户',
				width : '80',
				align : 'center'
			},
			{
				field : 'memo',
				title : '描述',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'dtuSn',
				title : '模块sn码',
				width : '60',
				align : 'center'
			},
			{
				field : 'isOnline',
				title : '在线',
				width : '40',
				formatter : isOnlineToStr,
				halign : 'center',
				align : 'center'
			},
			{
				field : 'location',
				title : '所在地',
				width : '300',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'ruleName',
				title : '数据规则',
				width : '120',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'dataCount',
				title : '存储数据量',
				align : 'center',
				visible : false
			},
			{
				field : 'saveCycle',
				title : '存储间隔',
				align : 'center',
				visible : false
			},
			{
				field : 'operate',
				title : '操作',
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
function isOnlineToStr(value, row, index) {
	if (value) {
		return '是';
	} else {
		return '否';
	}
}
function operateFormatter(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;"  data-toggle="modal" data-target="#configModal"',
		' onclick="editConfig(\'' + escape(JSON.stringify(row)) + '\')">编辑</button>',
		'<button type="button" class="btn btn-success  btn-sm"',
		'style="margin-right:5px;" data-toggle="modal" data-target="#mbMdTableModal"',
		' onclick="remoteConfig(\'' + escape(JSON.stringify(row)) + '\')">远程配置</button>'
	].join('');
}

function initRuleTable() {
	$('#ruleTable').bootstrapTable({
		url : '../design/getMasterPage', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		pagination : true, //开启分页
		//sidePagination : 'server', //服务器端分页
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 50, 100, 1000 ], //可选的每页数据
		search : true,
		searchAlign : 'left',
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(res) {
			return res;
		},
		queryParams : function(params) {
			return {
				limit : params.limit,
				offset : params.offset,
				orgId : orgId,
				userId : userId
			}
		}, //请求服务器数据时的参数
		columns : [
			{
				radio : true,
				align : 'center',
				visible : true
			},
			{
				field : 'name',
				title : '名称',
				width : '200',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'description',
				title : '描述',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'displayType',
				title : '数据展示',
				width : '80',
				align : 'center',
				formatter : displayTypeToStr
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}

function displayTypeToStr(value, row, index) {
	if (value == '1') {
		return '组态展示';
	} else {
		return '列表展示';
	}
}

function editConfig(escap) {
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

function uploadFile(fileId, arg) {
	var fileObj = document.getElementById(fileId).files[0];
	var FileController = "uploadFile" + arg;

	var form = new FormData();
	form.append("file", fileObj);

	var xhr = new XMLHttpRequest();
	xhr.open("post", FileController, true);
	xhr.onload = function(data) {};
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var response = xhr.responseText;
				$('#imgUrl').val(response);
				$("#equipImg").attr('src', response);
				$('#dtuImg').show();
			}
		}
	};
	xhr.upload.addEventListener("progress", function(e) {
		if (e.lengthComputable) {
			console.log('progressBar:' + e.loaded / e.total * 100);
		}

	}, false);
	xhr.send(form);
}