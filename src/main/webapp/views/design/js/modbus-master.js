$(function() {
	initMasterTable();

	$('#btn_newmaster').click(function() {
		$('#id').val('');
		$('#name').val('');
		$('#description').val('');
		$('#displayType0').prop('checked', true);
		$('#powWrite0').prop('checked', true);
		$('#detailMasterLabel').text('新增元数据定义');
		$('#detailMasterModal').modal('show');
		$('#detailMasterModal').modal({
			keyboard : false,
		})
	});
	
	$('#btn_savmaster').click(function() {
		var data = {};
		data.id = $('#id').val();
		data.name = $('#name').val();
		data.description = $('#description').val();
		data.orgId = orgId;
		data.userId = userId;
		if ($('#powWrite1').prop('checked') == true) {
			data.powWrite = 1;
		}else{
			data.powWrite = 0;
		}
		if ($('#displayType1').prop('checked') == true) {
			data.displayType = 1;
		}else{
			data.displayType = 0;
		}
		$.ajax({
			url : 'savMaster',
			type : 'POST',
			data : data,
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#tableData').bootstrapTable('refresh');
					$('#id').val(ret.data.id);
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
	
	$('#btn_delmaster').click(function() {
		var ids = '';
		$.each($('#tableData').bootstrapTable('getSelections'), function(i, item) {
			if (i == 0) {
				ids += item.id;
			} else {
				ids += ',' + item.id;
			}
		});
		$.ajax({
			url : 'delMaster',
			type : 'POST',
			data : {
				'ids' : ids
			},
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#tableData').bootstrapTable('refresh');
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
});

//初始化设备信息	
function initMasterTable() {
	//bootstrap-Table获取数据
	$('#tableData').bootstrapTable({
		url : 'getMasterPage', //服务器数据的加载地址
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
				orgId :orgId,
				userId:userId
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
				halign:'center',
				align : 'left'
			},
			{
				field : 'description',
				title : '描述',
				halign:'center',
				align : 'left'
			},
			{
				field : 'powWrite',
				title : '控制权限',
				width : '80',
				align : 'center',
				sortable : true,
				formatter : powWriteToStr
			},
			{
				field : 'displayType',
				title : '数据展示',
				width : '80',
				align : 'center',
				sortable : true,
				formatter : displayTypeToStr
			},
			{
				field : 'operate',
				title : '操作',
				align : 'center',
				width : '250',
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

function displayTypeToStr(value, row, index) {
	if (value == '1') {
		return '组态展示';
	} else {
		return '列表展示';
	}
}

function powWriteToStr(value, row, index) {
	if (value == '1') {
		return '是';
	} else {
		return '否';
	}
}

function operateFormatter(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;" ',
		' onclick="editmaster(\'' + escape(JSON.stringify(row)) + '\')">修改</button>',
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;" data-toggle="modal" data-target="#mbMdTableModal"',
		' onclick="openMbMdTable(\'' + escape(JSON.stringify(row)) + '\')">元数据定义</button>',
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;" data-toggle="modal" data-target="#topoTableModal"',
		' onclick="openTopoTable(\'' + escape(JSON.stringify(row)) + '\')">组态设计</button>',
	].join('');

}

function editmaster(row) {
	var rowData = unescape(row);
	rowData = JSON.parse(rowData);
	$('#id').val(rowData.id);
	$('#name').val(rowData.name);
	$('#description').val(rowData.description);
	if (rowData.displayType == '1') {
		$('#displayType1').prop('checked', true);
	} else {
		$('#displayType0').prop('checked', true);
	}
	if (rowData.powWrite == '1') {
		$('#powWrite1').prop('checked', true);
	} else {
		$('#powWrite0').prop('checked', true);
	}

	$('#detailMasterLabel').text('新增规则定义');
	$('#detailMasterModal').modal('show');
	$('#detailMasterModal').modal({
		keyboard : false,
	})
}


function openMbMdTable(row) {
	var rowData = unescape(row);
	rowData = JSON.parse(rowData);
	$('#mbMdTableLabel').text('规则:' + rowData.name + ' 元数据浏览');
	$('#masterId').val(rowData.id);
	initMbMdTable(rowData.id);
}


function openTopoTable(row){
	var rowData = unescape(row);
	rowData = JSON.parse(rowData);
	$('#topoTableLabel').text('规则:' + rowData.name + ' 组态界面浏览');
	$('#masterId').val(rowData.id);
	initTopoTable(rowData.id);
}

