
$(function() {
	initTable();

});
function initTable() {
	$('#userDtuListTable').bootstrapTable({
		url : 'getConfigPage', //服务器数据的加载地址
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
				title : '名称',
				width : '200',
				sortable : true,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'memo',
				title : '描述',
				halign : 'center',
				align : 'left'
			},
			{
				field : 'location',
				title : '所在地',
				width : '300',
				halign : 'center',
				align : 'left'
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
				field : 'ruleName',
				title : '数据规则',
				width : '120',
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

function imgFromUrl(value, row, index) {
	var inHtml = [ '<a  target="_blank" href="topoShow?dtuId=' + row.id + '">',
		'<img  src="' + value + '"  style="padding:1px;background:#ACF1FD;border:solid #ACF1FD 1px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px; max-width: 100%" >',
		'</a>'
	].join('');
	return inHtml;
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
		'<a class="btn btn-success  btn-sm" target="_blank" href="topoShow?dtuId=' + row.id + '">实时数据</a>'
	].join('');
}