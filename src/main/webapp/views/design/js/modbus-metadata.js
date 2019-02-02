$(function() {
	$('#funCode').change(function() {
		$('#d_dataBitPos').hide();
		if ($(this).val() == 1 || $(this).val() == 2) {
			$('#d_dataUnit').hide();
			$('#d_dataType').hide();
			$('#d_dataFun').hide();
			$('#d_dataDecode').hide();
			$('#d_data0Dis').show();
			$('#d_data1Dis').show();
		} else {
			$('#d_dataUnit').show();
			$('#d_dataType').show();
			$('#d_dataFun').show();
			$('#d_dataDecode').show();
			$('#d_data0Dis').hide();
			$('#d_data1Dis').hide();
		}
	});
		
	$('#dataType').change(function() {
		var option;
		if ($(this).val() == 1 || $(this).val() == 2 || $(this).val() == 6) {
			$('#dataDecode').empty();
			option = $('<option>').val(1).text('12');
			$('#dataDecode').append(option);
			option = $('<option>').val(2).text('21');
			$('#dataDecode').append(option);
		} else {
			$('#dataDecode').empty();
			option = $('<option>').val(1).text('1234');
			$('#dataDecode').append(option);
			option = $('<option>').val(2).text('2143');
			$('#dataDecode').append(option);
			option = $('<option>').val(3).text('3412');
			$('#dataDecode').append(option);
			option = $('<option>').val(4).text('4321');
			$('#dataDecode').append(option);
		}
		if ($(this).val() == 6) {
			$('#d_dataFun').hide();
			$('#d_dataUnit').hide();
			$('#d_dataBitPos').show();
			$('#d_data0Dis').show();
			$('#d_data1Dis').show();
		} else {
			$('#d_dataFun').show();
			$('#d_dataUnit').show();
			$('#d_dataBitPos').hide();
			$('#d_data0Dis').hide();
			$('#d_data1Dis').hide();
		}
	});
	
	$('[id=btn_newmbmd]').click(function() {
		$("#addOrUpdateMbmdForm").validate().resetForm();
		$('#metadataId').val('');
		//$('#gateNo').val('');
		//$('#funCode').val('3');
		$('#regAddress').val('');
		$('#dataName').val('');
		//$('#dataType').val(1);
		//$('#dataDecode').val(1);
		//$('#dataUnit').val('');
		$('#dataBitPos').val('');
		$('#data0Dis').val('');
		$('#data1Dis').val('');
		$('#dataFun').val('');
		
		$('#dataFun').change();
		$('#mbMdModifyLabel').text('新增元数据定义');
		$('#mbMdModifyModal').modal('show');
		$('#mbMdModifyModal').modal({
			keyboard : false,
		})
	});
		
	$('#btn_mbmdSave').click(function() {
		if(!mbmdValid.form()){
			return;
		}
		var data = {};
		data.id = $('#metadataId').val();
		data.gateNo = $('#gateNo').val();
		data.funCode = $('#funCode').val();
		data.regAddress = $('#regAddress').val();
		data.dataName = $('#dataName').val();
		data.dataType = $('#dataType').val();
		data.dataDecode = $('#dataDecode').val();
		data.dataUnit = $('#dataUnit').val();
		data.dataBitPos = $('#dataBitPos').val();
		data.data0Dis = $('#data0Dis').val();
		data.data1Dis = $('#data1Dis').val();
		data.dataFun = $('#dataFun').val();
		data.masterId = $('#masterId').val();
		data.disOrder = $('#disOrder').val();
		data.orgId = orgId;
		data.userId = userId;
		
		$.ajax({
			url : 'savMetadataDefine',
			type : 'POST',
			data : data,
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#mbMdTable').bootstrapTable('refresh');
					$('#metadataId').val(ret.data.id);
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
		
	$('#btn_delmbmd').click(function() {
		var ids = '';
		$.each($('#mbMdTable').bootstrapTable('getSelections'), function(i, item) {
			if (i == 0) {
				ids += item.id;
			} else {
				ids += ',' + item.id;
			}
		});
		$.ajax({
			url : 'delMetadataDefine',
			type : 'POST',
			data : {
				'ids' : ids
			},
			dataType : 'json',
			success : function(ret) {
				if (ret.code == 0) {
					$('#mbMdTable').bootstrapTable('refresh');
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
	
	var mbmdValid = validateMbmdForm();
	function validateMbmdForm(){
		Math.bitValue = Math.bitValue || function(x,offset,length) {
			return 0;
		};
		jQuery.validator.addMethod('formula',function(value,element){
			try{
			     eval('var X=10');
			     eval(value);
			     return true;
			}catch(exception) {
			     return false;
			}
		},'公式格式不正确！（注：公式请使用英文字符）');
				
		var valid = $('#addOrUpdateMbmdForm').validate({
		        rules: {
			 	   	'dataName': {
				    	required: true,
				    	minlength:2,
				    	maxlength: 20
				   	},
				   	'gateNo':{
				   		required: true,
				    	digits:true,
				    	range:[1,255]
				   	},
				   	'regAddress': {
				    	digits:true,
				    	range:[1,65535]
				   	},
				   	'dataBitPos': {
				    	digits:true,
				    	range:[1,16]
				   	},
				   	'dataUnit': {
				    	maxlength: 10
				   	},
				    'formula': {
				   		formula:true,
				   		maxlength: 50
			   		}
				},
		        messages: {
					'dataName': {
				    	required: '请输入数据名称',
				    	maxlength:'数据名称不能超过{0}个字符',
				    	minlength:'数据名称不能少于{0}个字符'
				   	},
				   	'gateNo': {
				   		required:'请输入子站地址',
				    	range:'子站地址的取值范围必须在{0}到{1}之间'
				   	},
			 	   	'regAddress': {
				    	required: '请输入寄存器地址',
				    	range:'寄存器必须大于{0}小于{1}'
				   	},
				   	'dataBitPos': {
				   		required: '请输入数据长度',
				    	range:'数据长度必须大于{0}小于{1}'
				   	},
				   	'dataUnit': {
				    	maxlength:'信号单位不能大于{0}个字 符'
				   	}
				}
		 });
		 return valid;
	}
});

function initMbMdTable(masterId) {
	//重新加载数据
	$('#mbMdTable').bootstrapTable('destroy');
	$('#mbMdTable').bootstrapTable({
		url : 'getMetadataDefinePage', //服务器数据的加载地址
		striped : true, //设置为 true 会有隔行变色效果
		pagination : true, //开启分页
		pageNumber : 1, //默认加载页
		pageSize : 10, //每页数据
		pageList : [ 10, 50, 100, 1000 ], //可选的每页数据
		search : true,
		dataField : 'data', //后端返回的实体数据
		dataType : 'json', //后端数据传递类型
		responseHandler : function(ret) {
			var data = ret.data;
			for (i in data) {
				data[i]['conv_dataDecode'] = convertDataDecode(data[i]['dataDecode']);
				data[i]['conv_dataType'] = convertDataType(data[i]['dataType']);
				data[i]['conv_funCode'] = convertFunCode(data[i]['funCode']);
			}
			ret.data = data;
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
				field : 'dataName',
				title : '数据名称',
				align : 'left'
			},
			{
				field : 'gateNo',
				title : '从站',
				align : 'center',
				visible : true
			},
			{
				field : 'conv_funCode',
				title : '功能码',
				align : 'center'
			},
			{
				field : 'regAddress',
				title : '寄存器地址',
				align : 'center'
			},
			{
				field : 'conv_dataType',
				title : '数据类型',
				align : 'center'
			},
			{
				field : 'conv_dataDecode',
				title : '编码顺序',
				align : 'center'
			},
			{
				field : 'dataUnit',
				title : '单位',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'operate',
				title : '操作',
				align : 'center',
				width : '120',
				formatter : mdOperate
			} ],
		formatNoMatches : function() {
			return '没有相关的匹配结果';
		},
		formatLoadingMessage : function() {
			return '';
		}
	});
}
	
function convertDataDecode(value) {
	if (value == '1') {
		return '1234';
	} else if (value == '2') {
		return '2143';
	} else if (value == '3') {
		return '3412';
	} else if (value == '4') {
		return '4321';
	} else {
		return '0';
	}
}

function convertDataType(value) {
	if (value == '1') {
		return '16位整形(有符号)';
	} else if (value == '2') {
		return '16位整形(无符号)';
	} else if (value == '3') {
		return '32位整形(有符号)';
	} else if (value == '4') {
		return '32位整形(无符号)';
	} else if (value == '5') {
		return '浮点型';
	} else if (value == '6') {
		return '开关型';
	} else {
		return '0';
	}
}
		
function convertFunCode(code){
	if(code==1){
		return '01:读线圈';
	}else if(code==2){
		return '02:读离散量输入';
	}else if(code==3){
		return '03:读保持寄存器';
	}else if(code==4){
		return '04:读输入寄存器';
	}
}

function mdOperate(value, row, index) {
	return [
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;" data-toggle="modal" data-target="#mbMdModify"',
		' onclick="editMbMd(\'' + escape(JSON.stringify(row)) + '\')">编辑</button>',
		'<button type="button" class="btn btn-success  btn-sm" ',
		'style="margin-right:5px;" data-toggle="modal"   ',
		' onclick="editAlert(\'' + escape(JSON.stringify(row)) + '\')">报警</button>'
	].join('');
}

function editMbMd(row) {
	$("#addOrUpdateMbmdForm").validate().resetForm();
	var rowData = unescape(row);
	rowData = JSON.parse(rowData);
	$('#mbMdModifyLabel').text('编辑元数据 ' + rowData.dataName + ' 定义');
	$('#gateNo').val(rowData.gateNo);
	$('#funCode').val(rowData.funCode);
	$('#regAddress').val(rowData.regAddress);
	$('#dataName').val(rowData.dataName);
	$('#dataType').val(rowData.dataType);
	$('#dataDecodeOrder').val(rowData.dataDecodeOrder);
	$('#dataUnit').val(rowData.dataUnit);
	$('#dataBitPos').val(rowData.dataBitPos);
	$('#data0Dis').val(rowData.data0Dis);
	$('#data1Dis').val(rowData.data1Dis);
	$('#dataFun').val(rowData.dataFun);
	$('#metadataId').val(rowData.id);
	$('#disOrder').val(rowData.disOrder);
	$('#funCode').change();
	$('#mbMdModifyModal').modal('show');
}

function editAlert(row) {
	var rowData = unescape(row);
	rowData = JSON.parse(rowData);
}
		
