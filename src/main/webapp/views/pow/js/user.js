var isnew = false;

$(function() {
	initTable();
	selectOrgAll();

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

	$('#companySel').change(function() {
		$('#orgId').val($(this).val());
		$('#company').val($("#companySel option:selected").text());
	});
	
	jQuery.validator.addMethod("isPhone", function(value, element) {
		var length = value.length;
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		return this.optional(element) || (length == 11 && mobile.test(value));
	}, "请填写正确的手机号码"); 

	$('#userForm').validate({
		rules : {
			'realname' : {
				required : true,
				minlength : 2,
				maxlength : 10
			},
			'password' : {
				required : true,
				minlength : 2,
				maxlength : 10
			},
			'address' : {
				required : true,
				minlength : 5,
				maxlength : 200
			},
			'job' : {
				required : false,
				maxlength : 20
			},
			'tel' : {
				required : false,
				isPhone:true
			},
			'mail' : {
				required : false,
				email : true,
			},
			'username' : {
				required : true,
				onkeyup : false,
				minlength : 2,
				maxlength : 20,
				remote : {
					url : "validUsername",
					type : "POST",
					dataType : "json",
					data : {
						'username' : function() {
							return $("#username").val();
						},
						'isnew' : function() {
							return isnew;
						}
					}
				}
			}
		},
		messages : {
			'realname' : {
				required : '请输入真实姓名',
				maxlength : '姓名长度不能超过{0}个字符',
				minlength : '姓名长度不能少于{0}个字符'
			},
			'password' : {
				required : '请输入密码',
				maxlength : '密码长度不能超过{0}个字符',
				minlength : '密码长度不能少于{0}个字符'
			},
			'address' : {
				required : '请输入用户所在地',
				maxlength : '所在地长度不能超过{0}个字符',
				minlength : '所在地长度不能少于{0}个字符'
			},
			'job' : {
				maxlength : '职务名称不能超过{0}个字符'
			},
			'username' : {
				required : "请填写账户ID",
				minlength : "账户最小长度{0}位",
				maxlength : "账户最大长度{0}位",
				remote : "您输入的账户已经存在"
			},
			'mail' : {
				email : '请输入正确的邮件地址'
			},
			'tel' : {
				email : '请输入正确的电话号码'
			}
		}
	});

	$('#btn_new').click(function() {
		isnew = true;
		newUser();
	});

	$('#btn_sav').click(function() {
		if (!$('#userForm').valid()) {
			return;
		}
		savUser();
	});

	$('#btn_del').click(function() {
		delUser();
	});
});

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
				field : 'address',
				title : '住址',
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
				field : 'createtime',
				title : '注册时间',
				width : '100',
				halign : 'center',
				align : 'left',
				formatter : formatterCT
			},
			{
				field : 'operate',
				title : '编辑',
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

function formatterSex(value, row, index) {
	if (value == '1') {
		return '男';
	} else {
		return '女';
	}
}

function formatterCT(value, row, index) {
	var timestamp = new Date(value);
	var date = timestamp.toLocaleDateString().replace(/\//g, "-") ;
	return date;
}

function operateFormatter(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm"  ',
		'style="margin-right:5px;"  data-toggle="modal" data-target="#userModal"',
		' onclick="editUser(\'' + escape(JSON.stringify(row)) + '\')">编辑</button>'
	].join('');
}



function editUser(escap) {
	$("#userForm").validate().resetForm();
	isnew = false;
	var row = unescape(escap);
	row = JSON.parse(row);

	$('#appId').val(row.appId);
	$('#username').val(row.username);
	$("#username").attr("disabled", true);
	$('#password').val(row.password);
	$('#realname').val(row.realname);
	$('#nickname').val(row.nickname);
	$('#sex').val(row.sex);
	$('#address').val(row.address);
	$('#company').val(row.company);
	$('#orgId').val(row.orgId);
	$('#companySel').val(row.orgId);
	$('#tel').val(row.tel);
	$('#mail').val(row.mail);
	
	var timestamp = new Date(row.birthday);
	var birthday = timestamp.toLocaleDateString().replace(/\//g, "-");
	$('#birthday').val(birthday);
	
	$('#orgId').val(row.orgId);
	$('#job').val(row.job);
	$('#status').val(row.status);

}

function newUser() {
	$("#userForm").validate().resetForm();
	$('#appId').val('');
	$('#username').val('');
	$("#username").attr("disabled", false);
	$('#password').val('');
	$('#realname').val('');
	$('#nickname').val('');
	$('#sex').val('');
	$('#address').val('');
	$('#company').val('');
	$('#orgId').val('');
	$('#job').val('');
	$('#status').val('');

	$('#userModal').modal('show');
	$('#userModal').modal({
		keyboard : false
	});
}


function delUser() {
	var ids = '';
	$.each($('#userTable').bootstrapTable('getSelections'), function(i, item) {
		if (i == 0) {
			ids += item.username;
		} else {
			ids += ',' + item.username;
		}
	});
	$.ajax({
		url : 'delUser',
		type : 'POST',
		data : {
			'ids' : ids
		},
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#userTable').bootstrapTable('refresh');
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

function savUser() {
	var data = {};
	data.username = $('#username').val();
	data.password = $('#password').val();
	data.realname = $('#realname').val();
	data.nickname = $('#nickname').val();
	data.sex = $('#sex').val();
	data.address = $('#address').val();
	data.company = $('#company').val();
	data.orgId = $('#orgId').val();
	data.job = $('#job').val();
	data.tel = $('#tel').val();
	data.mail = $('#mail').val();
	data.birthday = $('#birthday').val();
	data.status = $('#status').val();
	data.appId = $('#appId').val();

	$.ajax({
		url : 'savUser',
		type : 'POST',
		data : data,
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				$('#userTable').bootstrapTable('refresh');
				$('#username').val(ret.data.username);
				$('#userModal').modal('hide');
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

function selectOrgAll() {
	$.ajax({
		url : 'selectOrgAll',
		type : 'POST',
		dataType : 'json',
		success : function(ret) {
			if (ret.code == 0) {
				var data = ret.data;
				var option;
				$('#companySel').empty();
				for (var i = 0; i < data.length; i++) {
					option = $('<option>').val(data[i].orgId).text(data[i].name);
					$('#companySel').append(option);
				}
			} else {
				alert('获取数据失败！');
			}
		},
		error : function(xhr) {
			console.log(JSON.stringify(xhr));
			alert('获取数据失败！');
		}
	});
}