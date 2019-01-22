$(function() {

	$('#size').change(function() {
		var option;
		console.log($(this).val());
		if ($(this).val() != '') {
			$('#pageWidth').val($(this).val().split('*')[0]);
			$('#pageHeight').val($(this).val().split('*')[1]);
			$('#pageWidth').attr('disabled', 'disabled');
			$('#pageHeight').attr('disabled', 'disabled');
		} else {
			$('#pageWidth').removeAttr("disabled");
			$('#pageHeight').removeAttr("disabled");
		}
	});

	$('[id=btn_newtopo]').click(function() {
		$('#topoId').val('');
		$('#title').val('');
		$('#size').val('1366*768');
		$('#size').change();
		$('#topoModifyLabel').text('新增组态界面');
		$('#topoModifyModal').modal('show');
		$('#topoModifyModal').modal({
			keyboard : false,
		})
	});

	$('#btn_savtopo').click(function() {
		if (!topoValid.form()) {
			return;
		}
		var data = {};
		data.id = $('#topoId').val();
		data.title = $('#title').val();
		data.size = $('#size').val();
		data.pageWidth = $('#pageWidth').val();
		data.pageHeight = $('#pageHeight').val();
		data.masterId = $('#masterId').val();
		data.disOrder = $('#disOrder').val();
		data.orgId = orgId;
		data.userId = userId;

		$.ajax({
			url : 'savTopoDesign',
			type : 'POST',
			data : data,
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#topoTable').bootstrapTable('refresh');
					$('#topoId').val(ret.data.id);
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

	$('#btn_deltopo').click(function() {
		var ids = '';
		$.each($('#topoTable').bootstrapTable('getSelections'), function(i, item) {
			if (i == 0) {
				ids += item.id;
			} else {
				ids += ',' + item.id;
			}
		});
		$.ajax({
			url : 'delTopoDesign',
			type : 'POST',
			data : {
				'ids' : ids
			},
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#topoTable').bootstrapTable('refresh');
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


	var topoValid = validateTopoForm();
	function validateTopoForm() {
		var valid = $('#topoForm').validate({
			rules : {
				'title' : {
					required : true,
					minlength : 2,
					maxlength : 20
				}
			},
			messages : {
				'title' : {
					required : '请输入标题名称',
					maxlength : '标题不能超过{0}个字符',
					minlength : '标题不能少于{0}个字符'
				}
			}
		});
		return valid;
	}
});


function initTopoTable(masterId) {
	$('#topoTable').bootstrapTable('destroy');
	$('#topoTable').bootstrapTable({
		url : 'getTopoDesignPage', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		pagination : true, //开启分页
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 50, 100, 1000 ], //可选的每页数据
		search : true,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(ret) {
			return ret;
		},
		queryParams : function(params) {
			return {
				limit : params.limit,
				offset : params.offset,
				masterId : masterId
			}
		}, //请求服务器数据时的参数
		columns : [
			{
				checkbox : true,
				align : 'center',
				visible : true
			},
			{
				field : 'title',
				title : '标题',
				align : 'center',
				sortable : true
			},
			{
				field : 'isMain',
				title : '类型',
				align : 'center',
				sortable : true,
				formatter : isMainToStr
			},
			{
				field : 'size',
				title : '尺寸',
				width : '80',
				align : 'center',
				sortable : true
			},
			{
				field : 'operate',
				title : '操作',
				align : 'center',
				width : '120',
				formatter : topoOperate
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}
function isMainToStr(type) {
	if (type) {
		return '主页面';
	} else {
		return '子页面';
	}
}
function topoOperate(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;" data-toggle="modal"   ',
		' onclick="editTopoDesign(\'' + escape(JSON.stringify(row)) + '\')">修改</button>',
		'<a class="btn btn-success  btn-sm" target="_blank" href="topoDesign?id=' + row.id + '">设计</a>'
	].join('');
}

function editTopoDesign(row) {
	var rowData = unescape(row);
	rowData = JSON.parse(rowData);
	$('#topoModifyLabel').text('修改界面 :' + rowData.title + ' 定义');
	$('#title').val(rowData.title);
	$('#size').val(rowData.size);
	$('#pageWidth').val(rowData.pageWidth);
	$('#pageHeight').val(rowData.pageHeight);
	$('#disOrder').val(rowData.disOrder);
	$('#topoModifyModal').modal('show');
	$('#topoModifyModal').modal({
		keyboard : false,
	})
}
