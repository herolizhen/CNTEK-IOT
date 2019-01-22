
$(function() {
	initInfoTable();

	$('#btn_newinfo').click(function() {
		$('#infoId').val('');
		$('#dtuName').val('');
		$('#dtuSn').val('');
		$('#dtuPw').val('111111');
		$('#mac').val('');
		$('#moduleName').val('');
		$('#moduleType').val('1');
		$('#firmware').val('');
		$('#firmwareType').val('');
//		$('#isActivate0').prop('checked', true);
		$('#isRecovery0').prop('checked', true);
		$('#iotVersion').val('');
//		$('#activateTime').val('');
		$('#infoModal').modal('show');
		$('#infoModal').modal({
			keyboard : false,
		})
	});

	$('#btn_delinfo').click(function() {
		var ids = '';
		$.each($('#infoTable').bootstrapTable('getSelections'), function(i, item) {
			if (i == 0) {
				ids += item.id;
			} else {
				ids += ',' + item.id;
			}
		});
		$.ajax({
			url : 'delInfo',
			type : 'POST',
			data : {
				'ids' : ids
			},
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#infoTable').bootstrapTable('refresh');
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

	$('#btn_savinfo').click(function() {
//		if (!valid.form()) {
//			return;
//		}
		var data = {};
		data.id = $('#infoId').val();
		data.dtuName = $('#dtuName').val();
		data.dtuSn = $('#dtuSn').val();
		data.dtuPw = $('#dtuPw').val();
		data.mac = $('#mac').val();
		data.moduleName = $('#moduleName').val();
		data.moduleType = $('#moduleType').val();
		data.firmware = $('#firmware').val();
		data.firmwareType = $('#firmwareType').val();	
//		if ($('#isActivate1').prop('checked') == true) {
//			data.isActivate = 1;
//		} else {
//			data.isActivate = 0;
//		}
		if ($('#isRecovery1').prop('checked') == true) {
			data.isRecovery = 1;
		} else {
			data.isRecovery = 0;
		}
		data.iotVersion = $('#iotVersion').val();
//		data.regIp = $('#regIp').val();
		$.ajax({
			url : 'savInfo',
			type : 'POST',
			data : data,
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#infoTable').bootstrapTable('refresh');
					$('#infoId').val(ret.data.id);
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
		var valid = $('#infoForm').validate({
			rules : {
				'dtuName' : {
					required : true,
					minlength : 2,
					maxlength : 36
				},
				'dtuSn' : {
					required : true,
					minlength : 5,
					maxlength : 20
				},
				'dtuPw' : {
					required : true,
					maxlength : 20
				}
			},
			messages : {
				'dtuName' : {
					required : '请输入数据名称',
					maxlength : '数据名称不能超过{0}个字符',
					minlength : '数据名称不能少于{0}个字符'
				},
				'dtuSn' : {
					required : '请输入数据名称',
					maxlength : '数据名称不能超过{0}个字符',
					minlength : '数据名称不能少于{0}个字符'
				},
				'dtuPw' : {
					maxlength : '数据名称不能超过{0}个字符'
				}
			}
		});
		return valid;
	}
});

function initInfoTable() {
	$('#infoTable').bootstrapTable({
		url : 'getInfoPage', //服务器数据的加载地址
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
				field : 'dtuName',
				title : '设备名称',
				width : '200',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'dtuSn',
				title : 'SN号',
				width : '80',
				align : 'center'
			},
			{
				field : 'dtuPw',
				title : '密码',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'mac',
				title : 'MAC',
				width : '60',
				align : 'center'
			},
			{
				field : 'moduleName',
				title : '模块名称',
				width : '60',
				align : 'center'
			},
			{
				field : 'moduleType',
				title : '模块类型',
				width : '60',
				align : 'center',
				formatter:modelTypeToStr
			},
			{
				field : 'firmwareType',
				title : '固件类型',
				width : '60',
				align : 'center'
			},	
			{
				field : 'firmware',
				title : '固件名称',
				width : '60',
				align : 'center'
			},
			{
				field : 'iotVersion',
				title : 'IOT版本',
				width : '300',
				halign : 'center',
				align : 'left'
			},			
			{
				field : 'isActivate',
				title : '激活',
				width : '40',
				formatter : booleanToStr,
				halign : 'center',
				align : 'center'
			},
			{
				field : 'isRecovery',
				title : '复位',
				width : '40',
				formatter : booleanToStr,
				halign : 'center',
				align : 'center'
			},
			{
				field : 'activateTime',
				title : '激活时间',
				width : '480',
				halign : 'center',
				align : 'left',
				formatter:dateTimeToStr
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

function booleanToStr(value, row, index) {
	if (value) {
		return '是';
	} else {
		return '否';
	}
}

function modelTypeToStr(value, row, index) {
	if (value =='1') {
		return '2G';
	}else if(value =='2')  {
		return '3G';
	}else if(value =='3') {
		return '4G';
	}else if(value =='4'){
		return 'WIFI';
	}
}

function dateTimeToStr(unixtime) {
        var timestamp = new Date(unixtime);
        beijing_datetime = timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8);
        return beijing_datetime;
    };

function operateFormatter(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;"  data-toggle="modal" data-target="#infoModal"',
		' onclick="editInfo(\'' + escape(JSON.stringify(row)) + '\')">编辑</button>'
	].join('');
}

function editInfo(escap) {
	var row = unescape(escap);
	row = JSON.parse(row);
	$('#dtuName').val(row.dtuName);
	$('#infoId').val(row.id);
	$('#dtuSn').val(row.dtuSn);
	$('#dtuPw').val(row.dtuPw);
	$('#mac').val(row.mac);
	$('#moduleName').val(row.moduleName);
	$('#moduleType').val(row.moduleType);
	if (row.isActivate == '1') {
		$('#isActivate1').prop('checked', true);
	} else {
		$('#isActivate0').prop('checked', true);
	}
	if (row.isRecovery == '1') {
		$('#isRecovery1').prop('checked', true);
	} else {
		$('#isRecovery0').prop('checked', true);
	}
	$('#iotVersion').val(row.iotVersion);
	$('#activateTime').val(row.activateTime);
}
