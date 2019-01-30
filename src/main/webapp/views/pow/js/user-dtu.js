
var selUser = [];

$(function() {
	initTable();

	initAllDtuTable();

	$('#btn_del').click(function() {
		delUserDtuAll();
	});

	$('#btn_addDtu').click(function() {
		addUserDtu();
	});

	$('#btn_delDtu').click(function() {
		delUserDtu();
	});

});

function initUserDtuTable(username) {
	$('#userDtuTable').bootstrapTable({
		url : 'selUserDtu', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		showRefresh : false, //刷新按钮
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 20, 50, 100 ], //可选的每页数据
		search : false,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(res) {
			return res;
		},
		queryParams : function(params) {
			return {
				username : username
			}
		}, //请求服务器数据时的参数
		columns : [
			{
				checkbox : true,
				align : 'center',
				visible : true
			},
			{
				field : 'configName',
				title : '设备名称',
				width : '100',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'dtuSn',
				title : 'SN',
				width : '100',
				halign : 'center',
				align : 'left'
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}


function initAllDtuTable() {
	$('#allDtuTable').bootstrapTable({
		url : 'selAllDtuByOwner', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		showRefresh : false, //刷新按钮
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 20, 50, 100 ], //可选的每页数据
		search : false,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(res) {
			return res;
		},
		columns : [
			{
				checkbox : true,
				align : 'center',
				visible : true
			},
			{
				field : 'name',
				title : '设备名称',
				width : '100',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'dtuSn',
				title : 'SN',
				width : '100',
				halign : 'center',
				align : 'left'
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}


function initTable() {
	$('#userTable').bootstrapTable({
		url : 'selUserByPage', //服务器数据的加载地址
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
				field : 'username',
				title : '账号',
				width : '100',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'realname',
				title : '姓名',
				width : '100',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'tel',
				title : '电话',
				width : '100',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'mail',
				title : '邮箱',
				width : '160',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'company',
				title : '公司',
				width : '200',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'job',
				title : '职务',
				width : '120',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'operate',
				title : '操作',
				align : 'center',
				width : '60',
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
		'<button type="button" class="btn btn-success  btn-sm"  ',
		'style="margin-right:5px;"  data-toggle="modal" data-target="#userDtuModal"',
		' onclick="editUserDtu(\'' + escape(JSON.stringify(row)) + '\')">设备授权</button>'
	].join('');
}

function editUserDtu(escap) {
	var row = unescape(escap);
	selUser = JSON.parse(row);
	$("#userDtuTable").bootstrapTable('destroy');
	initUserDtuTable(selUser.username);
	$('#allDtuTable').bootstrapTable('uncheckAll');
}

function delUserDtuAll() {
	var ids = '';
	$.each($('#useTable').bootstrapTable('getSelections'), function(i, item) {
		if (i == 0) {
			ids += item.username;
		} else {
			ids += ',' + item.username;
		}
	});
	$.ajax({
		url : 'delUserDtuAll',
		type : 'POST',
		data : {
			'ids' : ids
		},
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#useTable').bootstrapTable('refresh');
				$('#allDtuTable').bootstrapTable('refresh');
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

function addUserDtu() {
	var ids = '';
	$.each($('#allDtuTable').bootstrapTable('getSelections'), function(i, item) {
		if (i == 0) {
			ids += item.id;
		} else {
			ids += ',' + item.id;
		}
	});

	$.ajax({
		url : 'addUserDtu',
		type : 'POST',
		data : {
			'ids' : ids,
			'username' : selUser.username,
			'realname' : selUser.realname
		},
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#userDtuTable').bootstrapTable('refresh');
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

function delUserDtu() {
	var ids = '';
	$.each($('#userDtuTable').bootstrapTable('getSelections'), function(i, item) {
		if (i == 0) {
			ids += item.configId;
		} else {
			ids += ',' + item.configId;
		}
	});

	$.ajax({
		url : 'delUserDtu',
		type : 'POST',
		data : {
			'ids' : ids,
			'username' : selUser.username
		},
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#userDtuTable').bootstrapTable('refresh');
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