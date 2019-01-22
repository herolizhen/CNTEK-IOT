var pandleft = null; //添加控件与左边距离
var pandtop = null; //添加控件与顶部距离


var flag_drag = false; //是否拖动控件名称的标识
var flag_resize = false; //是否调整控件的大小
var flag_mouse_down = false;
var flag_select_mutl = false; //多选标志
var flag_select_single = true; //单选标志
var flag_keyCtrl_down = false; //是否按下ctrl按键
var select_mutl_count = 0; //选中个数

var devId = ''; //新添控件的ID
var sel_devId = ''; //当前选中的设备
var count = 0; //添加的控件个数
var deviced = {}; //存储所有控件的所有属性
var type = {}; //按钮类型

var mouseMoveX = null;
var mouseMoveY = null;
var mouseDownX = null;
var mouseDownY = null;


var deviceSelArray = new Array();

//显示选中框
function displaySelected(mouseDownY, mouseDownX, mouseUpX, mouseUpY) {
	$("#selected").css("display", "block");
	$("#selected").css("top", mouseDownY);
	$("#selected").css("left", mouseDownX);
	var moveX = mouseMoveX - mouseDownX;
	var moveY = mouseMoveY - mouseDownY;
	if (moveY < 0) {
		$("#selected").css("top", event.clientY - $("#resizeBox").offset().top);
	}
	if (moveX < 0) {
		$("#selected").css("left", event.clientX - $("#resizeBox").offset().left);
	}
	$("#selected").css("width", Math.abs(moveX));
	$("#selected").css("height", Math.abs(moveY));
}

//关闭选中框
function closeSelected() {
	$("#selected").css("display", "none");
	$("#selected").css("top", 0);
	$("#selected").css("left", 0);
	$("#selected").css("width", 0);
	$("#selected").css("height", 0);
}

//根据控件类型更换属性

function changeItemAttr(devIndex) {
	$('#t_property').find('tr').hide();
	$('.static').show();
	$('.fontStyle').show();
	if (devIndex == 1 || devIndex == 3) { //静态标签
		$('#tr_i_tagtype').show();
		$('#tr_i_linkorgidstatus').show();
		$('#tr_i_textAlign').show();

		$('#tr_i_tagtext').show();
		$('#tr_i_font').show();
		$('#tr_i_bjcolor').show();

	} else if (devIndex == 2) { //监测点信息
		$('#tr_i_deviceid').show();
		$('#tr_i_moniShowMode').show();
		$('#tr_i_font').show();
		$('#tr_i_bjcolor').show();
		$('#tr_i_alarmbjcolor').show();
		$('#tr_i_textAlign').show();
	}
}



function dclick(index) {
	var html = null;
	devId = 'dev_' + count;
	var zIn = 800 + count;
	html = '<div id="' + devId + '"class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:102px;height:132px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;background-size:contain;"></div></div>';
	if (index == 1) { //静态标签
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;"></div></div>';
	} else if (index == 2) { //监测点
		html = '<div id="' + devId + '"class="dev"data-mbmd=""data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%;overflow:hidden;background-color:rgba(0,0,0,0);color:#333;font-size:14px;font-weight:bold;"><p id="p' + devId + 'img"style="width:100%;"><span id="' + devId + 'name">监测点</span><span id="' + devId + 'val"></span></p></div></div>';
	} else if (index == 3) { //图片
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width: 100px;height:120px;z-index: ' + zIn + '; ">'
			+ '<div id="' + devId + '"style="background-color:rgb(35, 12, 145);height:100%;overflow:hidden;margin:20;"></div></div>';
	}
	count++;
	flag_drag = true;
	return html;
}


$(function() {
	$(document).keydown(function(e) {
		if (e.ctrlKey) {
			flag_keyCtrl_down = true;
			//deviceSelArray = new Array();

			if (select_mutl_count == 0) {
				deviceSelArray = new Array();
			//console.log('keydown' + deviceSelArray.length);
			}
		}
	}).keyup(function(e) {
		if (e.keyCode == 17) {
			flag_keyCtrl_down = false;
		}
	});

	$('#resizeBox').click(function() {

		//		console.log('click'+flag_mouse_down);
		//		console.log('resizeBox click:' + select_mutl_count);

		if (flag_select_single) {
			flag_select_single = false;
		}

		if (flag_resize) {
			flag_resize = false;
		}
		if (!flag_select_mutl) {
			$('#contentBox').find('div').css({
				outline : 'none'
			});
			sel_devId = '';
		}
	});

	$('#resizeBox').mousemove(function(e) {
		if (flag_resize && flag_mouse_down && sel_devId != '') { //调整控件大小
			$('#' + sel_devId).css({
				width : e.clientX - $('#' + sel_devId).offset().left,
				height : e.clientY - $('#' + sel_devId).offset().top,
			});
		} else if (!flag_resize && flag_mouse_down && !flag_select_single && !flag_select_mutl) { //选择控件
			mouseMoveX = e.clientX - $(this).offset().left;
			mouseMoveY = e.clientY - $(this).offset().top;
			displaySelected(mouseDownY, mouseDownX, mouseMoveX, mouseMoveY);
		}

	});

	//multli select begin 
	$('#resizeBox').mousedown(function(e) {
		//		console.log('resizeBox mousedown');
		$('#contentBox').find('div').css({
			outline : 'none'
		});
		sel_devId = '';
		mouseDownX = event.clientX - $(this).offset().left;
		mouseDownY = event.clientY - $(this).offset().top;

		flag_mouse_down = true;
		flag_select_mutl = false;
		flag_select_single = false;
		select_mutl_count = 0
	});

	$('#resizeBox').mouseup(function(e) {
		mouseMoveX = e.clientX - $(this).offset().left;
		mouseMoveY = e.clientY - $(this).offset().top;
		if (flag_mouse_down && select_mutl_count == 0) {
			//			console.log("resizeBox mouseup:" + mouseDownX + mouseMoveX);
			var selLTX = null;
			var selLTY = null;
			var selRBX = null;
			var selRBY = null;
			if (mouseDownX <= mouseMoveX && mouseDownY <= mouseMoveY) {
				selLTX = mouseDownX;
				selLTY = mouseDownY;
				selRBX = mouseMoveX;
				selRBY = mouseMoveY;
			} else if (mouseDownX > mouseMoveX && mouseDownY <= mouseMoveY) {
				selLTX = mouseMoveX;
				selLTY = mouseDownY;
				selRBX = mouseDownX;
				selRBY = mouseMoveY;
			} else if (mouseDownX <= mouseMoveX && mouseDownY > mouseMoveY) {
				selLTX = mouseDownX;
				selLTY = mouseMoveY;
				selRBX = mouseMoveX;
				selRBY = mouseDownY;
			} else if (mouseDownX > mouseMoveX && mouseDownY > mouseMoveY) {
				selLTX = mouseMoveX ;
				selLTY = mouseMoveY;
				selRBX = mouseDownX;
				selRBY = mouseDownY;
			}

			deviceSelArray = new Array();
			select_mutl_count = 0;
			for (var i = 0; i < count; i++) {
				var dev_ltx = $('#dev_' + i).offset().left - $('#resizeBox').offset().left;
				var dev_lty = $('#dev_' + i).offset().top - $('#resizeBox').offset().top;
				var dev_rbx = dev_ltx + $('#dev_' + i).outerWidth();
				var dev_rby = dev_lty + $('#dev_' + i).outerHeight();
				if (dev_ltx > selLTX && dev_lty > selLTY && dev_rbx < selRBX && dev_rby < selRBY) {
					$('#dev_' + i).css({
						outline : 'rgb(32, 158, 145) dotted 4px'
					});
					deviceSelArray[i] = 'dev_' + i;
					select_mutl_count += 1;
				}
			}
		}

		if (select_mutl_count > 1) {
			flag_select_mutl = true;

		} else {
			flag_select_mutl = false;
		}
		//		console.log('flag_select_mutl:' + flag_select_mutl);

		flag_mouse_down = false;
		closeSelected();

	});

	$('#resizeBox').draggable({
		disabled : true
	});
	$('#contentBox').draggable({
		disabled : true
	});

	$('#resizeBox').droppable({
		accept : '#controlNameBox > li',
		onDrop : function(e, source) { //放置完成时触发
			$('.proxy').remove();
			var target = e.target || e.srcElement;
			var index = $(source).attr('data-cIndex');
			var pandHtml = dclick(index);
			setTimeout(function() {
				var $target = $(target);
				var left = pandleft - $('#resizeBox').offset().left;
				var top = pandtop - $('#resizeBox').offset().top;
				createDev($target, left, top, pandHtml);
			}, 100);
		}
	});
	$('#controlNameBox > li').draggable({
		cursor : "pointer",
		revert : true,
		deltaX : -40,
		deltaY : -10,
		proxy : function(source) { //代理，clone
			var n = $('<div class="proxy"style="border:0px solid #ccc;padding-left:-20px;padding-right:0px;"></div>');
			n.html('<p style="position:relative;z-index:9999;">' + $(source).html() + '</p>').appendTo('body');
			return n;
		},
		onStopDrag : function(e) { //拖拽完成时触发
			pandleft = e.clientX ;
			pandtop = e.clientY  ;
		}
	});

	function createDev($target, left, top, html, DevFlag) {
		flag_resize = false;

		if (flag_drag) {
			flag_drag = false;
			$target.append(html);
			$('#' + devId).css({
				position : 'absolute',
				left : left,
				top : top
			});
		}

		$('#' + devId).mousemove(function(e) {
			e.stopPropagation();
			$("#dev_south").text(e.pageX + '-' + e.clientX + '-' + $(this).offset().left + '-' + $(this).outerWidth() + $(this).width());
			//			console.log(' div  mousemove flag_select_mutl:' + flag_select_mutl);
			mouseMoveX = e.clientX - $(this).offset().left;
			mouseMoveY = e.clientY - $(this).offset().top;

			//begin
			//全部移动，目前有BUG
			//			if (flag_mouse_down && flag_select_mutl) {
			//				console.log(' div if mousemove' + flag_mouse_down);
			//				var x_dif = mouseMoveX - mouseDownX;
			//				var y_dif = mouseMoveY - mouseDownY;
			//				console.log('x_dif y_dif' + x_dif + '-' + y_dif);
			//				for (var i = 0; i < deviceSelArray.length; i++) {
			//					if (deviceSelArray[i] == $(this).attr('id')) {
			//						continue ;
			//					} else {
			//						var $target = $('#' + deviceSelArray[i]);
			//						var x_top = $(this).offset().top ;
			//						var x_left =$(this).offset().left ;
			//						$target.offset({
			//							top : x_top,
			//							left :x_left
			//						});
			//						console.log('x_top y_top' + x_top + '-' + x_left);
			//					}
			//	
			//				}
			//			}				
			//end

			if (!flag_select_mutl && !flag_select_single && flag_mouse_down) { //执行多选拖拽任务
				$(this).css({
					cursor : 'pointer'
				});

			} else {
				var pos_right = $(this).offset().left + $(this).outerWidth();
				var pos_bottom = $(this).offset().top + $(this).outerHeight();
				//判断用户意图，拖拽还是放大
				if ((e.clientX > pos_right - 10 && e.clientX < pos_right) && (e.clientY > pos_bottom - 10 && e.clientY < pos_bottom)) {
					$(this).draggable("disable");
					//					$(this).resizable();
					$(this).css({
						cursor : 'se-resize'
					});
					flag_resize = true;
				} else {
					//console.log('!flag_mouse_down&&!flag_keyCtrl_down:'+!flag_mouse_down+!flag_keyCtrl_down);
					if (!flag_mouse_down && !flag_keyCtrl_down) { //鼠标没有按下，且ctrl按键没有按下的情况下
						$(this).draggable("enable");
						$(this).css({
							cursor : 'move'
						});
						flag_resize = false;
					}
				}
				//执行放大动作
				if (flag_resize && flag_mouse_down && flag_select_single) { //调整大小判断
					$(this).css({
						width : e.clientX - $(this).offset().left,
						height : e.clientY - $(this).offset().top
					});
				}
			}
		});
		//增加是否已经多选的判断
		$('#' + devId).mousedown(function(e) {
			e.stopPropagation();
			console.log('devId mousedown');

			mouseDownX = event.clientX - $(this).offset().left;
			mouseDownY = event.clientY - $(this).offset().top;

			flag_mouse_down = true;
			sel_devId = $(this).attr('id');
			if (flag_select_mutl) {
				if (flag_resize) {
					flag_resize = false;
				}
				$(this).draggable("enable");
			} else {
				if (flag_resize) {
					$(this).draggable("disable");
				} else {
					$(this).draggable("enable");
				}

				if (flag_keyCtrl_down) {
					flag_select_mutl = true;
					flag_select_single = false;
				} else {
					flag_select_mutl = false;
					flag_select_single = true;
				}
			}
		});

		$('#' + devId).click(function(e) {
			e.stopPropagation();
			$('#i_x').val(parseInt($(this).position().left));
			$('#i_y').val(parseInt($(this).position().top));
			$('#i_w').val(parseInt($(this).width()));
			$('#i_h').val(parseInt($(this).height()));

			if (flag_keyCtrl_down) {
				var is_sel = false;
				for (var i = 0; i < deviceSelArray.length; i++) {
					if (deviceSelArray[i] == $(this).attr('id')) {
						$(this).css({
							outline : 'none'
						});
						deviceSelArray.splice(i, 1);
						select_mutl_count -= 1;
						is_sel = true;
						break
					}
				}

				if (!is_sel) {
					deviceSelArray[select_mutl_count] = $(this).attr('id');
					select_mutl_count += 1;
					$(this).css({
						outline : 'rgb(32, 158, 145) dotted 4px'
					});
				}
				flag_select_mutl = true;
				flag_select_single = false;

			} else {
				sel_devId = $(this).attr('id');
				$('#contentBox').find('div').css({
					outline : 'none'
				});
				$(this).css({
					//outline : '2px dotted red'
					outline : 'rgb(32, 158, 145) dotted 4px'
				});
				flag_select_mutl = false;
				flag_select_single = true;
				select_mutl_count = 1;
				deviceSelArray[select_mutl_count - 1] = $(this).attr('id');
				var devIndex = $(this).attr('data-index');
				changeItemAttr(devIndex);
			}
		});
	}


	$('#' + devId).draggable({
		//		handle : '#' + devId + 'img',
		onStopDrag : function(e) {
			var zoneId = $(this).attr('id');
			var Left = $(this).position().left;
			var Top = $(this).position().top;
			//			var devArr = $(this).siblings();
			//			for (var i = 0; i < devArr.length; i++) {
			//				if (deviced[devArr.eq(i).attr('id')].devIndex == 20) {
			//					if (devArr.eq(i).css('zIndex') < $(this).css('zIndex')) {
			//						var panelLeft = devArr.eq(i).position().left;
			//						var panelTop = devArr.eq(i).position().top;
			//						var panelRight = devArr.eq(i).width() + panelLeft;
			//						var panelBottom = devArr.eq(i).height() + panelTop;
			//						if (Left < panelRight && Left > panelLeft && Top > panelTop && Top < panelBottom) {
			//							devArr.eq(i).children(":first").append($(this));
			//							var x = Left - panelLeft;
			//							var y = Top - panelTop;
			//							$(this).css({
			//								left : x + 'px',
			//								top : y + 'px'
			//							});
			//							deviced[zoneId].devFlag = 'groupBox';
			//						}
			//					}
			//				}
			//			}
			//			deviced[zoneId].x = parseInt($(this).position().left);
			//			deviced[zoneId].y = parseInt($(this).position().top);
			$('#i_x').val(parseInt($(this).position().left));
			$('#i_y').val(parseInt($(this).position().top));
			console.log(parseInt($(this).position().left));
			console.log('--------------------------------------------');
		//			$(this).trigger('click');
		}
	});


	$('#btn_aline_left').click(function() {
		if (deviceSelArray.length == 1) {
			return;
		}
		var min_left_pos = 9999;
		for (var i = 0; i < deviceSelArray.length; i++) {
			console.log(deviceSelArray[i]);
			var $target = $('#' + deviceSelArray[i]);
			if (min_left_pos > $target.offset().left) {
				min_left_pos = $target.offset().left
			}
		}

		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			$target.offset({
				left : min_left_pos
			});
		}

	});

	$('#btn_aline_mid').click(function() {
		if (deviceSelArray.length == 1) {
			return;
		}
		var $target = $('#' + deviceSelArray[0]);
		var pre_mid_pos = $target.offset().left + $target.outerWidth() / 2;

		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			var mid_pos = pre_mid_pos - $target.outerWidth() / 2;
			$target.offset({
				left : mid_pos
			});
		}
	});

	$('#btn_aline_right').click(function() {
		var max_right_pos = 0;
		if (deviceSelArray.length == 1) {
			return;
		}
		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			if (max_right_pos < $target.offset().left + $target.outerWidth()) {
				max_right_pos = $target.offset().left + $target.outerWidth()
			}
		}
		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			var right_pos = max_right_pos - $target.outerWidth();
			$target.offset({
				left : right_pos
			});
		}

	});

	$('#btn_aline_top').click(function() {
		var min_top_pos = 9999;
		if (deviceSelArray.length == 1) {
			return;
		}
		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			if (min_top_pos > $target.offset().top) {
				min_top_pos = $target.offset().top
			}
		}
		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			$target.offset({
				top : min_top_pos
			});
		}
	});

	$('#btn_aline_center').click(function() {
		if (deviceSelArray.length == 1) {
			return;
		}
		var $target = $('#' + deviceSelArray[0]);
		var pre_center_pos = $target.offset().top + $target.outerHeight() / 2;
		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			var mid_pos = pre_center_pos - $target.outerHeight() / 2;
			$target.offset({
				top : mid_pos
			});
		}
	});

	$('#btn_aline_bottom').click(function() {
		var max_bottom_pos = 0;
		if (deviceSelArray.length == 1) {
			return;
		}
		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			if (max_bottom_pos < $target.offset().top + $target.outerHeight()) {
				max_bottom_pos = $target.offset().top + $target.outerHeight()
			}
		}

		for (var i = 0; i < deviceSelArray.length; i++) {
			var $target = $('#' + deviceSelArray[i]);
			var bottom_pos = max_bottom_pos - $target.outerHeight();
			$target.offset({
				top : bottom_pos
			});
		}

	});

	$('#btn_move_top').click(function() {
		$target = $('#' + sel_devId);
		zIndex = zIn++ ;
		$target.css({
			"z-index" : zIndex
		});
	});

	$('#btn_move_up').click(function() {
		$target = $('#' + sel_devId);
		var zIndex = $target.css('z-index');
		zIndex++ ;
		$target.css({
			"z-index" : zIndex
		});
	});

	$('#btn_move_down').click(function() {
		$target = $('#' + sel_devId);
		var zIndex = $target.css('z-index');
		zIndex-- ;
		$target.css({
			"z-index" : zIndex
		});
	});

	$('#btn_move_bottom').click(function() {
		$target = $('#' + sel_devId);
		var zIndex = 800 - 1;
		$target.css({
			"z-index" : zIndex
		});
	});

	$('.colorPicker').spectrum({
		showInput : true, //颜色值input
		showAlpha : true, //透明度选择
		showPalette : true, //左边显示选过的颜色
		clickoutFiresChange : true, //点击色盘外部可选中颜色
		showInitial : true, //当前值与选中值对比
		chooseText : "应用",
		cancelText : "取消"
	});

	$("#i_bordercolor").on('hide.spectrum', function(e, tinycolor) {
		var color = $('#i_bordercolor').spectrum('get');
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.borderColor = color;
			$('#resizeBox').css({
				borderColor : color
			});
		}

		console.log('i_bordercolor');

		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {

			console.log(devArr.eq(i).css('outline-style'));

			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					borderColor : color
				});
				devArr.eq(i).attr('data-bfalg', 'true');
			}
		}
	});

	//正常背景色
	$('#i_bjcolor').on('hide.spectrum', function(e, tinycolor) {
		var normalColor = $('#i_bjcolor').spectrum('get');
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.bgColor = normalColor;
			$('#resizeBox').css({
				backgroundColor : normalColor
			});
			return false;
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					background : normalColor
				});
			} else {
				var upId = devArr.eq(i).attr('id') + 'img';
				$('#' + upId).css({
					backgroundColor : normalColor
				});
			}
		}

	});

	//选择监测点
	$('#i_deviceid').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});


	function selectDevState(stateName) {
		$('#mbMdTableModal').modal('show');
		initMbMdTable('001');
	}

	function initMbMdTable(deviceId) {
		//重新加载数据
		$("#mbMdTable").bootstrapTable('destroy');
		var data = {
			"deviceId" : deviceId
		};

		$modbus.selMdByDeviceId(data,
			function(ret) {
				var obj = ret.data;
				for (i in obj) {
					obj[i]['dataType_decode'] = decodeDataType(obj[i]['dataType']);
				}
				$('#mbMdTable').bootstrapTable({
					data : obj,
					// height : 600,
					striped : true,
					pagination : true,
					clickToSelect : true,
					pageNumber : 1,
					pageSize : 10,
					pageList : [ 10, 50, 100, 1000 ],
					search : true,
					maintainSelected : true,
					searchAlign : 'left',
					columns : [
						{
							radio : true,
							align : 'center',
							title : '选择',
							visible : true
						},
						{
							field : 'dataName',
							title : '名称',
							align : 'center'
						},
						{
							field : 'mbGateNo',
							title : '从站',
							align : 'center',
							visible : true
						},
						{
							field : 'mbFunCode',
							title : '功能吗',
							align : 'center',
							visible : true
						},
						{
							field : 'mbRegisterAddress',
							title : '寄存器地址',
							align : 'center'
						},
						{
							field : 'dataType_decode',
							title : '数据类型',
							align : 'center'
						},
						{
							field : 'dataUnit',
							title : '数据单位',
							align : 'center',
							valign : 'middle'
						} ],
					formatNoMatches : function() {
						return "没有相关的匹配结果";
					},
					formatLoadingMessage : function() {
						return "";
					}
				});
			},
			function() {
				alert('查询提示', '设备信息加载失败');
			});
	}

	function decodeDataType(value) {
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

	$('#btn_mbmd_save').click(function() {
		console.log($('#mbMdTable').bootstrapTable('getSelections')[0]);
		var mbmd_id = $('#mbMdTable').bootstrapTable('getSelections')[0].mbRegisterAddress;
		$('#' + sel_devId).attr('data-mbmd', mbmd_id);
		//		console.log($('#' + sel_devId).attr('data-mbmd'));
		$('#i_deviceid').val(mbmd_id);
		$('#mbMdTableModal').modal('hide');
	});

	function getRealTimeData(deviceId) {
		deviceId = '001';
		var data = {
			"deviceId" : deviceId
		};

		$dev.getRealTimeData(data,
			function(ret) {
				var obj = ret.data;
				$.each(obj, function(n, value) {
					console.log(value.mb_register_address + '---' + value.d_dec);
					console.log($("div[data-mbmd='5']").attr("data-mbmd"));
					var id = $("div[data-mbmd='" + value.mb_register_address + "']").attr("id");
					if (id != undefined) {
//						$("#" + id + "name").text("最大电压：");
						$("#" + id + "val").text(value.d_dec);
					}
				});
			},
			function() {
				alert('查询提示', '设备信息加载失败');
			});
	}

	$('body').everyTime('10s', getRealTimeData);
});