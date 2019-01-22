$(function() {
	initTopo();
});

var count = 0; //添加的控件个数
var falg = false; //是否拖动控件名称的标识

//初始化topo参数
function initTopo() {
	deviced = devices;
	if ($.isEmptyObject(deviced)) {
		return false;
	} else {
		var maxId = 0;
		for (var i in deviced) {
			if (deviced[i].devIndex == 'bg') {
				genUc_bg();
			} else if (deviced[i].devIndex == 2) { //静态标签
				genUc_2(i);
			} else if (deviced[i].devIndex == 5) { //检测点信息
				genUc_5(i);
			} else if (deviced[i].devIndex == 8) { //开关量器件类型
				genUc_8(i);
			} else if (deviced[i].devIndex == 11) { //控制按钮
				genUc_11(i);
			} else if (deviced[i].devIndex == 14) { //表盘
				genUc_14(i);
			} else if (deviced[i].devIndex == 15) { //刻度表
				genUc_15(i);
			} else if (deviced[i].devIndex == 24) { //图表控件
				genUc_24(i);
			} else {
				continue;
			}

			if (deviced[i].devIndex != 'bg') {
				menuAdd(i)
			}

			if (parseInt(i.split('_')[1]) > maxId) {
				maxId = parseInt(i.split('_')[1]);
			}
		}

		if (maxId > 1) {
			count = maxId + 1;
		}

		$('#resizeBox').trigger('click');
	}
}

//图表控件
function genUc_24(i) {
	var html = [
		' <div id="' + i + '" class="dev chart" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
		' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; padding:  ' + deviced[i].padding + 'px; border-radius:  ' + deviced[i].borderRadius + 'px; border: ' + deviced[i].borderWidth + 'px solid  ' + JSONToTinycolor(deviced[i].borderColor) + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
		' <div id="' + i + 'img"',
		' style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';outline: none;">',
		' </div>',
		' </div>',
	].join('');

	$('#resizeBox').append(html);
	LineChartReInit(i);
	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});
}
//仪表盘
function genUc_14(i) {
	var html = [
		' <div id="' + i + '" class="dev" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
		' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; padding:  ' + deviced[i].padding + 'px; border-radius:  ' + deviced[i].borderRadius + 'px; border:' + deviced[i].borderWidth + 'px solid  ' + JSONToTinycolor(deviced[i].borderColor) + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
		' <div id="' + i + 'img"',
		' style="width: 100%; height: 100%; border-radius: 50%; -webkit-tap-highlight-color: transparent; user-select: none; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';outline: none;">',
		' </div>',
		' <span',
		' style="color: ' + deviced[i].fontColor + '; display: inline-block; position: absolute; bottom: 10px;">' + deviced[i].devname + '</span>',
		' </div>',
	].join('');

	$('#resizeBox').append(html);

	setGauge(i);

	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});
}

//开关量器件类型
function genUc_8(i) {

	var html = [
		' <div id="' + i + '" class="dev" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
		' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px; border-radius: 2px; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';">',
		'	<div id="' + i + 'img"',
		' style=" background: url(&quot;' + deviced[i].openImgurl + '&quot;) 0% 0% / contain no-repeat; outline: none; border-radius: 50%;width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px;">',
		'	<p id="p' + i + 'img" style="width:100%; font-size:' + deviced[i].fontSize + 'px; font-weight:' + deviced[i].fontWeight + '; font-family:' + deviced[i].fontFamily + '; color:' + JSONToTinycolor(deviced[i].fontColor) + ';">' + deviced[i].devname + '</p>',
		' </div>',
		' </div>',
	].join('');

	$('#resizeBox').append(html);

	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});
	//textAlign(i);
}

//控制按钮
function genUc_11(i) {
	var html = [
		' <div id="' + i + '" class="dev" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
		' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;border-radius:10%;">',
		' <button id="' + i + 'img"',
		'	style="width: 100%; height: 100%; background: url(' + deviced[i].normalImg + ') 0% 0% / cover no-repeat ' + JSONToTinycolor(deviced[i].bgColor) + '; border-radius: 10%; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; color:' + JSONToTinycolor(deviced[i].fontColor) + '; font-family:' + deviced[i].fontFamily + ';"></button>',
		' </div>',
	].join('');

	$('#resizeBox').append(html);

	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});

	if (deviced[i].btnType == 'general') {
		$('#' + i + 'img').css({
			backgroundImage: "url(" + deviced[i].openImgurl + ")"
		}).text(deviced[i].openText);
	} else {
		$('#' + i + 'img').css({
			backgroundImage: "url(" + deviced[i].bgImg + ")"
		}).text(deviced[i].tagtext);
	}
}
//静态标签
function genUc_2(i) {
	var oText;
	if (deviced[i].tagtype == 'pic') {
		oText = '';
	} else {
		oText = deviced[i].tagtext;
	}

	var html = [
		' <div id="' + i + '" class="dev" data-falg="false" data-bfalg="true"data-index="' + deviced[i].devIndex + '"',
		'	style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + (deviced[i].y) + 'px;' + (deviced[i].y) + '">',
		'	<div id="' + i + 'img"',
		'	style="width: 100%; height: 100%; background: url(' + deviced[i].bgImg + ') 0% 0% / cover no-repeat ' + JSONToTinycolor(deviced[i].bgColor) + '; outline: none;">',
		'	<p id="p' + i + 'img"',
		'	style="width: 100%; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; font-family:' + deviced[i].fontFamily + ';background-color:' + deviced[i].bgColor + '; padding-top: 24px; color: rgb(255, 0, 0); font-family: ' + deviced[i].fontFamily + ';">' + oText + '</p>',
		'	</div>',
		'	</div>',
	].join('');

	$('#resizeBox').append(html);

	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});
	picShowMode(i);
	textAlign(i);
}
//监测点
function genUc_5(i) {
	var html = [
		' <div id="' + i + '" class="dev" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
		' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
		' <div id="' + i + 'img"',
		' style="width: 100%; height: 100%; overflow: hidden; background-color: ' + JSONToTinycolor(deviced[i].bgColor) + '; color: ' + JSONToTinycolor(deviced[i].fontColor) + '; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; font-family:' + deviced[i].fontFamily + ';outline: none; background-size: contain;">',
		' <p id="p' + i + 'img"',
		' style="width: 100%; text-align: center; padding-top: 11px; font-family: ' + deviced[i].fontFamily + '; font-size: ' + deviced[i].fontSize + 'px; color: ' + JSONToTinycolor(deviced[i].fontColor) + ';">',
		' <span id="' + i + 'name"></span><span id="' + i + 'val"></span>',
		' </p>',
		' </div>',
		' </div>',
	].join('');

	$('#resizeBox').append(html);

	if (deviced[i].moniShowMode == '0') {
		$('#' + i + 'name').text(deviced[i].devname);
		$('#' + i + 'val').text('');
	} else if (deviced[i].moniShowMode == '1') {
		$('#' + i + 'name').text('');
		$('#' + i + 'val').text(deviced[i].tagtext);
	} else if (deviced[i].moniShowMode == '2') {
		$('#' + i + 'name').text(deviced[i].devname + ' : ');
		$('#' + i + 'val').text(deviced[i].tagtext);
	}

	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});

	textAlign(i);
}
//温度计
function genUc_15(i) {
	var html = [
		' <div id="' + i + '" class="dev" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
		' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; padding: ' + deviced[i].padding + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
		' <div id="' + i + 'img"',
		'	style="width: 100%; height: 100%; outline: none; background-color:' + JSONToTinycolor(deviced[i].bgColor) + ';">',
		'	</div>',
		' <span',
		'	style="color:' + deviced[i].fontColor + '; position: absolute; bottom: 10px; left: 0px;">' + deviced[i].devname + '</span>',
		' </div>',
	].join('');

	$('#resizeBox').append(html);

	$('#' + i).click(function(e) {
		ucClickEvent(e, i);
	});

	$('#' + i).draggable({
		handle: '#' + i + 'img',
		onStopDrag: function(e) {
			ucDragEvent(e, i, this);
		}
	});

	deviced[i].dial = new canvasPanel();
	deviced[i].dial.bgColor = deviced[i].panelColor;
	deviced[i].dial.danwei = deviced[i].Unit;
	deviced[i].dial.splitNum = deviced[i].lineValue;
	deviced[i].dial.MaxNum = parseInt(deviced[i].dmaxvalue);
	deviced[i].dial.MinNum = parseInt(deviced[i].dminvalue);
	deviced[i].dial.init(i + 'img');
}
//背景处理
function genUc_bg() {
	$("#resizeBox").attr("width", deviced.bg.width + 'px;');
	$("#resizeBox").attr("height", deviced.bg.height + 'px;');
	$("#resizeBox").attr("border", deviced.bg.borderWidth + 'px solid' + deviced.bg.borderColor + ';');
	$("#resizeBox").attr("background-color", '#002201;');

	var showmode = deviced.bg.showmode;
	switch (showmode) {
		case 'normal':
			$('#resizeBox').css({
				background: "url(" + deviced.bg.bgImg + ") no-repeat",
				backgroundSize: 'contain',
				backgroundColor: JSONToTinycolor(deviced.bg.bgColor)
			});
			break;
		case 'strech':
			$('#resizeBox').css({
				background: "url(" + deviced.bg.bgImg + ") no-repeat",
				backgroundSize: 'cover'
			});
			break;
		case 'repeat':
			$('#resizeBox').css({
				background: "url(" + deviced.bg.bgImg + ") repeat"
			});
			break;
		case 'none':
			$('#resizeBox').css({
				background: "none",
				backgroundColor: JSONToTinycolor(deviced.bg.bgColor)
			});
			break;
	}
	$("#resizeBox").attr("overflow", deviced.bg.scroll);
}
//预览图片显示模式
function picShowMode(i) {
	var showmode = deviced[i].showmode;
	switch (showmode) {
		case 'normal':
			$('#' + i + 'img').css({
				background: "url(" + deviced[i].bgImg + ") no-repeat",
				backgroundSize: 'contain'
			});
			break;
		case 'strech':
			$('#' + i + 'img').css({
				background: "url(" + deviced[i].bgImg + ") no-repeat",
				backgroundSize: 'cover'
			});
			break;
		case 'repeat':
			$('#' + i + 'img').css({
				background: "url(" + deviced[i].bgImg + ") repeat"
			});
			break;
		case 'none':
			$('#' + i + 'img').css({
				backgroundImage: "none"
			});
			break;
	}
}

//预览文本对齐方式
function textAlign(i) {
	var upElement = $('#' + i).find('p').eq(0);
	switch (deviced[i].textAlign) {
		case '0': //左上
			upElement.css({
				textAlign: 'left',
				paddingTop: '0'
			});
			break;
		case '1': //中上
			upElement.css({
				textAlign: 'center',
				paddingTop: '0'
			});
			break;
		case '2': //右上
			upElement.css({
				textAlign: 'right',
				paddingTop: '0'
			});
			break;
		case '3':
			var range = parseInt((deviced[i].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'left',
				paddingTop: range + 'px'
			});
			break;
		case '4':
			var range = parseInt((deviced[i].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'center',
				paddingTop: range + 'px'
			});
			break;
		case '5':
			var range = parseInt((deviced[i].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'right',
				paddingTop: range + 'px'
			});
			break;
		case '6':
			var range = parseInt(deviced[i].h - upElement.height());
			upElement.css({
				textAlign: 'left',
				paddingTop: range + 'px'
			});
			break;
		case '7':
			var range = parseInt(deviced[i].h - upElement.height());
			upElement.css({
				textAlign: 'center',
				paddingTop: range + 'px'
			});
			break;
		case '8':
			var range = parseInt(deviced[i].h - upElement.height());
			upElement.css({
				textAlign: 'right',
				paddingTop: range + 'px'
			});
			break;
	}
}

function menuAdd(i) {
	var menuIndex = $('#' + i).attr('data-index');
	var menuText = $('[id="a_' + menuIndex + '"]').text();
	$('#selele').append('<option data-Id="' + i + '"value="' + menuIndex + '">' + menuText + '</option>');
}

function ucClickEvent(e, i) {
	e.stopPropagation();
	var title = $('.tabs-selected').text();
	if (title == "预览") {
		return false;
	}
	var click_id = i; // $(this).attr('id');
	if (flag_keyCtrl_down) {
		//判断选中的控件类型是否一致
		if (flag_select_count >= 1 && deviced[click_id].devFlag != deviced[first_select_devId].devFlag) {
			$("#dev_south").text('选择的控件类型不一致，分组与单体不能同时选择！');
			return;
		}
		if (flag_select_count >= 1 && deviced[first_select_devId].devFlag != undefined) {
			if ($('#' + first_select_devId).parent().parent().attr('id') != $('#' + click_id).parent().parent().attr('id')) {
				$("#dev_south").text('选择的控件不在同一个分组中！');
				return;
			}
		}
		//选中处理
		deviced.bg.outlineStyle = 'none';
		$('#resizeBox').css({
			outline: 'none'
		});
		if (deviced[click_id].outlineStyle != 'none') {
			if (deviced[click_id].shape == 'cricle') {
				$('#' + click_id).css({
					borderRadius: '50%'
				});
			} else {
				$('#' + click_id).css({
					outline: 'none'
				});
			}
			deviced[click_id].outlineStyle = 'none';
			flag_select_count -= 1;
		} else {
			if (deviced[click_id].shape == 'cricle') {
				$('#' + click_id).css({
					borderRadius: 0
				});
			}
			$('#' + click_id).css({
				outline: '2px dotted red'
			});
			deviced[click_id].outlineStyle = "2px dotted red";
			flag_select_count += 1;
		}

		if (flag_select_count == 1) { //选中一个对象 存在取消选中的情况
			for (var index in deviced) {
				if (deviced[index].outlineStyle != 'none') {
					click_id = index;
					break;
				}
			}
			first_select_devId = click_id;
			//增加多选控件类型处理
			$("#selele").find("[data-Id='" + click_id + "']").attr('selected', 'selected').siblings().removeAttr('selected');
			var title = $("#selele").find("[data-Id='" + click_id + "']").text();
			$('#eastBox').panel('setTitle', '属性[' + title + ']');
			var devIndex = $('#' + click_id).attr('data-index');
			property_change(devIndex, click_id);
		} else {
			//多个控件处理,控件类型相同
			//对选中的控件进行循环处理判断选中的设备是否是同一类型
			var is_select_same = true;
			for (var index in deviced) {
				if (deviced[index].outlineStyle != 'none') {
					if ($('#' + first_select_devId).attr('data-index') != $('#' + index).attr('data-index')) {
						is_select_same = false;
						break;
					}
				}
			}
			if (is_select_same) {
				var title = $("#selele").find("[data-Id='" + first_select_devId + "']").text();
				$('#eastBox').panel('setTitle', '多选属性[' + title + ']');
				property_change($('#' + first_select_devId).attr('data-index'), first_select_devId)
			} else { //控件类型不同
				$('#eastBox').panel('setTitle', '多选属性[多类型控件]');
				property_change_mult_select();
			}
		}

	} else {
		//console.log('single selelct');
		flag_select_count = 1;
		first_select_devId = i;
		//单选效果处理
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (deviced[devAttr.eq(i).attr('id')].shape == 'circle') {
				devAttr.eq(i).css({
					borderRadius: '50%'
				});
			}
			deviced[devAttr.eq(i).attr('id')].outlineStyle = 'none';
		}
		$('#contentBox').find('div').css({
			outline: 'none'
		});
		$('.mapDrag').hide();

		$('#' + click_id).css({
			outline: '2px dotted red'
		});

		//选中后拖动判断处理
		if ($('#' + click_id).css('outline-style') != 'none') {
			if (deviced[click_id].devFlag == 'groupBox') {
				//当选中的是分组面板里面的元素时禁止分组面板的拖动
				$('#' + click_id).parent().parent().draggable({
					disabled: true
				});
				$('#' + click_id).draggable({
					disabled: false
				});
			} else if (deviced[click_id].devFlag != 'groupBox') {
				//当点击的不是分组面板里面的元素时允许当前点击的元素进行拖动
				$('#resizeBox').draggable({
					disabled: true
				});
				$('#contentBox').draggable({
					disabled: true
				});
				$('#' + click_id).draggable({
					disabled: false
				});
			}
			if (deviced[click_id].shape == 'circle') {
				$('#' + click_id).css({
					borderRadius: 0
				});
				CircleResizable($('#' + click_id).attr('id'));
			} else {
				RectResizable($('#' + click_id).attr('id'));
			}
		} else {
			return false;
		}

		deviced[click_id].outlineStyle = "2px dotted red";
		$("#selele").find("[data-Id='" + click_id + "']").attr('selected', 'selected').siblings().removeAttr('selected');
		var title = $("#selele").find("[data-Id='" + click_id + "']").text();
		$('#eastBox').panel('setTitle', '属性[' + title + ']');

		var devIndex = $('#' + click_id).attr('data-index');

		property_change(devIndex, click_id);
		for (var i in deviced[click_id]) {
			$('[name="' + i + '"]').val(deviced[click_id][i]);
			if ($('[name="' + i + '"]').is('.colorPicker')) {
				$('[name="' + i + '"]').spectrum('set', deviced[click_id][i]);
			}
		}
		if (deviced[click_id].devIndex == 8) {
			if (deviced[click_id].inverse == '1') {
				$('#i_inverse').prop("checked", true);
			} else if (deviced[click_id].inverse == '0') {
				$('#i_inverse').prop('checked', false);
			}
		}
	}
}



function ucDragEvent(e, i, thisObj) {
	var zoneId = i;
	deviced[zoneId].x = parseInt($(thisObj).position().left);
	deviced[zoneId].y = parseInt($(thisObj).position().top);
	$('#i_x').val(deviced[zoneId].x);
	$('#i_y').val(deviced[zoneId].y);
}


//折线图图表初始化
function LineChartReInit(devId) {
	deviced[devId].Chart = echarts.init(document.getElementById(devId + 'img'));
	deviced[devId].Chart.setOption(deviced[devId].option, true);
	for (var i = 0; i < deviced[devId].moniCount; i++) {
		LineChartPropInit(devId, i);
	}

}

function LineChartPropInit(upId, moniIndex) {
	var html = [
		'<tr id="tr_i_moni' + upId + moniIndex + '"',
		'class="tr_i_monis' + upId + '"><td></td>',
		'<td class="txt monitext' + upId + '">' + deviced[upId].series[moniIndex].name + '</td>',
		'<td class="txt" style="position:relative;">',
		'<input id="i_moni' + upId + moniIndex + '" name="moni' + upId + moniIndex + '"',
		'	data-mCount=' + moniIndex + '',
		'	style="box-sizing:border-box;width:154px;padding-right:20px;background:transparent;" readonly="readonly" />',
		'<div class="triangle-down' + upId + ' triangle-down"></div></td>',
		'	</tr>	'
	].join('');

	$('#tr_i_devlevel').before(html);

	$('.triangle-down' + upId).click(function() {
		$(this).siblings().trigger('click');
	});

	$('#i_moni' + upId + moniIndex).val(deviced[upId]['moni' + upId + moniIndex]).click(function() {
		$('#tr_i_chartcolor').show();
		$('#tr_i_charttext').show();
		$(this).parent().parent().after($('#tr_i_chartcolor'), $('#tr_i_charttext'));
		$('#i_charttext').val(deviced[upId][moniIndex].charttext);
		$('#i_chartcolor').spectrum('set', deviced[upId][moniIndex].chartcolor);

		$('#i_chartcolor').on('hide.spectrum', function(e, tinycolor) {
			var color = $('#i_chartcolor').spectrum('get').toHexString();
			var devArr = $('.dev');
			for (var i = 0; i < devArr.length; i++) {
				if (devArr.eq(i).css('outline-style') !== 'none') {
					var devId = devArr.eq(i).attr('id');
					$('.triangle-down' + devId).eq(deviced[devId].moniIndex).css({
						borderTopColor: color
					});
					deviced[devId][moniIndex].chartcolor = color;
					deviced[devId].series[moniIndex].itemStyle.normal.color = color;
					deviced[devId].Chart.setOption({
						legend: {
							data: deviced[devId].legendData
						},
						series: deviced[devId].series
					});
				}
			}
		});

		$('#i_charttext').blur(function() {
			var text = $(this).val();
			var devArr = $('.dev');
			for (var i = 0; i < devArr.length; i++) {
				if (devArr.eq(i).css('outline-style') !== 'none') {
					var devId = devArr.eq(i).attr('id');
					$('.monitext' + upId).eq(moniIndex).text(text);
					deviced[devId][moniIndex].charttext = text;
					deviced[devId].legendData[moniIndex] = text;
					deviced[devId].series[moniIndex].name = text;
					deviced[devId].legendData[moniIndex] = text;
					deviced[devId].Chart.setOption({
						legend: {
							data: deviced[devId].legendData
						},
						series: deviced[devId].series
					});
				}
			}
		});
	});
}