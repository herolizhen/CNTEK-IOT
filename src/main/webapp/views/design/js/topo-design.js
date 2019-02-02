var pandleft = null; //添加控件与左边距离
var pandtop = null; //添加控件与顶部距离
var groupFlag = false; //是否添加过分组面板标识
var falg = false; //是否拖动控件名称的标识
var devId = ''; //新添控件的ID
var count = 0; //添加的控件个数
var deviced = {}; //存储所有控件的所有属性
var type = {}; //按钮类型
var dialogCount = 0; //
var markerID = null; //标记点ID号
var browersLng = null; //浏览器所在位置经度
var browersLat = null; //浏览器所在位置纬度
var city = null; //定位所在城市
var mapinitflag = false; //是否初始化百度地图
//video视频相关
var Sys = {},
	ua = navigator.userAgent.toLowerCase();
var gdomready = 0;
var curLang = "SimpChinese"; //当前语言，中文简体
var match = /(msie\s|trident.*rv:)([\w.]+)/.exec(ua);
if (match != null) {
	Sys.ie = 'ie';
}

//ctrl按键多选处理 edit by lizhen
var flag_select_mutl = false; //复选标志
var flag_keyCtrl_down = false; //是否按下ctrl按键
var flag_select_count = 0; //是否按下ctrl按键
var flag_drag_flag = false;
var first_select_devId = ''; //多选模式下第一次算中的设备的Id。

//图表控件全局变量
//var moniCount = 0;//哪个图表控件，添加的监测点个数
//var moniIndex = null;//点击的是哪个图表控件的哪个监测点
//var Xdata = [];//哪个图表控件的坐标轴

function dclick(index) {
	var html = null;
	devId = 'dev_' + count;
	var zIn = 800 + count;
	html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:102px;height:132px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%; background:url(../views/design/images/' + index + '.png) no-repeat;background-size:contain;"></div></div>';
	if (index == 8) { //开关量
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:102px;height:132px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%; background:url(../views/design/images/' + index + '.png) no-repeat;background-size:contain;"><p id="p' + devId + 'img" style="width:100%;font-size:14px;color:#333;"></p></div></div>';
	} else if (index == 14) { //表盘
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:200px;height:200px;padding:2px;border-radius:50%;border:1px solid #ccc;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:200px;height:200px;border-radius:50%;"></div><span></span></div>';
	} else if (index == 11) { //控制按钮
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:60px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><button id="' + devId + 'img" style="width:100%;height:100%; background:url(../views/design/images/' + index + '.png) no-repeat;border-radius:10%;background-size:cover;font-size:14px;font-weight:bold;"></button></div>';
	} else if (index == 2) { //静态标签
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%; background:url(../views/design/images/' + index + '.png) no-repeat;"></div></div>';
	} else if (index == 5) { //监测点
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%;overflow:hidden;background-color:rgba(0,0,0,0);color:#333;font-size:14px;font-weight:bold;"><p id="p' + devId + 'img"style="width:100%;"><span id="' + devId + 'name">监测点</span><span id="' + devId + 'val"></span></p></div></div>';
	} else if (index == 15) { //刻度盘
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:110px;height:230px;padding:2px;border:1px solid #ccc;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%;"></div><span></span></div>';
	} else if (index == 24) { //图表控件
		html = '<div id="' + devId + '" class="dev chart" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:400px;height:300px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%;"></div></div>';
	}
	count++;
	falg = true;
	return html;
}

$(function() {
	//判断ctrl按键是否按下
	$(document).keydown(function(e) {
		if (e.ctrlKey) {
			flag_keyCtrl_down = true;
			if (!flag_drag_flag) {
				$('#contentBox').find('div').draggable({
					disabled: true
				});
				flag_drag_flag = true;
			}
			//console.log(e.ctrlKey);
		}
	}).keyup(function(e) {
		if (e.keyCode == 17) {
			flag_keyCtrl_down = false;
			if (flag_drag_flag) {
				$('#contentBox').find('.dev').draggable({
					disabled: false
				});
				flag_drag_flag = false;
			}
		}
	});

	$('.colorPicker').spectrum({
		showInput: true, //颜色值input
		showAlpha: true, //透明度选择
		showPalette: true, //左边显示选过的颜色
		clickoutFiresChange: true, //点击色盘外部可选中颜色
		showInitial: true, //当前值与选中值对比
		chooseText: "应用",
		cancelText: "取消"
	});
	//设置属性框的宽度
	$('.i_attrName').next().css({
		width: '185px'
	});

	deviced.bg = {
		x: 0,
		y: 0,
		w: parseInt($('#resizeBox').width()),
		h: parseInt($('#resizeBox').height()),
		controlType: '背景',
		devIndex: 'bg',
		borderWidth: '1',
		borderColor: '#cccccc',
		bgColor: '#ffffff',
		bgImg: '',
		showmode: 'normal',
		scroll: 'hidden'
	};
	$('#resizeBox').click(function() {
		var rBox = $(this).get(0);
		$('.mapDrag').hide();
		$('#contentBox').find('div').css({
			outline: 'none'
		});
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (deviced[devAttr.eq(i).attr('id')].shape == 'circle') {
				devAttr.eq(i).css({
					borderRadius: '50%'
				});
			}
			//fix bug by lizhen 20181123
			deviced[devAttr.eq(i).attr('id')].outlineStyle = 'none';
		}

		$(this).css({
			outline: '2px dotted red'
		});

		deviced.bg.w = parseInt(rBox.scrollWidth);
		deviced.bg.h = parseInt(rBox.scrollHeight);

		deviced.bg.width = parseInt($('#resizeBox').width());
		deviced.bg.height = parseInt($('#resizeBox').height());

		$(this).resizable({
			disabled: false,
			handles: 'e,s,se',
			minWidth: 200,
			minHeight: 200,
			maxWidth: 1000,
			maxHeight: 1000,
			edge: 10,
			onStopResize: function(e) {}
		});

		$("#selele").find("[data-Id='bg']").attr('selected', 'selected').siblings().removeAttr('selected');
		var title = $("#selele").find("[data-Id='bg']").text();
		$('#eastBox').panel('setTitle', '属性[' + title + ']');
		$('#t_property').find('tr').hide();
		$('.static').show();
		$('#tr_shuju').hide();
		$('#tr_i_padding').hide();
		$('#tr_i_bj').show();
		$('#tr_i_bjcolor').show();
		$('#tr_i_showmode').show();
		$('#tr_i_scroll').show();

		for (var i in deviced.bg) {
			$('[name="' + i + '"]').val(deviced.bg[i]);
		}
		//多选处理 by lizhen
		flag_select_mutl = false;
		flag_select_count = 0;
		$('#resizeBox').find('.div').draggable({
			disabled: false
		});
		//清除设备选中标志
		first_select_devId = '';
		//end 20181123
	});
	$('#i_scroll').change(function() {
		deviced.bg.scroll = $(this).val();
		$('#resizeBox').css({
			overflow: deviced.bg.scroll
		});
	});
	$('#resizeBox').trigger('click');
	$('#resizeBox').draggable({
		disabled: true
	});
	$('#contentBox').draggable({
		disabled: true
	});
	$('#resizeBox').droppable({
		accept: '#controlNameBox > li',
		onDrop: function(e, source) { //放置完成时触发
			$('.proxy').remove();
			var title = $('.tabs-selected').text();
			if (title == "预览") {
				return false;
			}
			var target = e.target || e.srcElement;
			var index = $(source).attr('data-cIndex');
			var pandHtml = dclick(index);
			setTimeout(function() {
				if (groupFlag) {
					var gB = $('[data-group="group"]');
					var gflag = false;
					for (var i = 0; i < gB.length; i++) {
						var gBleft = gB.eq(i).offset().left;
						var gBtop = gB.eq(i).offset().top;
						var gbWidth = gB.eq(i).width();
						var gbHeight = gB.eq(i).height();
						if (gBleft < pandleft && gBtop < pandtop && (gBleft + gbWidth) > pandleft && (gBtop + gbHeight) > pandtop) {
							var $target = $('#' + gB.eq(i).attr('id') + 'img');
							var left = pandleft - gBleft;
							var top = pandtop - gBtop;
							gflag = true;
						}
					}
					if (gflag) {
						createDev($target, left, top, pandHtml, 'groupBox');
					} else {
						var $target = $(target);
						var left = pandleft - $('#resizeBox').offset().left;
						var top = pandtop - $('#resizeBox').offset().top;
						createDev($target, left, top, pandHtml);
					}
				} else {
					var $target = $(target);
					var left = pandleft - $('#resizeBox').offset().left;
					var top = pandtop - $('#resizeBox').offset().top;
					createDev($target, left, top, pandHtml);
				}
			}, 100);
		}
	});
	$('#controlNameBox > li').draggable({
		cursor: "pointer",
		revert: true,
		deltaX: 0,
		deltaY: 0,
		proxy: function(source) { //代理，clone
			var n = $('<div class="proxy"style="border:1px solid #ccc;padding-left:15px;padding-right:10px;"></div>');
			n.html('<p style="position:relative;z-index:9999;">' + $(source).text() + '</p>').appendTo('body');
			return n;
		},
		onStopDrag: function(e) { //拖拽完成时触发
			pandleft = e.clientX;
			pandtop = e.clientY;
		}
	});

	function createDev($target, left, top, html, DevFlag) {
		if (falg) {
			falg = false;
			$target.append(html);
			$('#' + devId).css({
				position: 'absolute',
				left: left,
				top: top
			});
			var menuIndex = $('#' + devId).attr('data-index');
			var menuText = $('[id="a_' + menuIndex + '"]').text();

			$('#selele').append('<option data-Id="' + devId + '"value="' + menuIndex + '">' + menuText + '</option>');
	console.log('-----------------------------------:' + devId);
			deviced[devId] = {
				x: parseInt(left),
				y: parseInt(top),
				w: parseInt($('#' + devId).width()),
				h: parseInt($('#' + devId).height()),
				controlType: menuText,
				devIndex: menuIndex,
				borderWidth: '1',
				borderColor: '#cccccc',
				padding: '2',
				devname: '',
				normalImg: '../views/design/images/' + menuIndex + '.png',
				mename: $('[data-Id=' + devId + ']').val(),
				devlevel: '',
				zIndex: $('#' + devId).css('zIndex'),
				devFlag: DevFlag,
				appendTarget: $target.parent().attr('id'),
				outlineStyle: 'none',
			};
			//console.log(JSON.stringify(deviced[devId]));

			if (deviced[devId].devIndex == 8) {
				//开关图片属性
				deviced[devId].bgColor = "rgba(0,0,0,0)";
				deviced[devId].albgColor = "rgba(0,0,0,0)";
				deviced[devId].dopenvalue = "0";
				deviced[devId].dclosevalue = "1";
				deviced[devId].openImgurl = "../views/design/images/1.png";
				deviced[devId].closeImgurl = "../views/design/images/8.png";
				deviced[devId].devtype = 'Switch';
				deviced[devId].alarmValue = '1';
				deviced[devId].fontWeight = 'bold';
				deviced[devId].fontColor = "#333333";
				deviced[devId].fontSize = '14';
				deviced[devId].fontFamily = 'Arial';
				deviced[devId].devnameShowMode = '0';
				deviced[devId].openText = '打开';
				deviced[devId].closeText = '关闭';
				deviced[devId].inverse = "0";
				//器件类型初始化
				saveType();

			} else if (deviced[devId].devIndex == 14) {
				//仪表盘属性
				deviced[devId].bgColor = "rgba(0,0,0,0)";
				deviced[devId].albgColor = "rgba(0,0,0,0)";
				deviced[devId].dmaxvalue = "100";
				deviced[devId].dminvalue = "0";
				deviced[devId].showindex = "1";
				deviced[devId].panelStyle = "电压(V)";
				deviced[devId].panelColor = '#ffffff';
				deviced[devId].lineStyle = [
					[0.2, '#fc1'],
					[0.8, '#48b'],
					[1, '#f00']
				];
				deviced[devId].Angleflag = false;
				deviced[devId].alarmMinValue = 0;
				deviced[devId].alarmMaxValue = 100;
				deviced[devId].shape = "circle";
				setGauge(devId);
			} else if (deviced[devId].devIndex == 11) {
				//控制按钮
				deviced[devId].btnStyle = 'pic';
				deviced[devId].openImgurl = "../views/design/images/11.png";
				deviced[devId].closeImgurl = "../views/design/images/c11.png";
				deviced[devId].bgColor = "#c1c1c1";
				deviced[devId].albgColor = "#c1c1c1";
				deviced[devId].openText = "";
				deviced[devId].closeText = "";
				deviced[devId].shape = 'rectangle';
				deviced[devId].confirm = "no";
				deviced[devId].btnType = 'general';
				deviced[devId].state = false; //当前状态
				deviced[devId].bgImg = "../views/design/images/btn.png";
				deviced[devId].fontColor = "#333333";
				deviced[devId].fontSize = "14";
				deviced[devId].fontFamily = "Arial";
				deviced[devId].fontWeight = "bold";
			} else if (deviced[devId].devIndex == 2) { //静态标签
				deviced[devId].bgImg = '../views/design/images/2.png';
				deviced[devId].tagtype = "pic";
				deviced[devId].linkorgid = "";
			} else if (deviced[devId].devIndex == 5) { //监测点信息
				deviced[devId].bgColor = "rgba(0,0,0,0)";
				deviced[devId].fontWeight = 'bold';
				deviced[devId].fontColor = "#333333";
				deviced[devId].fontSize = '14';
				deviced[devId].fontFamily = 'Arial';
				deviced[devId].textAlign = '4';
				deviced[devId].moniShowMode = '0';
				deviced[devId].devname = "监测点";

			} else if (deviced[devId].devIndex == 15) { //刻度盘
				deviced[devId].bgColor = "rgba(0,0,0,0)";
				deviced[devId].albgColor = "rgba(0,0,0,0)";
				deviced[devId].dmaxvalue = "100";
				deviced[devId].dminvalue = "0";
				deviced[devId].panelName = "温度";
				deviced[devId].Unit = "℃";
				deviced[devId].alarmMinValue = 0;
				deviced[devId].alarmMaxValue = 100;
				deviced[devId].lineValue = 4;
				deviced[devId].panelColor = 'rgb(3,3,195)';
				deviced[devId].alpanelColor = 'rgb(195,3,3)';
				deviced[devId].fontColor = "#333";
				deviced[devId].markFont = 'mark';

				deviced[devId].dial = new canvasPanel();
				deviced[devId].dial.init(devId + 'img');

			} else if (deviced[devId].devIndex == 24) { //图表
				deviced[devId].titleText = '实时曲线';
				deviced[devId].chartType = 'line';
				deviced[devId].chartSplit = 10;
				deviced[devId].moniIndex = null; //点击的是哪个图表控件的哪个监测点
				deviced[devId].moniCount = 0; //哪个图表控件，添加的监测点个数
				deviced[devId].Xdata = []; //哪个图表控件的坐标轴
				deviced[devId].legendData = [];
				deviced[devId].series = [];
				deviced[devId].seriesData = [];
				deviced[devId].data = [];
				MyLineChartInit(devId);
			}

			$('#' + devId).draggable({
				handle: '#' + devId + 'img',
				onStopDrag: function(e) {
					var zoneId = $(this).attr('id');
					if (deviced[zoneId].devFlag == 'groupBox') {
						var zoneBox = $(this).parent().parent();
						var zoneLeft = zoneBox.position().left;
						var zoneTop = zoneBox.position().top;
						var zoneBoxWidth = zoneBox.width();
						var zoneBoxHeight = zoneBox.height();
						var devLeft = $(this).position().left;
						var devTop = $(this).position().top;
						var devWidth = -$(this).width();
						var devHeight = -$(this).height();

						if (zoneBoxHeight < (devLeft + 2) || zoneBoxWidth < (devTop + 2) || devLeft < devWidth || devTop < devHeight) {
							deviced[zoneId].devFlag = "";
							$('#resizeBox').append($(this));
							$(this).css({
								left: (zoneLeft + devLeft) + 'px',
								top: (zoneTop + devTop) + 'px'
							});
						}
					}


					deviced[zoneId].x = parseInt($(this).position().left);
					deviced[zoneId].y = parseInt($(this).position().top);
					$('#i_x').val(deviced[zoneId].x);
					$('#i_y').val(deviced[zoneId].y);
					$(this).trigger('click');

				}
			});

			$('#' + devId).click(function(e) {
				e.stopPropagation();
				var title = $('.tabs-selected').text();
				if (title == "预览") {
					return false;
				}

				//edit by lizhen 2018-11-23
				//console.log('flag_keyCtrl_down :' + flag_keyCtrl_down);
				if (flag_keyCtrl_down) {
					//增加多选处理
					var click_id = $(this).attr('id');

					//判断选中的控件类型是否一致
					if (flag_select_count >= 1 && deviced[click_id].devFlag != deviced[first_select_devId].devFlag) {
						$("#dev_south").text('选择的控件类型不一致，分组与单体不能同时选择！');
						return;
					}

					if (flag_select_count >= 1 && deviced[first_select_devId].devFlag != undefined) {
						if ($('#' + first_select_devId).parent().parent().attr('id') != $(this).parent().parent().attr('id')) {
							$("#dev_south").text('选择的控件不在同一个分组中！');
							return;
						}
					}

					//选中效果处理
					deviced.bg.outlineStyle = 'none';
					$('#resizeBox').css({
						outline: 'none'
					});
					if (deviced[click_id].outlineStyle != 'none') {
						if (deviced[click_id].shape == 'cricle') {
							$(this).css({
								borderRadius: '50%'
							});
						} else {
							$(this).css({
								outline: 'none'
							});
						}
						deviced[click_id].outlineStyle = 'none';
						flag_select_count -= 1;
						//
					} else {
						if (deviced[click_id].shape == 'cricle') {
							$(this).css({
								borderRadius: 0
							});
						}
						$(this).css({
							outline: '2px dotted red'
						});
						deviced[click_id].outlineStyle = "2px dotted red";
						flag_select_count += 1;
					}

					//console.log('flag_select_count:'+flag_select_count);

					if (flag_select_count == 1) { //选中的第一个对象
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
						var devIndex = $(this).attr('data-index');
						property_change(devIndex, click_id);
					} else {
						//多个控件处理,控件类型相同
						//*****对选中的控件进行循环处理判断选中的设备是否是同一类型
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
					first_select_devId = $(this).attr('id');
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

					$(this).css({
						outline: '2px dotted red'
					});

					//选中后，拖动判断处理
					if ($(this).css('outline-style') != 'none') {
						//当点击的不是分组面板里面的元素时，允许当前点击的元素进行拖动
						$('#resizeBox').draggable({
							disabled: true
						});
						$('#contentBox').draggable({
							disabled: true
						});
						$(this).draggable({
							disabled: false
						});

						if (deviced[$(this).attr('id')].shape == 'circle') {
							$(this).css({
								borderRadius: 0
							});
							CircleResizable($(this).attr('id'));

						} else {
							RectResizable($(this).attr('id'));
						}
					} else {
						return false;
					}
					var dataId = $(this).attr('id');
					deviced[dataId].outlineStyle = "2px dotted red";
					$("#selele").find("[data-Id='" + dataId + "']").attr('selected', 'selected').siblings().removeAttr('selected');
					var title = $("#selele").find("[data-Id='" + dataId + "']").text();
					$('#eastBox').panel('setTitle', '属性[' + title + ']');
					//select 器件类型中火狐对selected的解析不一样，导致出现错误。但不报错，网上搜索的解决方案在select中添加属性autocomplete="off"，但添加后未能解决问题

					var devIndex = $(this).attr('data-index');
					//edit by lizhen 20181126  代码梳理
					property_change(devIndex, dataId);
					for (var i in deviced[dataId]) {
						$('[name="' + i + '"]').val(deviced[dataId][i]);
						if ($('[name="' + i + '"]').is('.colorPicker')) {
							$('[name="' + i + '"]').spectrum('set', deviced[dataId][i]);
						}
					}
					if (deviced[dataId].devIndex == 8) {
						if (deviced[dataId].inverse == '1') {
							$('#i_inverse').prop("checked", true);
						} else if (deviced[dataId].inverse == '0') {
							$('#i_inverse').prop('checked', false);
						}
					}
				}
			});

			$('#' + devId).trigger('click');
		}
	}

	//布局
	$('#i_x').blur(function() {

		var x = $(this).val();
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.x = 0;
			$(this).val('0');
		} else {
			var devArr = $('.dev');
			for (var i = 0; i < devArr.length; i++) {
				if (devArr.eq(i).css('outline-style') !== 'none') {
					devArr.eq(i).css({
						left: (x + 'px')
					});
					deviced[devArr.eq(i).attr('id')].x = parseInt(x);
				}
			}
		}
	});
	$('#i_y').blur(function() {
		var y = parseInt($(this).val());
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.y = 0;
			$(this).val('0');
		} else {
			var devArr = $('.dev');
			for (var i = 0; i < devArr.length; i++) {
				if (devArr.eq(i).css('outline-style') !== 'none') {
					devArr.eq(i).css({
						top: (y + 'px')
					});
					deviced[devArr.eq(i).attr('id')].y = parseInt(y);
				}
			}
		}
	});
	$('#i_w').blur(function() {
		var w = parseInt($(this).val());
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.w = w;
			$('#resizeBox').css({
				width: w + 'px'
			});
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					width: (w + 'px')
				});
				deviced[devArr.eq(i).attr('id')].w = w;

				if (deviced[devArr.eq(i).attr('id')].devIndex == 14) {
					$('#i_h').val(w);
					devArr.eq(i).css({
						height: (w + 'px')
					});

					var resId = devArr.eq(i).attr('id');
					$('#' + resId + 'img').css({
						width: '100%',
						height: '100%'
					});

					deviced[resId].h = w;
					var ram = deviced[resId].option.series[0];
					if (w < 150) {

						ram.axisTick.length = 6;
						ram.axisLine.lineStyle.width = 5;
						ram.splitLine.length = 10;
						ram.detail.textStyle.fontSize = 15;
						ram.title.textStyle.fontSize = 8;

					} else if (w > 250) {
						ram.axisTick.length = 16;
						ram.axisLine.lineStyle.width = 12;
						ram.splitLine.length = 20;
						ram.detail.textStyle.fontSize = 26;
						ram.title.textStyle.fontSize = 26;

					} else {
						ram.axisTick.length = 10;
						ram.axisLine.lineStyle.width = 8;
						ram.splitLine.length = 15;
						ram.detail.textStyle.fontSize = 20;
						ram.title.textStyle.fontSize = 20;
					}
					deviced[resId].Chart = echarts.init(document.getElementById(resId + 'img'));
					deviced[resId].Chart.setOption(deviced[resId].option, true);
				} else if (deviced[devArr.eq(i).attr('id')].devIndex == 15) {
					deviced[devArr.eq(i).attr('id')].dial.init(devArr.eq(i).attr('id') + 'img');
				}
			}
		}
	});
	$('#i_h').blur(function() {
		var h = parseInt($(this).val());
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.h = h;
			$('#resizeBox').css({
				height: h + 'px'
			});
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					height: (h + 'px')
				});
				deviced[devArr.eq(i).attr('id')].h = h;
				if (deviced[devArr.eq(i).attr('id')].devIndex == 14) {
					$('#i_w').val(h);
					devArr.eq(i).css({
						width: (h + 'px')
					});
					//随着外框的扩大，绘制区域也需放大
					var resId = devArr.eq(i).attr('id');
					$('#' + resId + 'img').css({
						width: '100%',
						height: '100%'
					});

					deviced[resId].w = h;
					var ram = deviced[resId].option.series[0];
					if (h < 150) {

						ram.axisTick.length = 6;
						ram.axisLine.lineStyle.width = 5;
						ram.splitLine.length = 10;
						ram.detail.textStyle.fontSize = 15;
						ram.title.textStyle.fontSize = 8;

					} else if (h > 250) {
						ram.axisTick.length = 16;
						ram.axisLine.lineStyle.width = 12;
						ram.splitLine.length = 20;
						ram.detail.textStyle.fontSize = 26;
						ram.title.textStyle.fontSize = 26;

					} else {
						ram.axisTick.length = 10;
						ram.axisLine.lineStyle.width = 8;
						ram.splitLine.length = 15;
						ram.detail.textStyle.fontSize = 20;
						ram.title.textStyle.fontSize = 20;
					}
					deviced[resId].Chart = echarts.init(document.getElementById(resId + 'img'));
					deviced[resId].Chart.setOption(deviced[resId].option, true);
				} else if (deviced[devArr.eq(i).attr('id')].devIndex == 15) {
					deviced[devArr.eq(i).attr('id')].dial.init(devArr.eq(i).attr('id') + 'img');
				}
			}
		}
	});

	//边框设置
	$('#i_borderwidth').blur(function() {
		var borderWidth = $(this).val();
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.borderWidth = parseInt(borderWidth);
			$('#resizeBox').css({
				borderWidth: (borderWidth + 'px')
			});
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					borderWidth: (borderWidth + 'px')
				});
				devArr.eq(i).attr('data-bfalg', 'true');
				deviced[devArr.eq(i).attr('id')].borderWidth = parseInt(borderWidth);
			}
		}
	});

	$("#i_bordercolor").on('hide.spectrum', function(e, tinycolor) {
		var color = $('#i_bordercolor').spectrum('get');
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.borderColor = color;
			$('#resizeBox').css({
				borderColor: color
			});
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					borderColor: color
				});
				devArr.eq(i).attr('data-bfalg', 'true');
				deviced[devArr.eq(i).attr('id')].borderColor = color;
			}
		}
	});

	//边距设置
	$('#i_padding').blur(function() {
		var padd = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				devArr.eq(i).css({
					padding: padd + 'px'
				});
				deviced[devArr.eq(i).attr('id')].padding = parseInt(padd);
			}
		}
	});
	//测量数据名称
	$('#i_panelName').blur(function() {
		var panelName = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].panelName = panelName;
			}
		}
	});
	//单位
	$('#i_Unit').blur(function() {
		var Unit = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].Unit = Unit;
				deviced[devArr.eq(i).attr('id')].dial.danwei = Unit;
				deviced[devArr.eq(i).attr('id')].dial.init(devArr.eq(i).attr('id') + 'img');
			}
		}
	});
	//分段样式
	$('#i_lineStyle').blur(function() {
		//输入数据时，需使用英文状态下的逗号隔开
		var str = $(this).val();
		var arr = str.split(','); //把字符串转成数组
		//把数组按2个一组重新组成一个二维数组
		var b = [];
		var lineStyle = [];
		var k = 0;
		for (var i = 0; i < arr.length; ++i) {
			if (i % 2 == 0) {
				b = [];
				for (var j = 0; j < 2; ++j) {
					if (arr[i + j] == undefined) {
						continue;
					} else {
						b[j] = arr[i + j];
					}
				}
				lineStyle[k] = b;
				k++;
			}
		}

		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].lineStyle = lineStyle;
				deviced[devArr.eq(i).attr('id')].option.series[0].axisLine.lineStyle.color = lineStyle;
				var chart = echarts.init(document.getElementById(devArr.eq(i).attr('id') + 'img'));
				chart.setOption(deviced[devArr.eq(i).attr('id')].option, true); //重新初始化并绘制,出现报错getColor 找不到时，解决办法表盘需要重新初始化之后再配置数据
			}
		}
	});
	//分段
	$('#i_lineValue').blur(function() {
		var value = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].lineValue = parseInt(value);
				deviced[devArr.eq(i).attr('id')].dial.splitNum = parseInt(value);
				deviced[devArr.eq(i).attr('id')].dial.init(devArr.eq(i).attr('id') + 'img');
			}
		}
	});

	//表盘类型，例电压，电流，温度，湿度等
	$('#i_panelStyle').blur(function() {
		var str = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].panelStyle = str;
				if (deviced[devArr.eq(i).attr('id')].devIndex == 14) {
					deviced[devArr.eq(i).attr('id')].option.series[0].data[0].name = str;
					deviced[devArr.eq(i).attr('id')].Chart.setOption(deviced[devArr.eq(i).attr('id')].option, true);
				}
			}
		}

	});
	//表盘样式，开口起始点，及结束点的设置
	$('#panAngle').change(function() {
		var str = $(this).val();
		var arr = str.split(',');

		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].Angleflag = true;
				var ram = deviced[devArr.eq(i).attr('id')].option.series[0];

				deviced[devArr.eq(i).attr('id')].option.series[0].startAngle = Number(arr[0]);
				deviced[devArr.eq(i).attr('id')].option.series[0].endAngle = Number(arr[1]);
				var width = deviced[devArr.eq(i).attr('id')].w;
				switch (arr[0]) {
					case '240':
						ram.detail.offsetCenter = [0, '40%'];
						break;
					case '150':
						ram.detail.offsetCenter = ['-60%', 0];
						break;
					case '360':
						ram.detail.offsetCenter = [0, '40%'];
						break;
					case '180':
						ram.detail.offsetCenter = [0, '40%'];
						break;
					case '330':
						ram.detail.offsetCenter = ['60%', 0];
						break;
				}
				var chart = echarts.init(document.getElementById(devArr.eq(i).attr('id') + 'img'));
				chart.setOption(deviced[devArr.eq(i).attr('id')].option, true);
			}
		}
	});
	//表盘背景色
	$('#i_panelColor').on('hide.spectrum', function(e, tinycolor) {
		var color = $('#i_panelColor').spectrum('get').toHexString();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				var resId = devArr.eq(i).attr('id');
				deviced[resId].panelColor = color;
				if (deviced[resId].devIndex == 14) {
					deviced[resId].option.backgroundColor = color;
					deviced[resId].Chart = echarts.init(document.getElementById(resId + 'img'));
					deviced[resId].Chart.setOption(deviced[resId].option, true);
				} else if (deviced[resId].devIndex == 15) {
					deviced[resId].dial.bgColor = color;
					deviced[resId].dial.init(resId + 'img');
				}
			}
		}
	});
	//刻度表告警颜色
	$('#i_alpanelColor').on('hide.spectrum', function(e, tinycolor) {
		var color = $('#i_alpanelColor').spectrum('get').toHexString();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				var resId = devArr.eq(i).attr('id');
				deviced[resId].alpanelColor = color;
			}
		}
	});

	//选择监测点
	$('#i_deviceid').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});
	//门状态点
	$('#i_DoorState').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});
	//门打开控制点
	$('#i_OpenDoorState').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});
	//读头
	$('#i_CardReader').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});

	//开关文本监测点信息显示模式设置
	$('#i_devnameShowMode').change(function() {
		var devnameShowMode = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				var upId = devArr.eq(i).attr('id');
				deviced[upId].devnameShowMode = devnameShowMode;
				var txt = textShowMode(upId);
				$('#p' + upId + 'img').text(txt);
				textAlign(upId);
			}
		}
	});
	//监测点信息控件文本显示模式设置
	$('#i_moniShowMode').change(function() {
		var ShowMode = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				var upId = devArr.eq(i).attr('id');
				deviced[upId].moniShowMode = ShowMode;
				switch (ShowMode) {
					case '0':
						break;
					case '1':
						deviced[upId].tagtext = '监测点值';
						deviced[upId].albgColor = "rgba(0,0,0,0)";
						deviced[upId].alarmMaxValue = '100';
						deviced[upId].alarmMinValue = '0';
						deviced[upId].alarmMode = "1";
						break;
					case '2':
						deviced[upId].tagtext = '监测点值';
						deviced[upId].albgColor = "rgba(0,0,0,0)";
						deviced[upId].alarmMaxValue = '100';
						deviced[upId].alarmMinValue = '0';
						deviced[upId].alarmMode = "0";
						break;
				}
				var txt = moniShowMode(upId);
				textAlign(upId);
				devArr.eq(i).trigger('click');
			}
		}
	});
	//告警显示模式
	$('#i_alarmMode').change(function() {
		var alarmMode = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].alarmMode = alarmMode;
			}
		}
	});

	//告警值设置
	$('#i_alarmshowvalue').change(function() {
		var alarmValue = $(this).val();

		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].alarmValue = alarmValue;
			}
		}
	});
	//开关图片是否反选
	$('#i_inverse').change(function() {
		var isCheck = $(this).is(':checked');
		if (isCheck) {
			$(this).val('1');

		} else {
			$(this).val('0');
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				var nowId = devArr.eq(i).attr('id');
				deviced[nowId].inverse = $(this).val();
				var OldImgUrl = deviced[nowId].openImgurl;
				deviced[nowId].openImgurl = deviced[nowId].closeImgurl;
				deviced[nowId].closeImgurl = OldImgUrl;
				$('#' + nowId + 'img').css({
					backgroundImage: "url(" + deviced[nowId].openImgurl + ")"
				});
			}
		}
	});
	//仪表盘告警上下限设置
	$('#i_alarmMinValue').blur(function() {
		var aMinVal = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].alarmMinValue = aMinVal;
			}
		}
	});
	$('#i_alarmMaxValue').blur(function() {
		var aMaxVal = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].alarmMaxValue = aMaxVal;
			}
		}
	});

	//正常背景色
	$('#i_bjcolor').on('hide.spectrum', function(e, tinycolor) {
		var normalColor = $('#i_bjcolor').spectrum('get');
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.bgColor = normalColor;
			$('#resizeBox').css({
				backgroundColor: normalColor
			});
			return false;
		}
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				if (deviced[devArr.eq(i).attr('id')].devIndex == 8 || deviced[devArr.eq(i).attr('id')].devIndex == 14 || deviced[devArr.eq(i).attr('id')].devIndex == 23) {
					devArr.eq(i).css({
						background: normalColor
					});
				} else {
					var upId = devArr.eq(i).attr('id') + 'img';
					$('#' + upId).css({
						backgroundColor: normalColor
					});
				}
				deviced[devArr.eq(i).attr('id')].bgColor = normalColor;
			}
		}
	});

	//告警背景色
	$('#i_alarmbjcolor').on('hide.spectrum', function(e, tinycolor) {
		var alarmColor = $('#i_alarmbjcolor').spectrum('get');
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				// devArr.eq(i).css({backgroundColor:alarmColor});
				deviced[devArr.eq(i).attr('id')].albgColor = alarmColor;
			}
		}
	});


	//值为0时的图片，图片上传
	$('#i_dopenimgurl').focus(function() {
		fileDialog('subFile', 'i_dopenimgurl');
	});

	//值为1时的图片，图片上传
	$('#i_dcloseimgurl').focus(function() {
		fileDialog('subFile', 'i_dcloseimgurl');
	});


	//背景图片，图片上传
	$('#i_bj').focus(function() {
		fileDialog('subFile', 'i_bj');
	});

	//保存数据
	$('#saveAttr').click(function() {
		var data = deviced;
		for (var i in data) {
			if (data[i].devIndex == 14 && data[i].Chart != '') {
				data[i].Chart = '';
			}
			if (data[i].devIndex == 24) {
				data[i].Chart = '';
				//data[i].Xdata = [];
				//data[i].series = [];
			}
		}

		//console.log(JSON.stringify(data));

		$.ajax({
			url: "topoSave?topoId=" + topoId,
			data: JSON.stringify(data),
			type: 'POST',
			contentType: "application/json;charset=UTF-8",
			async: false,
			error: function(request) {
				$.messager.alert('提示', "ajax 连接服务器有误");
			},
			success: function(data) {
				$.messager.alert('提示', '数据保存成功！');
			}
		});
	});

	//删除组件
	$('#deleAttr').click(function() {
		var delId = $("#selele").find("option:selected").attr('data-Id');
		$('#' + delId).remove();
		$("#selele").find("option:selected").remove();
		delete deviced[delId];
		$('#eastBox').panel('setTitle', '属性[背景]');
	});
	//打开值
	/*$('#i_dopenvalue').blur(function(){
		var dopenvalue = $(this).val();
		var devArr= $('.dev');
		for(var i=0;i<devArr.length;i++){
			if(devArr.eq(i).css('outline-style')!=='none'){
				deviced[devArr.eq(i).attr('id')].dopenvalue=dopenvalue;
			}
		}
	});*/
	//门打开值
	$('#i_OpenStateValue').change(function() {
		var openValue = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].openValue = openValue;
			}
		}
	});
	//量程设置
	$('#i_dmaxvalue').blur(function() {
		var dmaxvalue = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {

				deviced[devAttr.eq(i).attr('id')].dmaxvalue = Number(dmaxvalue);
				if (deviced[devAttr.eq(i).attr('id')].devIndex == 14) {
					deviced[devAttr.eq(i).attr('id')].option.series[0].max = Number(dmaxvalue);
					deviced[devAttr.eq(i).attr('id')].option.series[0].data[0].value = (deviced[devAttr.eq(i).attr('id')].option.series[0].max + deviced[devAttr.eq(i).attr('id')].option.series[0].min) * 0.5; //使指针始终保持指向指向中间

					deviced[devAttr.eq(i).attr('id')].Chart.setOption(deviced[devAttr.eq(i).attr('id')].option, true);
				} else if (deviced[devAttr.eq(i).attr('id')].devIndex == 15) {
					deviced[devAttr.eq(i).attr('id')].dial.MaxNum = Number(dmaxvalue);
					deviced[devAttr.eq(i).attr('id')].dial.init(devAttr.eq(i).attr('id') + 'img');
				}
			}
		}

	});

	$('#i_dminvalue').blur(function() {
		var dminvalue = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].dminvalue = Number(dminvalue);
				if (deviced[devAttr.eq(i).attr('id')].devIndex == 14) {
					deviced[devAttr.eq(i).attr('id')].option.series[0].min = Number(dminvalue);

					deviced[devAttr.eq(i).attr('id')].option.series[0].data[0].value = (deviced[devAttr.eq(i).attr('id')].option.series[0].max + deviced[devAttr.eq(i).attr('id')].option.series[0].min) * 0.5; //使指针始终保持指向指向中间

					deviced[devAttr.eq(i).attr('id')].Chart.setOption(deviced[devAttr.eq(i).attr('id')].option, true);
				} else if (deviced[devAttr.eq(i).attr('id')].devIndex == 15) {
					deviced[devAttr.eq(i).attr('id')].dial.MinNum = Number(dminvalue);
					deviced[devAttr.eq(i).attr('id')].dial.init(devAttr.eq(i).attr('id') + 'img');
				}

			}
		}
	});

	//标签类型
	$('#i_tagtype').change(function() {
		var tagtype = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var tagId = devAttr.eq(i).attr('id');
				deviced[tagId].tagtype = tagtype;
				devAttr.eq(i).css({
					width: '100px',
					height: '30px'
				});
				deviced[tagId].w = '100';
				deviced[tagId].h = '30';
				if ($('#p' + tagId + 'img').length > 0) {
					$('#p' + tagId + 'img').remove();
				}

				if (tagtype == 'pic') {
					deviced[tagId].bgImg = '../views/design/images/2.png';
					deviced[tagId].showmode = 'normal';
					deviced[tagId].linkorgid = '0';
					deviced[tagId].linkorgidstatus = '0';
					$('#' + tagId + 'img').css({
						background: "url(" + deviced[tagId].bgImg + ") no-repeat"
					}).text('');

				} else if (tagtype == 'text') {
					deviced[tagId].tagtext = "静态标签";
					deviced[tagId].fontWeight = 'bold';
					deviced[tagId].fontColor = "#333333";
					deviced[tagId].fontSize = '14';
					deviced[tagId].fontFamily = "Arial";
					deviced[tagId].bgColor = "rgba(0,0,0,0)";
					deviced[tagId].textAlign = '4';
					deviced[tagId].showmode = '';
					deviced[tagId].bgImg = '';

					$('#' + tagId + 'img').text('').css({
						background: 'none',
						backgroundColor: deviced[tagId].bgColor
					});

					$('#' + tagId + 'img').append('<p id="p' + tagId + 'img"style="width:100%;color:#333;font-size:14px;font-weight:bold;">' + deviced[tagId].tagtext + '</p>');

				} else if (tagtype == 'group') {

					deviced[tagId].bgImg = '../views/design/images/2.png';
					deviced[tagId].showmode = 'normal';
					deviced[tagId].linkorgid = '0';
					deviced[tagId].linkorgidstatus = '0';
					deviced[tagId].tagtext = "静态标签";
					deviced[tagId].fontWeight = 'bold';
					deviced[tagId].fontColor = "#333333";
					deviced[tagId].fontSize = '14';
					deviced[tagId].fontFamily = 'Arial';
					deviced[tagId].textAlign = '4';

					$('#' + tagId + 'img').text('').css({
						background: "url(" + deviced[tagId].bgImg + ") no-repeat"
					});
					$('#' + tagId + 'img').append('<p id="p' + tagId + 'img"style="width:100%;font-size:14px;font-weight:bold;">' + deviced[tagId].tagtext + '</p>');
				}
				$('#' + tagId).trigger('click');
			}
		}
	});

	//图片显示模式
	$('#i_showmode').change(function() {
		var showmode = $(this).val();
		if ($('#resizeBox').css('outline-style') !== 'none') {
			deviced.bg.showmode = showmode;
			switch (showmode) {
				case 'normal':
					$('#resizeBox').css({
						background: "url(" + deviced.bg.bgImg + ") no-repeat",
						backgroundSize: 'contain',
						backgroundColor: deviced.bg.bgColor
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
						backgroundColor: deviced.bg.bgColor
					});
					break;
			}

		}
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].showmode = showmode;
				var upDataId = devAttr.eq(i).attr('id');
				switch (showmode) {
					case 'normal':
						$('#' + upDataId + 'img').css({
							background: "url(" + deviced[upDataId].bgImg + ") no-repeat",
							backgroundSize: 'contain',
							backgroundColor: deviced[upDataId].bgColor
						});
						break;
					case 'strech':
						$('#' + upDataId + 'img').css({
							background: "url(" + deviced[upDataId].bgImg + ") no-repeat",
							backgroundSize: 'cover'
						});
						break;
					case 'repeat':
						;
						$('#' + upDataId + 'img').css({
							background: "url(" + deviced[upDataId].bgImg + ") repeat"
						});
						break;
					case 'none':
						$('#' + upDataId + 'img').css({
							background: "none",
							backgroundColor: deviced[upDataId].bgColor
						});
						break;
				}
			}
		}
	});

	//开关量器件类型
	$('#i_devtype').change(function() {
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				chg_i_devtype(devAttr.eq(i).attr('id'));
			}
		}
	});

	//自定义器件名称
	$('#i_userDefinde').blur(function() {
		var userDefinde = $(this).val();

		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].userDefinde = userDefinde;
				// alert(deviced[devAttr.eq(i).attr('id')].userDefinde);
			}
		}
	});
	//按钮类型
	$('#i_btnType').change(function() {
		var btnType = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var btnId = devAttr.eq(i).attr('id');
				deviced[btnId].btnType = btnType;
				deviced[btnId].btnStyle = 'pic';
				deviced[btnId].shape = 'rectangle';
				devAttr.eq(i).css({
					width: '100px',
					height: '60px',
					borderRadius: '0'
				});
				$('#' + btnId + 'img').css({
					width: '100%',
					height: '100%',
					borderRadius: '10%'
				});
				if (btnType == 'general') {
					deviced[btnId].openImgurl = "../views/design/images/11.png";
					deviced[btnId].closeImgurl = "../views/design/images/c11.png";
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].openImgurl + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text('');
				} else if (btnType == 'ctrl') {
					deviced[btnId].bgImg = "../views/design/images/btn.png";
					deviced[btnId].sendValue = '0';
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].bgImg + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text('');
				} else if (btnType == 'submit') {
					deviced[btnId].bgImg = "../views/design/images/btn.png";
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].bgImg + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text('');
				}
				devAttr.eq(i).trigger('click');
			}
		}
	});

	//按钮样式
	$('#i_btnTogger').change(function() {
		var btnStyle = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var btnId = devAttr.eq(i).attr('id');
				deviced[btnId].btnStyle = btnStyle;
				if (deviced[btnId].btnType == 'general') {
					if (btnStyle == 'pic') {
						deviced[btnId].closeImgurl = '../views/design/images/c11.png';
						deviced[btnId].openImgurl = '../views/design/images/11.png';
						deviced[btnId].openText = '';
						deviced[btnId].closeText = '';
					} else if (btnStyle == 'text') {
						deviced[btnId].closeImgurl = '';
						deviced[btnId].openImgurl = '';
						deviced[btnId].openText = '打开';
						deviced[btnId].closeText = '关闭';
					} else if (btnStyle == 'group') {
						deviced[btnId].closeImgurl = '../views/design/images/c11.png';
						deviced[btnId].openImgurl = '../views/design/images/11.png';
						deviced[btnId].openText = '打开';
						deviced[btnId].closeText = '关闭';
					}
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].openImgurl + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text(deviced[btnId].openText);

				} else if (deviced[btnId].btnType == 'ctrl') {
					if (btnStyle == 'pic') {
						deviced[btnId].bgImg = '../views/design/images/btn.png';
						deviced[btnId].tagtext = '';
					} else if (btnStyle == 'text') {
						deviced[btnId].bgImg = '';
						deviced[btnId].tagtext = '打开';
					} else if (btnStyle == 'group') {
						deviced[btnId].bgImg = '../views/design/images/btn.png';
						deviced[btnId].tagtext = '打开';
					}
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].bgImg + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text(deviced[btnId].tagtext);

				} else if (deviced[btnId].btnType == 'submit') {
					if (btnStyle == 'pic') {
						deviced[btnId].bgImg = '../views/design/images/btn.png';
						deviced[btnId].tagtext = '';
					} else if (btnStyle == 'text') {
						deviced[btnId].bgImg = '';
						deviced[btnId].tagtext = '设置';
					} else if (btnStyle == 'group') {
						deviced[btnId].bgImg = '../views/design/images/btn.png';
						deviced[btnId].tagtext = '设置';
					}
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].bgImg + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text(deviced[btnId].tagtext);
				}

				if (btnStyle == "text") {
					if (deviced[btnId].shape == 'rectangle') {
						devAttr.eq(i).css({
							width: '100px',
							height: '30px',
							borderRadius: '0'
						});
						$('#' + btnId + 'img').css({
							width: '100%',
							height: '100%',
							borderRadius: '10%'
						});

					} else if (deviced[btnId].shape == 'circle') {
						devAttr.eq(i).css({
							width: '50px',
							height: '50px',
							borderRadius: '50%'
						});
						$('#' + btnId + 'img').css({
							width: '100%',
							height: '100%',
							borderRadius: '50%'
						});
					}

				} else if (btnStyle == "pic") {

					if (deviced[btnId].shape == 'rectangle') {
						devAttr.eq(i).css({
							width: '100px',
							height: '60px',
							borderRadius: '0'
						});
						$('#' + btnId + 'img').css({
							width: '100%',
							height: '100%',
							borderRadius: '10%'
						});

					} else if (deviced[btnId].shape == 'circle') {
						devAttr.eq(i).css({
							width: '50px',
							height: '50px',
							borderRadius: '50%'
						});
						$('#' + btnId + 'img').css({
							width: '100%',
							height: '100%',
							borderRadius: '50%'
						});
					}
				} else if (btnStyle == 'group') {
					if (deviced[btnId].shape == 'rectangle') {
						devAttr.eq(i).css({
							width: '100px',
							height: '60px',
							borderRadius: '0'
						});
						$('#' + btnId + 'img').css({
							width: '100%',
							height: '100%',
							borderRadius: '10%'
						});

					} else if (deviced[btnId].shape == 'circle') {
						devAttr.eq(i).css({
							width: '50px',
							height: '50px',
							borderRadius: '50%'
						});
						$('#' + btnId + 'img').css({
							width: '100%',
							height: '100%',
							borderRadius: '50%'
						});
					}
				}
				deviced[btnId].w = parseInt(devAttr.eq(i).width());
				deviced[btnId].h = parseInt(devAttr.eq(i).height());
				devAttr.eq(i).trigger('click');
			}
		}
	});

	//输出确认密码
	$('#i_confirm').change(function() {
		var confirm = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].confirm = confirm;
			}
		}
	});
	//控制按钮发送的值
	$('#i_sendValue').change(function() {
		var sendValue = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].sendValue = sendValue;
			}
		}
	});
	//显示形状，圆和矩形
	$('#i_shape').change(function() {
		var shape = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].shape = shape;
				changeShape(devAttr.eq(i).attr('id'), shape);
			}
		}
	});
	//值为0时的文本
	$('#i_dopenText').blur(function() {
		var openText = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].openText = openText;
				var imgId = devAttr.eq(i).attr('id') + 'img';
				var txt = textShowMode(devAttr.eq(i).attr('id'));

				$('#p' + imgId).text(txt);
				if (deviced[devAttr.eq(i).attr('id')].devIndex == 11) {
					$('#' + imgId).text(openText);
				}
			}
		}
	});
	//值为1时的文本
	$('#i_dcloseText').blur(function() {
		var closeText = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].closeText = closeText;
			}
		}
	});
	//输入文本
	$('#i_tagtext').blur(function() {
		var tagtext = $(this).val();
		var devArr = $('.dev');
		for (var i = 0; i < devArr.length; i++) {
			if (devArr.eq(i).css('outline-style') !== 'none') {
				deviced[devArr.eq(i).attr('id')].tagtext = tagtext;
				var pId = devArr.eq(i).attr('id');
				if (deviced[pId].devIndex == 5) {
					moniShowMode(pId);

				} else if (deviced[pId].devIndex == 8) {
					var txt = textShowMode(pId);
					$('#p' + pId + 'img').text(txt);
				} else if (deviced[pId].devIndex == 11) {
					$('#' + pId).find('button').text(tagtext);
				} else {
					var txt = tagtext;
					$('#p' + pId + 'img').text(txt);
				}
				$('#p' + pId + 'img').css({
					fontSize: deviced[pId].fontSize,
					color: deviced[pId].fontColor,
					fontWeight: deviced[pId].fontWeight,
					fontFamily: deviced[pId].fontFamily
				});

			}
		}
	});
	//刻度盘字体设置
	$('#i_markFont').change(function() {
		var markFont = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var fontId = devAttr.eq(i).attr('id');
				deviced[fontId].markFont = markFont;
				// console.log(markFont);
				if (markFont == 'mark') {

				} else if (markFont == 'measured') {

				}
			}
		}
	});
	//文本字体
	$('#i_fontFamily').change(function() {
		var fontFamily = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var fontId = devAttr.eq(i).attr('id');
				deviced[fontId].fontFamily = fontFamily;
				if (deviced[fontId].devIndex == '15') {
					if (deviced[fontId].markFont == 'mark') {
						deviced[fontId].dial.SplitfontFamily = fontFamily;
					} else if (deviced[fontId].markFont == 'measured') {
						deviced[fontId].dial.fontFamily = fontFamily;
					}
					deviced[fontId].dial.init(fontId + 'img');
				} else {
					if (deviced[fontId].devIndex == '11') {
						var imgId = fontId + 'img';
					} else {
						var imgId = 'p' + fontId + 'img';
					}
					$('#' + imgId).css({
						fontFamily: fontFamily
					});
				}
			}
		}
	});
	//文本样式
	$('#i_textWeight').change(function() {
		var fontWeight = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var fontId = devAttr.eq(i).attr('id');
				deviced[fontId].fontWeight = fontWeight;
				if (deviced[fontId].devIndex == '15') {
					if (deviced[fontId].markFont == 'mark') {
						deviced[fontId].dial.SplitfontWeight = fontWeight;
					} else if (deviced[fontId].markFont == 'measured') {
						deviced[fontId].dial.fontWeight = fontWeight;
					}
					deviced[fontId].dial.init(fontId + 'img');
				} else {
					if (deviced[fontId].devIndex == '11') {
						var imgId = fontId + 'img';
					} else {
						var imgId = 'p' + fontId + 'img';
					}
					$('#' + imgId).css({
						fontWeight: fontWeight
					});
				}
			}
		}
	});

	//文本字体大小
	$('#i_fontSize').blur(function() {
		var fontSize = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var fontId = devAttr.eq(i).attr('id');
				deviced[fontId].fontSize = fontSize;
				if (deviced[fontId].devIndex == '15') {
					if (deviced[fontId].markFont == 'mark') {
						deviced[fontId].dial.SplitfontSize = fontSize;
					} else if (deviced[fontId].markFont == 'measured') {
						deviced[fontId].dial.fontSize = fontSize;
					}
					deviced[fontId].dial.init(fontId + 'img');
				} else {
					if (deviced[fontId].devIndex == '11') {
						var imgId = fontId + 'img';
					} else {
						var imgId = 'p' + fontId + 'img';
					}
					$('#' + imgId).css({
						fontSize: fontSize + 'px'
					});
				}
			}
		}
	});
	//文本字体颜色
	$('#i_fontColor').on('hide.spectrum', function(e, tinycolor) {
		var fontColor = $('#i_fontColor').spectrum('get');
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var fontId = devAttr.eq(i).attr('id');
				deviced[fontId].fontColor = fontColor;
				if (deviced[fontId].devIndex == '15') {
					if (deviced[fontId].markFont == 'mark') {
						deviced[fontId].dial.SplitfontColor = fontColor;
					} else if (deviced[fontId].markFont == 'measured') {
						deviced[fontId].dial.fontColor = fontColor;
					}
					deviced[fontId].dial.init(fontId + 'img');
				} else {
					if (deviced[fontId].devIndex == '11') {
						var imgId = fontId + 'img';
					} else {
						var imgId = 'p' + fontId + 'img';
					}
					$('#' + imgId).css({
						color: fontColor
					});
				}
			}
		}
	});

	//文本对齐方式
	$('#i_textAlign').change(function() {
		var value = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].textAlign = value;
				var imgId = devAttr.eq(i).attr('id');
				textAlign(imgId);
			}
		}
	});

	//监控点
	$('#i_moniDevId').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});

	//层级关系调整
	$('#i_devlevel').change(function() {
		var str = $(this).val();
		$(this).val('');
		changeDevLeve(str);
	});

	//图表标题
	$('#i_titleText').blur(function() {
		var titleText = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].titleText = titleText;
				deviced[devId].option.title.text = titleText;
				deviced[devId].Chart.setOption({
					title: {
						text: titleText
					},
				});
			}
		}
	});
	//图表类型
	$('#i_chartType').change(function() {
		var chartType = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].chartType = chartType;
				for (var j in deviced[devId].series) {
					deviced[devId].series[j].type = chartType;
				}
				deviced[devId].Xdata.length = 0;
				if (chartType == 'bar') {
					var now = new Date();
					var hour = now.getHours();
					var minutes = now.getMinutes();
					var seconds = now.getSeconds();
					deviced[devId].Xdata.push(hour + ':' + minutes + ':' + (seconds));
					deviced[devId].Chart.setOption({
						xAxis: [{
							boundaryGap: true,
							axisLabel: {
								interval: 0, //横轴信息全部显示
								rotate: 0, //30度角倾斜显示
							},
							data: deviced[devId].Xdata
						}],
						series: deviced[devId].series
					});
					$('#i_chartSplit').val(1);
					$('#tr_i_chartSplit').hide();
					deviced[devId].chartSplit = 1;
				} else if (chartType == 'line') {
					var now = new Date();
					var hour = now.getHours();
					var minutes = now.getMinutes();
					var seconds = now.getSeconds();
					for (var i = 0; i <= 10; i++) {
						if (seconds + i >= 60) {
							minutes += 1;
							seconds = 0;
							if (minutes >= 60) {
								hour += 1;
								minutes = 0;
								if (hour >= 24) {
									hour = 0;
								}
							}
						}
						deviced[devId].Xdata.push(hour + ':' + minutes + ':' + (seconds + i));
					}
					deviced[devId].Chart.setOption({
						xAxis: [{
							boundaryGap: false,
							axisLabel: {
								interval: 0, //横轴信息全部显示
								rotate: 30, //-30度角倾斜显示
							},
							data: deviced[devId].Xdata
						}],
						series: deviced[devId].series
					});
					$('#tr_i_chartSplit').show();
					$('#i_chartSplit').val(10);
					deviced[devId].chartSplit = 10;
				}

			}
		}
	});
	//图表X轴分段
	$('#i_chartSplit').blur(function() {
		var num = parseInt($(this).val());
		deviced[devId].Xdata.length = 0;
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].chartSplit = num;
				var now = new Date();
				var hour = now.getHours();
				var minutes = now.getMinutes();
				var seconds = now.getSeconds();
				for (var i = 0; i <= num; i++) {
					if (seconds + i >= 60) {
						minutes += 1;
						seconds = 0;
						if (minutes >= 60) {
							hour += 1;
							minutes = 0;
							if (hour >= 24) {
								hour = 0;
							}
						}
					}
					deviced[devId].Xdata.push(hour + ':' + minutes + ':' + (seconds + i));
				}
				if (num > 7) {
					deviced[devId].Chart.setOption({
						xAxis: {
							axisLabel: {
								interval: 0, //横轴信息全部显示
								rotate: 30, //30度角倾斜显示
							},
							data: deviced[devId].Xdata
						},
					});
				} else {
					deviced[devId].Chart.setOption({
						xAxis: {
							axisLabel: {
								interval: 0, //横轴信息全部显示
								rotate: 30, //30度角倾斜显示
							},
							data: deviced[devId].Xdata
						},
					});
				}
			}
		}
	});
	//图表添加监测点
	$('#i_addMoniState').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});

	//预览
	$('#centerTabs').tabs({
		onSelect: function(title, index) {
			if (title == "预览") {
				preview();
			} else if (title == "组态图设计") {
				clearInterval(intervalId);
				if ($('.video').length > 0) {
					var video = $('.video').eq(0);
					$('#resizeBox').append(video);
					var devId = video.attr('id');
					video.css('outline-style', deviced[devId].outlineStyle);
					if (video.css('outline-style') !== 'none') {
						$('#' + devId + 'img').show();
					}
					$('#' + devId).resizable({
						disabled: false
					});
					deviced[devId].ocx.DisConnectAllChannel();
				} else if ($('.chart').length > 0) {
					var chart = $('.chart');
					for (var j = 0; j < chart.length; j++) {
						$('#resizeBox').append(chart.eq(j));
						var devId = chart.eq(j).attr('id');
						chart.eq(j).css('outline-style', deviced[devId].outlineStyle);
						$('#' + devId).resizable({
							disabled: false
						});
						$('#' + devId).draggable({
							disabled: false
						});
					}
				}
				$('#previewBox').empty();
				for (var i in deviced) {
					if (deviced[i].devIndex == 14) {
						deviced[i].option.series[0].data[0].value = 50;
						deviced[i].Chart = echarts.init(document.getElementById(i + 'img'));
						deviced[i].Chart.setOption(deviced[i].option, true);
					} else if (deviced[i].devIndex == 15) {
						deviced[i].dial = new canvasPanel();
						deviced[i].dial.bgColor = deviced[i].panelColor;
						deviced[i].dial.splitNum = deviced[i].lineValue;
						deviced[i].dial.MaxNum = parseInt(deviced[i].dmaxvalue);
						deviced[i].dial.MinNum = parseInt(deviced[i].dminvalue);
						deviced[i].dial.init(i + 'img');
					} else if (deviced[i].devIndex == 24) {
						deviced[i].data = [];
						clearInterval(deviced[i].chartInterval);

					}
				}
			}
		}
	});


	//用户自定义事件
	//保存界面设计
	$('#btn_save').click(function() {
		$('#saveAttr').trigger('click');
	});
	//删除界面元素
	$('#btn_dele').click(function() {
		$('#deleAttr').trigger('click');
	});
	//顶层
	$('#btn_move_top').click(function() {
		changeDevLeve('top');
	});
	//上移一层
	$('#btn_move_pre').click(function() {
		changeDevLeve('pre');
	});
	//下移一层
	$('#btn_move_next').click(function() {
		changeDevLeve('next');
	});
	//移动到底层
	$('#btn_move_bottom').click(function() {
		changeDevLeve('bottom');
	});

	//选中控件左对齐
	$('#btn_aline_left').click(function() {
		if (flag_select_count <= 1) {
			return;
		}
		var min_left_pos = 9999;
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				if (min_left_pos > devAttr.eq(i).offset().left) {
					min_left_pos = devAttr.eq(i).offset().left;
				}
			}
		}
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				devAttr.eq(i).offset({
					left: min_left_pos
				});
				deviced[devAttr.eq(i).attr('id')].x = min_left_pos;
			}
		}

	});
	//选中控件垂直居中
	$('#btn_aline_mid').click(function() {
		if (flag_select_count <= 1) {
			return;
		}

		//居中处理算法
		var devAttr = $('.dev');
		var pos_count = 0;
		var pos_sum = 0;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_count += 1;
				pos_sum += devAttr.eq(i).offset().left + devAttr.eq(i).outerWidth() / 2;

			}
		}
		var avg_pos = parseInt(pos_sum / pos_count);
		var mid_pos;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				mid_pos = avg_pos - devAttr.eq(i).outerWidth() / 2;
				devAttr.eq(i).offset({
					left: mid_pos
				});
				deviced[devAttr.eq(i).attr('id')].x = mid_pos;
			}
		}
	});
	//右对齐
	$('#btn_aline_right').click(function() {
		if (flag_select_count <= 1) {
			return;
		}
		var max_right_pos = 0;
		var devAttr = $('.dev');
		var pos_temp;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_temp = devAttr.eq(i).offset().left + devAttr.eq(i).outerWidth();
				if (max_right_pos < pos_temp) {
					max_right_pos = pos_temp;
				}
			}
		}
		var pos_temp = 0;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_temp = max_right_pos - devAttr.eq(i).outerWidth();
				devAttr.eq(i).offset({
					left: pos_temp
				});
				deviced[devAttr.eq(i).attr('id')].x = pos_temp;
			}
		}
	});

	//上对齐
	$('#btn_aline_top').click(function() {
		var min_top_pos = 9999;
		if (flag_select_count <= 1) {
			return;
		}
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				if (min_top_pos > devAttr.eq(i).offset().top) {
					min_top_pos = devAttr.eq(i).offset().top;
				}
			}
		}

		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				devAttr.eq(i).offset({
					top: min_top_pos
				});
				deviced[devAttr.eq(i).attr('id')].y = min_top_pos;
			}
		}

	});
	//垂直居中
	$('#btn_aline_center').click(function() {
		if (flag_select_count <= 1) {
			return;
		}

		//居中处理算法
		var devAttr = $('.dev');
		var pos_count = 0;
		var pos_sum = 0;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_count += 1;
				pos_sum += devAttr.eq(i).offset().top + devAttr.eq(i).outerHeight() / 2;

			}
		}
		console.log('mimidmiimissdfsdfm');
		var avg_pos = parseInt(pos_sum / pos_count);
		var pos_temp;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_temp = avg_pos - devAttr.eq(i).outerHeight() / 2;
				devAttr.eq(i).offset({
					top: pos_temp
				});
				deviced[devAttr.eq(i).attr('id')].y = pos_temp;
			}
		}
	});
	//下对齐
	$('#btn_aline_bottom').click(function() {
		var max_top_pos = 0;
		if (flag_select_count <= 1) {
			return;
		}

		var devAttr = $('.dev');
		var pos_temp;
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_temp = devAttr.eq(i).offset().top + devAttr.eq(i).outerHeight();
				if (max_top_pos < pos_temp) {
					max_top_pos = pos_temp;
				}
			}
		}

		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				pos_temp = max_top_pos - devAttr.eq(i).outerHeight();
				devAttr.eq(i).offset({
					top: pos_temp
				});
				deviced[devAttr.eq(i).attr('id')].y = pos_temp;
			}
		}

	});

});
//折线图图表初始化
function MyLineChartInit(devId) {

	deviced[devId].Chart = echarts.init(document.getElementById(devId + 'img'));
	var now = new Date();
	var hour = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	for (var i = 0; i <= deviced[devId].chartSplit; i++) {
		if (seconds + i >= 60) {
			minutes += 1;
			seconds = 0;
			if (minutes >= 60) {
				hour += 1;
				minutes = 0;
				if (hour >= 24) {
					hour = 0;
				}
			}
		}
		deviced[devId].Xdata.push(hour + ':' + minutes + ':' + (seconds + i));
	}
	deviced[devId].option = {
		title: {
			text: deviced[devId].titleText
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: deviced[devId].legendData
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			splitLine: {
				show: true
			},
			axisLabel: {
				interval: 0, //横轴信息全部显示
				rotate: 30, //-30度角倾斜显示
			},
			data: deviced[devId].Xdata
		}],
		yAxis: [{
			type: 'value',
			splitLine: {
				show: false
			}
		}],
		series: deviced[devId].series
	};
	deviced[devId].Chart.setOption(deviced[devId].option, true);
	return deviced[devId].option;
}



//放大缩小
function CircleResizable(devId) {
	$('#' + devId).resizable({
		disabled: false,
		handles: 'se',
		minWidth: 50,
		minHeight: 50,
		maxWidth: 400,
		maxHeight: 400,
		edge: 10,

		onStopResize: function(e) {
			var width = parseInt($('#' + devId).width());
			var height = parseInt($('#' + devId).height());

			$('#' + devId).attr('data-falg', 'true');
			var result = Math.min(width, height);
			deviced[devId].w = result;
			deviced[devId].h = result;

			$('#' + devId).css({
				width: result,
				height: result,
				borderRadius: "50%"
			});

			var updateId = devId + "img";
			$('#' + updateId).css({
				width: result,
				height: result
			});
			if (deviced[devId].devIndex == 14) {
				var ram = deviced[devId].option.series[0];
				if (result < 150) {

					ram.axisTick.length = 6;
					ram.axisLine.lineStyle.width = 5;
					ram.splitLine.length = 10;
					ram.detail.textStyle.fontSize = 15;
					ram.title.textStyle.fontSize = 8;

				} else if (result > 250) {
					ram.axisTick.length = 16;
					ram.axisLine.lineStyle.width = 12;
					ram.splitLine.length = 20;
					ram.detail.textStyle.fontSize = 26;
					ram.title.textStyle.fontSize = 26;

				} else {
					ram.axisTick.length = 10;
					ram.axisLine.lineStyle.width = 8;
					ram.splitLine.length = 15;
					ram.detail.textStyle.fontSize = 20;
					ram.title.textStyle.fontSize = 20;
				}
				var chart = echarts.init(document.getElementById(updateId));
				chart.setOption(deviced[devId].option, true);
				console.log('---------------------------------------------');
			}
		}
	});
}

function RectResizable(devId) {
	$('#' + devId).resizable({
		disabled: false,
		handles: 'w,n,e,s,se',
		minWidth: 10,
		minHeight: 10,
		maxWidth: 1000,
		maxHeight: 1000,
		edge: 10,
		onResize: function(e) {},
		onStopResize: function(e) {
			e.stopPropagation();
			var width = parseInt($(this).width());
			var height = parseInt($(this).height());

			deviced[devId].w = width;
			deviced[devId].h = height;
			var upDataId = devId;
			if (deviced[devId].devIndex == 23) {
				var hkW = $('#' + devId + 'tv').width();
				var hkH = $('#' + devId + 'tv').height();
				var hkWidth = (hkW - 4 * deviced[devId].col - 2) / deviced[devId].col;
				var hkHeight = (hkH - 4 * deviced[devId].row - 2) / deviced[devId].row;
				$('.smallocxdiv').css({
					width: hkWidth + 'px',
					height: hkHeight + 'px'
				});
				return false;
			} else if (deviced[devId].devIndex == 24) {
				deviced[devId].Chart = echarts.init(document.getElementById(devId + 'img'));
				deviced[devId].Chart.setOption(deviced[devId].option, true);
				return false;
			}
			$(this).find('div:first').css({
				width: "100%",
				height: "100%",
				backgroundSize: "contain"
			});
			if (deviced[devId].devIndex == 15) {
				deviced[devId].dial.init(devId + 'img');
			}
			if (deviced[devId].showmode != '') {
				if (deviced[devId].showmode == "normal") {
					$('#' + upDataId + 'img').css({
						background: "url(" + deviced[upDataId].bgImg + ") no-repeat",
						backgroundSize: 'contain'
					});
				} else if (deviced[devId].showmode == "strech") {
					$('#' + upDataId + 'img').css({
						background: "url(" + deviced[upDataId].bgImg + ") no-repeat",
						backgroundSize: 'cover'
					});
				} else if (deviced[devId].showmode == "repeat") {
					$('#' + upDataId + 'img').css({
						background: "url(" + deviced[upDataId].bgImg + ") repeat"
					});
				} else if (deviced[devId].showmode == "none") {
					$('#' + upDataId + 'img').css({
						background: "none"
					});
				}
			}
			textAlign(upDataId);
		}
	});
}

//显示形状选择
function changeShape(changeId) {
	if (deviced[changeId].shape == 'rectangle') {
		if (deviced[changeId].devIndex == 11) {
			if (deviced[changeId].btnStyle == 'pic') {
				$('#' + changeId).css({
					width: '100px',
					height: '60px',
					borderRadius: '0'
				});
			} else if (deviced[changeId].btnStyle == 'text') {
				$('#' + changeId).css({
					width: '100px',
					height: '30px',
					borderRadius: '0'
				});
			}
		} else if (deviced[changeId].devIndex == 8) {
			if (deviced[changeId].devtype == 'Definde') {
				$('#' + changeId).css({
					width: '100px',
					height: '130px',
					borderRadius: '0'
				});
			}
		}

		$('#' + changeId + 'img').css({
			width: '100%',
			height: '100%',
			borderRadius: '0'
		});
	} else if (deviced[changeId].shape == 'circle') {
		if (deviced[changeId].devIndex == 11) {
			$('#' + changeId).css({
				width: '50px',
				height: '50px',
				borderRadius: '50%',
				overflow: 'hidden'
			});
		} else if (deviced[changeId].devIndex == 8) {
			$('#' + changeId).css({
				width: '100px',
				height: '100px',
				borderRadius: '50%'
			});
		}
		$('#' + changeId + 'img').css({
			width: '100%',
			height: '100%',
			borderRadius: '50%'
		});
	}
	deviced[changeId].w = parseInt($('#' + changeId).width());
	deviced[changeId].h = parseInt($('#' + changeId).height());
}
//监控点的选择
function selectDevState(stateName, url) {
	if ($('.window').length > 0) {
		$('.window').remove();
		$('.window-shadow').remove();
	}
	var dataPanel = ['<div id="MonitoringSitePanel">',
		'<table>',
		'<tr>',
		'<td>名称：</td>',
		'<td><input id="dataName"',
		'style=" border:1px solid #ccc; width:80px;"></td>',
		'<td><a id="query" href="#" class="easyui-linkbutton"',
		'data-options="iconCls:\'icon-search\'">查询</a></td>',
		'</td>',
		'<td><a id="a_save" href="#" class="easyui-linkbutton" data-options="iconCls:\'icon-save\'">确认选择</a>',
		'<td></td>',
		'</tr>',
		'</table>',
		'<table id="MonitoringSiteTable"></table>',
		'</div>'
	].join('');

	if ($('#MonitoringSitePanel').length > 0) {
		$('#MonitoringSitePanel').remove();
	}
	$('#contentBox').append(dataPanel);
	$.parser.parse('#contentBox'); //对easyUI动态添加的元素进行渲染解析

	$('#MonitoringSitePanel').dialog({
		title: '选择监测点',
		width: 600,
		height: 400,
		handler: function() {
			$.parser.parse('#contentBox');
		},
		onClose: function() {}
	});

	$('#MonitoringSiteTable').datagrid({
		url: 'getMetadataDefine?masterId=' + masterId,
		height: 332,
		fitColumns: true,
		singleSelect: true,
		rownumbers: true,
		autoRowHeigh: false,
		pagination: true,
		pageSize: 10,
		pageList: [10, 20, 30, 40, 50],
		columns: [
			[{
					field: 'id',
					title: '元数据ID',
					width: 60,
					align: 'center',
					hidden: 'true'
				},
				{
					field: 'dataName',
					title: '名称',
					width: 80,
					align: 'center'
				},
				{
					field: 'gateNo',
					title: '从站',
					width: 30,
					align: 'center'
				},
				{
					field: 'funCode',
					title: '功能码',
					width: 30,
					align: 'center'
				},
				{
					field: 'regAddress',
					title: '寄存器地址',
					width: 50,
					align: 'center'
				},
				{
					field: 'dataType',
					title: '数据类型',
					width: 70,
					align: 'center'
				},
				{
					field: 'dataUnit',
					title: '单位',
					width: 30,
					align: 'center'
				}
			]
		]

	});
	$('#query').click(function() {
		$('#MonitoringSiteTable').datagrid('load', {
			orgid: 0,
			dataName: $('#dataName').val()
		});
	});

	$('#a_save').click(function() {
		var row = $('#MonitoringSiteTable').datagrid('getSelected');
		if (row) {
			var devArr = $('.dev');
			for (var i = 0; i < devArr.length; i++) {
				if (devArr.eq(i).css('outline-style') !== 'none') {
					var upId = devArr.eq(i).attr('id');
					deviced[upId].dataId = row.id;
					switch (stateName) {
						case 'devname':
							$('#i_deviceid').val(row.dataName);
							deviced[upId].devname = row.dataName;
							if (deviced[upId].devIndex == 8) {

								var txt = textShowMode(upId);
								var textID = 'p' + upId + 'img';

								$('#' + textID).text(txt).css({
									color: deviced[upId].fontColor
								});
								textAlign(upId);

							} else if (deviced[upId].devIndex == 14) {
								devArr.eq(i).find('span').text(row.dataName).css({
									color: '#555',
									display: 'inline-block',
									position: 'absolute',
									bottom: '10px'
								});
							} else if (deviced[upId].devIndex == 5) {
								moniShowMode(upId);
								var textID = 'p' + upId + 'img';
								$('#' + textID).css({
									color: deviced[upId].fontColor
								});
							} else if (deviced[upId].devIndex == 15) {
								devArr.eq(i).find('span').text(row.dataName).css({
									color: '#555',
									position: 'absolute',
									bottom: '10px',
									left: '0px'
								});
							}
							break;
						case 'OpenDoorState':
							$('#i_OpenDoorState').val(row.dataName);
							deviced[upId].OpenDoorState = row.dataName;
							break;
						case 'DoorState':
							$('#i_DoorState').val(row.dataName);
							deviced[upId].DoorState = row.dataName;
							break;
						case 'CardReader':
							$('#i_CardReader').val(row.dataName);
							deviced[upId].CardReader = row.dataName;
							break;
						case 'linkorgid':
							$('#i_linkorgid').val(row.orgname);
							deviced[upId].linkorgid = row.orgname;
							break;
						case 'devGroupId':
							if (markerID !== null) {
								deviced[upId].marker[markerID].devGroupId = row.orgname;
								$('#i_devGroupId').val(row.orgname);
							}
							break;
						case 'moniDevId':
							if (markerID !== null) {
								deviced[upId].marker[markerID].moniDevId = row.dataName;
								$('#i_moniDevId').val(row.dataName);
							}
							break;
						case 'addMoniState':
							$('#tr_i_devlevel').before('<tr id="tr_i_moni' + upId + deviced[upId].moniCount + '" class="tr_i_monis' + upId + '"><td></td><td class="txt monitext' + upId + '" >监测点' + deviced[upId].moniCount + '</td><td class="txt"style="position:relative;"><input id="i_moni' + upId + deviced[upId].moniCount +
								'" name="moni' + upId + deviced[upId].moniCount + '" data-mCount=' + deviced[upId].moniCount + ' style="box-sizing:border-box;width:154px;padding-right:20px;background:transparent;"readonly="readonly"/><div class="triangle-down' + upId + ' triangle-down"></div></td></tr>');
							deviced[upId]['moni' + upId + deviced[upId].moniCount] = row.dataName;
							deviced[upId][deviced[upId].moniCount] = {};
							deviced[upId][deviced[upId].moniCount].charttext = '监测点' + deviced[upId].moniCount;
							deviced[upId][deviced[upId].moniCount].chartcolor = '#000';
							deviced[upId].series.push({
								name: deviced[upId][deviced[upId].moniCount].charttext,
								type: deviced[upId].chartType,
								itemStyle: {
									normal: {
										color: deviced[upId][deviced[upId].moniCount].chartcolor
									}
								},
								animation: false,
								data: []
							});
							deviced[upId].legendData.push(deviced[upId][deviced[upId].moniCount].charttext);
							deviced[upId].Chart.setOption({
								legend: {
									data: deviced[upId].legendData
								},
								series: deviced[upId].series
							});
							$('.triangle-down' + upId).click(function() {
								$(this).siblings().trigger('click');
							});
							$('#i_moni' + upId + deviced[upId].moniCount).val(row.dataName).click(function() {
								$('#tr_i_chartcolor').show();
								$('#tr_i_charttext').show();
								deviced[upId].moniIndex = $(this).attr('data-mCount');
								$(this).parent().parent().after($('#tr_i_chartcolor'), $('#tr_i_charttext'));
								$('#i_charttext').val(deviced[upId][deviced[upId].moniIndex].charttext);
								$('#i_chartcolor').spectrum('set', deviced[upId][deviced[upId].moniIndex].chartcolor);
								//添加图表的监测点
								$('#i_chartcolor').on('hide.spectrum', function(e, tinycolor) {
									var color = $('#i_chartcolor').spectrum('get').toHexString();
									var devArr = $('.dev');
									for (var i = 0; i < devArr.length; i++) {
										if (devArr.eq(i).css('outline-style') !== 'none') {
											var devId = devArr.eq(i).attr('id');
											$('.triangle-down' + devId).eq(deviced[devId].moniIndex).css({
												borderTopColor: color
											});
											deviced[devId][deviced[devId].moniIndex].chartcolor = color;
											deviced[devId].series[deviced[devId].moniIndex].itemStyle.normal.color = color;
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
											$('.monitext' + upId).eq(deviced[devId].moniIndex).text(text);
											deviced[devId][deviced[devId].moniIndex].charttext = text;
											deviced[devId].legendData[deviced[devId].moniIndex] = text;
											deviced[devId].series[deviced[devId].moniIndex].name = text;
											deviced[devId].legendData[deviced[devId].moniIndex] = text;
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
							$('#i_moni' + upId + deviced[upId].moniCount).trigger('click');
							deviced[upId].moniCount++;
							break;
					}
				}
			}
			$('#MonitoringSitePanel').dialog('close');
		} else {
			$.messager.alert('提示', '请选择设备');
		}
	});

	//commit by lizhen 20181228
	//return row.dataName;
}

//门打开时显示信息
function OpenDoorShowInfo(data, parentId) {
	if ($('.window').length > 0) {
		$('.window').remove();
		$('.window-shadow').remove();
	}
	$('#openDoor').remove();
	var infoHtml =
		"<div id='openDoor'><div id='closebtn'style='position:absolute;right:10px;top:0px;width:10px;height:10px;font:bold 20px 微软雅黑;cursor:pointer;'>×</div><div id='avatar'style='width:150px;height:180px;margin-top:10px;margin-left:170px;border:1px solid #ccc;background:url(../views/design/images/head.jpg)'></div><table style='margin-left:100px;margin-top:5px;'><tr><td align='right'>部门：</td><td><input type='text'id='dep'></td></tr><tr><td align='right'>职位：</td><td><input type='text'id='pos'></td></tr><tr><td align='right'>姓名：</td><td><input type='text'id='Info'></td></tr><tr><td align='right'>卡号：</td><td><input type='text'id='CardWord'></td></tr><tr><td align='right'>开门控制点：</td><td><input type='text'id='OpenCtrl'></td></tr><tr><td colspan='2'><button id='openDoorOk'style='width:100px;margin:2px 5px 2px 15px;'>开门</button><button id='dopenDoorOk'style='width:100px;margin:2px 5px;'>确定</button></td></tr></table></div>";

	if ($('#openDoor').length > 0) {
		$('#openDoor').remove();
	}
	$('#' + parentId).append(infoHtml);
	$.parser.parse('#' + parentId); //对easyUI动态添加的元素进行渲染解析

	$('#openDoor').dialog({
		title: '开门信息',
		width: 500,
		height: 400,
		closable: false,
		handler: function() {
			$.parser.parse('#' + parentId);
		},
		onOpen: function() {
			$.parser.parse('#' + parentId);
			$('#avatar').css({
				backgroundImage: "url(" + data.avatar + ")"
			});
			$('#dep').val(data.depart);
			$('#pos').val(data.posName);
			$('#Info').val(data.nameInfo);
			$('#CardWord').val(data.CardCode);
			$('#OpenCtrl').val(data.OpenDoorState);
		}
	});
	$('#avatar').click(function() {
		if (parentId == 'contentBox') {
			fileDialog('subFile', 'avatar');
		} else {
			return false;
		}
	});
	if (parentId == 'contentBox') {
		$('#dep').blur(function() {
			data.depart = $(this).val();
		});
		$('#pos').blur(function() {
			data.posName = $(this).val();
		});
		$('#Info').blur(function() {
			data.nameInfo = $(this).val();
		});
		$('#CardWord').blur(function() {
			data.CardCode = $(this).val();
		});
		$('#OpenCtrl').attr('readOnly', true);
	} else {
		$('#dep').attr('readOnly', true);
		$('#pos').attr('readOnly', true);
		$('#Info').attr('readOnly', true);
		$('#CardWord').attr('readOnly', true);
	}
	if (parentId == 'previewBox') {
		$('#openDoorOk').click(function() {
			var sendData = {
				openValue: data.openValue
			};
			$.ajax({
				url: "randomData",
				data: sendData,
				type: 'POST',
				async: false,
				error: function() {
					errorCount--;
					if (errorCount == 0) {
						$.messager.alert('提示', "ajax 连接服务器有误,请检查");
					}
					$.messager.show({
						title: '提示',
						msg: '正在加载中，请稍后...',
						timeout: 3000,
						showType: 'slide'
					});
				},
				success: function(data) {
					$.messager.show({
						title: '提示',
						msg: '数据发送成功！',
						timeout: 3000,
						showType: 'slide'
					});
					$('#openDoor').dialog('close');
					$('#openDoor').remove();
				}
			});
		});
	}
	$('#closebtn').click(function() {
		$('#openDoor').dialog('close');
		$('#openDoor').remove();
	});
	$('#dopenDoorOk').click(function() {
		$('#openDoor').dialog('close');
		$('#openDoor').remove();
	});

	/*setTimeout(function(){
		$('#openDoor').dialog('close');
		$('#openDoor').remove();
	},5000);*/
}

//组件切换
function chg_selele() {

	var title = $("#selele").val();
	$('#eastBox').panel('setTitle', '属性[' + title + ']');
	if (title == 'bg') {
		$('#resizeBox').trigger('click');
	} else {
		var triggerId = $("#selele").find("option:selected").attr('data-Id');
		$('#' + triggerId).trigger('click');
	}
}

//文件上传
function fileDialog(url, inputId) {
	var dialogDiv = '<div id="dialogDiv"><div style="margin:20px;"><span id="Progress" style="display:block;"><progress id="progressBar" value="0" max="100"></progress><span id="percentage"></span></span><br/><br/><input class="text" name="filename" id="file"type="file"><a href="#" class="easyui-linkbutton" onclick="uploadFile(\'file\',\'' + url + '\',\'' + inputId + '\');">上传</a></div></div>';

	if ($('#dialogDiv').length < 1) {
		$('#contentBox').append(dialogDiv);
	}

	$('#dialogDiv').dialog({
		title: '图片上传',
		width: 400,
		height: 200,
		onOpen: function() {
			$.parser.parse('#contentBox');
		}
	});
}

function uploadFile(fileId, url, inputId) {
	var fileObj = document.getElementById(fileId).files[0];
	var FileController = "../design/" + url;

	// FormData h5新对象
	var form = new FormData();
	form.append("file", fileObj);

	// XMLHttpRequest 请求

	var xhr = new XMLHttpRequest();

	xhr.open("post", FileController, true);

	xhr.onload = function(data) {};
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var response = xhr.responseText;
				var imgUrl = '../userdata/image/' + response;
				$('#' + inputId).val(imgUrl);
				if ($('#resizeBox').css('outline-style') !== 'none') {
					deviced.bg.bgImg = imgUrl;
					$('#resizeBox').css({
						background: "url(" + deviced.bg.bgImg + ") no-repeat",
						backgroundSize: 'contain'
					});
				}
				var devArr = $('.dev');
				for (var i = 0; i < devArr.length; i++) {
					if (devArr.eq(i).css('outline-style') !== 'none') {
						var dev_Id = devArr.eq(i).attr('id');
						if (inputId == 'i_dopenimgurl') {
							deviced[dev_Id].openImgurl = imgUrl;
							$('#' + dev_Id + 'img').css({
								backgroundImage: "url(" + imgUrl + ")",
								backgroundRepeat: 'no-repeat'
							});
						} else if (inputId == 'i_dcloseimgurl') {
							deviced[dev_Id].closeImgurl = imgUrl;
						} else if (inputId == 'i_bj') {
							deviced[dev_Id].bgImg = imgUrl;
							$('#' + dev_Id + 'img').css({
								backgroundImage: "url(" + imgUrl + ")"
							});
						} else if (inputId == 'avatar') {
							deviced[dev_Id].avatar = imgUrl;
							$('#avatar').css({
								backgroundImage: 'url(' + imgUrl + ')'
							});
						}
					}
				}
			}
		}
	};
	xhr.upload.addEventListener("progress", function(e) {

		if (e.lengthComputable) {
			$('#progressBar').attr('max', e.total);
			$('#progressBar').attr('value', e.loaded);
			var num = Math.round(e.loaded / e.total * 100);
			$('#percentage').html(num + "%");

			if (num == '100') {
				$('#dialogDiv').dialog('close');
				$('#dialogDiv').remove();
			}
		}

	}, false);
	xhr.send(form);
}


//控制按钮发送数据，ajax请求
function ctrlSend(data, count) {
	$.ajax({
		url: "./php/yz.php",
		data: data,
		type: 'POST',
		async: false,
		error: function() {
			count--;
			if (count == 0) {
				$.messager.alert('提示', 'ajax链接服务器有误');
			} else {
				$.messager.show({
					title: '提示',
					msg: '正在链接，请稍后...',
					timeout: 3000,
					showType: 'slide'
				});
				ctrlSend(data, count);
			}
		},
		success: function(data) {
			if (data == 1) {
				$.messager.show({
					title: '提示',
					msg: '数据发送成功！',
					timeout: 3000,
					showType: 'slide'
				});
			}
		}
	});
}


//绘制eCharts仪表盘，初始化
function setGauge(devId) {
	deviced[devId].Chart = echarts.init(document.getElementById(devId + 'img'));

	deviced[devId].option = {
		backgroundColor: '#ffff00',
		series: [{
			name: '业务指标',
			type: 'gauge',
			splitNumber: 10, // 分割段数，默认为5
			min: 0,
			max: 100,
			startAngle: 240,
			endAngle: -60,
			radius: '100%',
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					color: [
						[0.2, '#fc1'],
						[0.8, '#48b'],
						[1, '#f00']
					],
					width: 8
				}
			},
			axisTick: { // 坐标轴小标记
				splitNumber: 10, // 每份split细分多少段
				length: 10, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
			},
			axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color: 'auto'
				}
			},
			splitLine: { // 分隔线
				show: true, // 默认显示，属性show控制显示与否
				length: 15, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					color: 'auto'
				}
			},
			pointer: {
				width: 5
			},
			title: {
				show: true,
				offsetCenter: [0, '-40%'], // x, y，单位px
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					fontSize: 20
				}
			},
			detail: {
				formatter: '{value}',
				offsetCenter: [0, '40%'],
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color: 'auto',
					fontWeight: 'bolder',
					fontSize: 20
				}
			},
			data: [{
				value: 50,
				name: '电压(V)'
			}]
		}]
	};

	deviced[devId].Chart.setOption(deviced[devId].option, true);

	return deviced[devId].option;
}

//初始化器件类型
var flag = true;

function saveType() {
	if (flag) {
		flag = false;
		var typeValue = $('#i_devtype').find('option');
		for (var i = 0; i < (typeValue.length - 2); i++) {
			type[i] = {};
			type[i].dtype = typeValue.eq(i).val();
			switch (typeValue.eq(i).val()) {
				case 'Switch':
					type[i].openImgurl = "../views/design/images/1.png";
					type[i].closeImgurl = "../views/design/images/8.png";
					break;
				case 'Smoke':
					type[i].openImgurl = "../views/design/images/s1.jpg";
					type[i].closeImgurl = "../views/design/images/s12.jpg";
					break;
				case 'Infrared':
					type[i].openImgurl = "../views/design/images/h1.jpg";
					type[i].closeImgurl = "../views/design/images/h12.jpg";
					break;
				case 'Leaker':
					type[i].openImgurl = "../views/design/images/l1.jpg";
					type[i].closeImgurl = "../views/design/images/l12.jpg";
					break;
				case 'Fan':
					type[i].openImgurl = "../views/design/images/f1.jpg";
					type[i].closeImgurl = "../views/design/images/f12.jpg";
					break;
			}
		}
	} else {
		return false;
	}
}
//开关量器件型状
function chgDevtype(devId) {
	switch (deviced[devId].devtype) {
		case 'Switch':
			$('#' + devId).css({
				width: '100px',
				height: '130px',
				borderRadius: '0'
			});
			$('#' + devId + 'img').css({
				borderRadius: '0'
			});
			deviced[devId].shape = "rectangle";
			break;
		case 'Smoke':
			$('#' + devId).css({
				width: '100px',
				height: '100px',
				borderRadius: '50%'
			});
			$('#' + devId + 'img').css({
				borderRadius: '50%'
			});
			deviced[devId].shape = 'circle';
			break;
		case 'Infrared':
			$('#' + devId).css({
				width: '100px',
				height: '130px',
				borderRadius: '0'
			});
			$('#' + devId + 'img').css({
				borderRadius: '0'
			});
			deviced[devId].shape = 'rectangle';
			break;
		case 'Leaker':
			$('#' + devId).css({
				width: '100px',
				height: '100px',
				borderRadius: '50%'
			});
			$('#' + devId + 'img').css({
				borderRadius: '50%'
			});
			deviced[devId].shape = 'circle';
			break;
		case 'Fan':
			$('#' + devId).css({
				width: '100px',
				height: '100px',
				borderRadius: '50%'
			});
			$('#' + devId + 'img').css({
				borderRadius: '50%'
			});
			deviced[devId].shape = 'circle';
			break;
		case 'Definde':
			$('#' + devId).css({
				width: '100px',
				height: '130px',
				borderRadius: '0'
			});
			$('#' + devId + 'img').css({
				borderRadius: '0'
			});
			deviced[devId].shape = 'rectangle';
			break;
		case 'DefText':
			$('#' + devId).css({
				width: '100px',
				height: '30px',
				borderRadius: '0',
				overflow: 'hidden',
				color: '#333'
			});
			$('#' + devId + 'img').css({
				borderRadius: '0'
			});
			deviced[devId].shape = 'rectangle';
			break;
	}
	deviced[devId].w = parseInt($('#' + devId).width());
	deviced[devId].h = parseInt($('#' + devId).height());
}

//器件类型
function chg_i_devtype(devId) {
	console.log('chg_i_devtype');
	deviced[devId].devtype = $('#i_devtype').val();
	var typeValue = $('#i_devtype').find('option');
	$('#i_inverse').prop("checked", false);
	for (var i in type) {
		if (type[i].dtype == deviced[devId].devtype) {
			deviced[devId].openImgurl = type[i].openImgurl;
			deviced[devId].closeImgurl = type[i].closeImgurl;
		}
	}
	var imgId = devId + 'img';
	chgDevtype(devId);
	if (deviced[devId].devtype == 'Definde') {

		deviced[devId].openText = '';
		deviced[devId].closeText = '';
		deviced[devId].openImgurl = "../views/design/images/1.png";
		deviced[devId].closeImgurl = "../views/design/images/8.png";
		deviced[devId].userDefinde = '';
		deviced[devId].shape = 'rectangle';

	} else if (deviced[devId].devtype == "DefText") {

		deviced[devId].openText = '打开';
		deviced[devId].closeText = '关闭';
		deviced[devId].fontSize = 14;
		deviced[devId].fontFamily = "Arial";
		deviced[devId].fontColor = '#333333';
		deviced[devId].fontWeight = 'bold';
		deviced[devId].openImgurl = "";
		deviced[devId].closeImgurl = "";
		deviced[devId].userDefinde = '';
		deviced[devId].textAlign = "4";
	}
	var txt = textShowMode(devId);
	$('#p' + imgId).text(txt);
	textAlign(devId);
	$('#' + devId).trigger('click');
	$('#' + imgId).css({
		backgroundImage: "url(" + deviced[devId].openImgurl + ")"
	});
}

//监测点文本显示模式设置
function moniShowMode(devId) {

	if (deviced[devId].moniShowMode == '0') {
		$('#' + devId + 'name').text(deviced[devId].devname);
		$('#' + devId + 'val').text('');
	} else if (deviced[devId].moniShowMode == '1') {
		$('#' + devId + 'name').text('');
		$('#' + devId + 'val').text(deviced[devId].tagtext);
	} else if (deviced[devId].moniShowMode == '2') {
		$('#' + devId + 'name').text(deviced[devId].devname + ' : ');
		$('#' + devId + 'val').text(deviced[devId].tagtext);
	}
}

//不同的文本显示模式下的文本值
function textShowMode(devId) {
	var text = '';
	if (deviced[devId].devnameShowMode == '1') {
		if (deviced[devId].devtype == 'DefText') {
			text = deviced[devId].devname + ' : ' + deviced[devId].openText;
		} else {
			text = deviced[devId].devname;
		}
	} else if (deviced[devId].devnameShowMode == '0') {
		if (deviced[devId].devtype == 'DefText') {
			text = deviced[devId].openText;
		} else {
			text = '';
		}
	}
	return text;
}
//文本对齐方式
function textAlign(devId) {
	var upElement = $('#' + devId).find('p').eq(0);
	switch (deviced[devId].textAlign) {
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
			var range = parseInt((deviced[devId].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'left',
				paddingTop: range + 'px'
			});
			break;
		case '4':
			var range = parseInt((deviced[devId].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'center',
				paddingTop: range + 'px'
			});
			break;
		case '5':
			var range = parseInt((deviced[devId].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'right',
				paddingTop: range + 'px'
			});
			break;
		case '6':
			var range = parseInt(deviced[devId].h - upElement.height());
			upElement.css({
				textAlign: 'left',
				paddingTop: range + 'px'
			});
			break;
		case '7':
			var range = parseInt(deviced[devId].h - upElement.height());
			upElement.css({
				textAlign: 'center',
				paddingTop: range + 'px'
			});
			break;
		case '8':
			var range = parseInt(deviced[devId].h - upElement.height());
			upElement.css({
				textAlign: 'right',
				paddingTop: range + 'px'
			});
			break;
	}
}
//预览文本对齐方式
function PreTextAlign(devId) {
	var upElement = $('#pre' + devId).find('p').eq(0);
	switch (deviced[devId].textAlign) {
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
			var range = parseInt((deviced[devId].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'left',
				paddingTop: range + 'px'
			});
			break;
		case '4':
			var range = parseInt((deviced[devId].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'center',
				paddingTop: range + 'px'
			});
			break;
		case '5':
			var range = parseInt((deviced[devId].h - upElement.height()) * 0.5);
			upElement.css({
				textAlign: 'right',
				paddingTop: range + 'px'
			});
			break;
		case '6':
			var range = parseInt(deviced[devId].h - upElement.height());
			upElement.css({
				textAlign: 'left',
				paddingTop: range + 'px'
			});
			break;
		case '7':
			var range = parseInt(deviced[devId].h - upElement.height());
			upElement.css({
				textAlign: 'center',
				paddingTop: range + 'px'
			});
			break;
		case '8':
			var range = parseInt(deviced[devId].h - upElement.height());
			upElement.css({
				textAlign: 'right',
				paddingTop: range + 'px'
			});
			break;
	}
}

//rgb转16进制
var rgbToHex = function(rgb) {
	// rgb(x, y, z)
	var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
	var hex = "#";
	for (var i = 0; i < 3; i++) {
		// 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
		// 'color[i]' 是数组，要转换成字符串.
		// 如果结果是一位数，就在前面补零。例如： A变成0A
		hex += ("0" + Number(color[i]).toString(16)).slice(-2);
	}
	return hex;
}
//获取json对象的长度
function getJsonLength(jsonData) {
	var length = 0;
	for (var i in jsonData) {
		length++;
	}
	return length;
}
//预览图片显示模式
function PrePicShowMode(devId) {
	var showmode = deviced[devId].showmode;
	switch (showmode) {
		case 'normal':
			$('#pre' + devId).css({
				background: "url(" + deviced[devId].bgImg + ") no-repeat",
				backgroundSize: 'contain'
			});
			break;
		case 'strech':
			$('#pre' + devId).css({
				background: "url(" + deviced[devId].bgImg + ") no-repeat",
				backgroundSize: 'cover'
			});
			break;
		case 'repeat':
			;
			$('#pre' + devId).css({
				background: "url(" + deviced[devId].bgImg + ") repeat"
			});
			break;
		case 'none':
			$('#pre' + devId).css({
				background: "none"
			});
			break;
	}
}


// 编写自定义函数,创建标注
function addMarker(devId, point, label, markerCount) {

	deviced[devId].marker[markerCount].Label = new BMap.Label(label, {
		offset: new BMap.Size(20, -10)
	}); //创建标注文本
	deviced[devId].marker[markerCount].Marker = new BMap.Marker(point); //创建标注
	/*var marker = new BMap.Marker(point, {
	  // 指定Marker的icon属性为Symbol
	  icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
	    scale: 2,//图标缩放大小
	    fillColor: "orange",//填充颜色
	    fillOpacity: 0.8//填充透明度
	  })
	});*/

	deviced[devId].map.addOverlay(deviced[devId].marker[markerCount].Marker); //添加标注到地图
	deviced[devId].marker[markerCount].Marker.setLabel(deviced[devId].marker[markerCount].Label); //添加文本到地图
	deviced[devId].marker[markerCount].Marker.enableDragging(); //标记点允许拖拽

	var opts = {
		width: 50, // 信息窗口宽度
		height: 30, // 信息窗口高度
		title: "信息窗口标题", // 信息窗口标题
		enableMessage: true, //设置允许信息窗发送短息
		message: "说走就走"
	}
	var infoWindow = new BMap.InfoWindow("信息窗口内容.....", opts); // 创建信息窗口对象

	deviced[devId].marker[markerCount].Marker.addEventListener('click', bMarkerClick);
	deviced[devId].marker[markerCount].Marker.addEventListener('dragend', bMarkerdragend);

	//创建右键菜单
	var markerMenu = new BMap.ContextMenu();
	markerMenu.addItem(new BMap.MenuItem('删除标记点', removeMarker.bind(deviced[devId].marker[markerCount].Marker)));
	deviced[devId].marker[markerCount].Marker.addContextMenu(markerMenu);

}

function removeMarker(e, ee, marker) { //删除指定标记点数据
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
			var markId = deviced[devId].marker[upmarkerId].MarkerId;
			deviced[devId].map.removeOverlay(marker); //删除标记点
			delete deviced[devId].marker[markId]; //删除数据
			$('#i_devGroupId').val('');
			$('#i_MarkerLng').val('');
			$('#i_MarkerLat').val('');
			$('#i_MarkerLable').val('');
			$('[name="bgColor"]').spectrum('set', '#fff');
			$('[name="albgColor"]').spectrum('set', '#fff');
		}
	}
}

function bMarkerClick() { //点击标记点
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
			var str = this.getLabel().content; //获取marker的label文本
			var markerAttr = deviced[devId].marker[upmarkerId];
			markerID = markerAttr.MarkerId; //获取标记点的ID号
			for (var i in markerAttr) {
				$('[name="' + i + '"]').eq(0).val(markerAttr[i]);
				if ($('[name="' + i + '"]').is('.colorPicker')) {
					$('[name="' + i + '"]').spectrum('set', markerAttr[i]);
				}
			}
		}
	}

}

function bMarkerdragend(e) { //标记点拖拽完成事件，执行的回调函数
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
			var MarkPoint = this.getPosition(); //获取marker的位置
			deviced[devId].marker[upmarkerId].MarkerLng = MarkPoint.lng;
			deviced[devId].marker[upmarkerId].MarkerLat = MarkPoint.lat;
			$('#i_MarkerLng').val(MarkPoint.lng);
			$('#i_MarkerLat').val(MarkPoint.lat);
		}
	}
}

var BMoveMarker = {};

//标记点移动
function BMapMarkMove(Marker, pointLng, pointLat) {
	var MovePoint = new BMap.Point(pointLng, pointLat); //获取百度地图坐标点
	Marker.setPosition(MovePoint); //设置marker的坐标点
}

/*************************************************
Function:		ChangeStatus
Description:	选中窗口时，相应通道的状态显示
Input:			iWindowNum : 	选中窗口号
Output:			无
return:			无
*************************************************/
function ChangeStatus(iWindowNum) {
	m_bDVRControl = document.getElementById("HIKOBJECT" + iWindowNum);
	for (var i = 1; i <= 4; i++) {
		if (i == iWindowNum) {
			document.getElementById("NetPlayOCX" + i).style.border = "1px solid #00f";
		} else {
			document.getElementById("NetPlayOCX" + i).style.border = "1px solid #ccc";
		}
	}
	console.log('选中窗口：' + iWindowNum + '号');
}
//图表实时数据显示
function preCharts(i) {
	if (deviced[i].chartType == 'line') {
		for (var m in deviced[i].series) {
			deviced[i].seriesData[m][deviced[i].seriesData[m].length - 1].label.normal.show = false;
			deviced[i].seriesData[m].push({
				value: (Math.random() * 100 + Math.random() * 100).toFixed(2),
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				}
			});
			deviced[i].data[m].data = deviced[i].seriesData[m];
			if (deviced[i].seriesData[m].length > (deviced[i].chartSplit + 1)) {
				deviced[i].seriesData[m].shift();
			}
		}
	} else if (deviced[i].chartType == 'bar') {
		for (var m in deviced[i].series) {
			deviced[i].seriesData[m].push({
				value: (Math.random() * 100 + Math.random() * 100).toFixed(2),
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				}
			});
			deviced[i].data[m].data = deviced[i].seriesData[m];
			if (deviced[i].seriesData[m].length > 1) {
				deviced[i].seriesData[m].shift();
			}
		}
	}

	deviced[i].Xdata.shift();
	var curTime = new Date();
	var curHour = curTime.getHours();
	var curMinu = curTime.getMinutes();
	var curSec = curTime.getSeconds();
	deviced[i].Xdata.push(curHour + ':' + curMinu + ':' + curSec);
	//edit by hero
	console.log('deviced[i].Xdata:' + deviced[i].Xdata);
	deviced[i].Chart.setOption({
		xAxis: {
			data: deviced[i].Xdata
		},
		series: deviced[i].data
	});
}

var intervalId = null;

//预览
function preview() {
	var preImg = {};
	var preChart = [];
	//jQuery 判断对象是否为空对象
	if ($.isEmptyObject(deviced)) {
		return false;
	} else {
		for (var i in deviced) {
			if (deviced[i].devIndex == 'bg') {
				$("#previewBox").attr("width", deviced.bg.width + 'px;');
				$("#previewBox").attr("height", deviced.bg.height + 'px;');
				$("#previewBox").attr("border", deviced.bg.borderWidth + 'px solid #002201;');
				var preHtml = '<div id="prebg" style="width:' + deviced.bg.width + 'px;height:' + deviced.bg.height + 'px;border:' + deviced.bg.borderWidth + 'px solid ' + deviced.bg.borderColor + ';background-color:' + deviced.bg.bgColor + ';position:relative;overflow:' + deviced.bg.scroll + ';"></div>';
				$('#previewBox').append(preHtml);
			} else if (deviced[i].devIndex == 8) {
				var oText = textShowMode(i);
				var preHtml = [
					' <div ',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px; border-radius: 2px; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';">',
					'	<div id="pre' + i + '"',
					' style=" background: url(&quot;' + deviced[i].openImgurl + '&quot;) 0% 0% / contain no-repeat; outline: none; border-radius: 50%;width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px;">',
					'	<p id="' + i + 'txt" style="width:100%; font-size:' + deviced[i].fontSize + 'px; font-weight:' + deviced[i].fontWeight + '; font-family:' + deviced[i].fontFamily + '; color:' + JSONToTinycolor(deviced[i].fontColor) + ';">' + oText + '</p>',
					' </div>',
					' </div>',
				].join('');
			} else if (deviced[i].devIndex == 14) {
				var width = deviced[i].w;
				var height = deviced[i].h;
				var v = Math.min(width, height);
				var preHtml = [
					' <div ',
					' style="width: ' + v + 'px; height: ' + v + 'px; padding:  ' + deviced[i].padding + 'px; border-radius:  ' + deviced[i].borderRadius + 'px; border:' + deviced[i].borderWidth + 'px solid  ' + JSONToTinycolor(deviced[i].borderColor) + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
					' <div id="pre' + i + '"',
					' style="width: 100%; height: 100%; border-radius: 50%; -webkit-tap-highlight-color: transparent; user-select: none; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';outline: none;">',
					' </div>',
					' <span',
					' style="color: ' + deviced[i].fontColor + '; display: inline-block; position: absolute; bottom: 10px;">' + deviced[i].devname + '</span>',
					' </div>',
				].join('');
			} else if (deviced[i].devIndex == 11) {
				var preHtml = [
					' <div ',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;border-radius:10%;">',
					' <button id="pre' + i + '"',
					'	style="width: 100%; height: 100%; background: url(' + deviced[i].normalImg + ') 0% 0% / cover no-repeat ' + JSONToTinycolor(deviced[i].bgColor) + '; border-radius: 10%; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; color:' + JSONToTinycolor(deviced[i].fontColor) + '; font-family:' + deviced[i].fontFamily + ';"></button>',
					' </div>',
				].join('');
			} else if (deviced[i].devIndex == 2) {
				if (deviced[i].tagtype == 'pic') {
					var oText = '';
				} else {
					var oText = deviced[i].tagtext;
				}
				var preHtml = [
					' <div ',
					'	style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + (deviced[i].y) + 'px;' + (deviced[i].y) + '">',
					'	<div id="pre' + i + '"',
					'	style="width: 100%; height: 100%; background: url(' + deviced[i].bgImg + ') 0% 0% / cover no-repeat ' + JSONToTinycolor(deviced[i].bgColor) + '; outline: none;">',
					'	<p id="' + i + 'txt"',
					'	style="width: 100%; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; font-family:' + deviced[i].fontFamily + ';background-color:' + deviced[i].bgColor + '; padding-top: 24px; color: rgb(255, 0, 0); font-family: ' + deviced[i].fontFamily + ';">' + oText + '</p>',
					'	</div>',
					'	</div>',
				].join('');
			} else if (deviced[i].devIndex == 5) {
				var preHtml = [
					' <div ',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
					' <div id="pre' + i + '"',
					' style="width: 100%; height: 100%; overflow: hidden; background-color: ' + JSONToTinycolor(deviced[i].bgColor) + '; color: ' + JSONToTinycolor(deviced[i].fontColor) + '; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; font-family:' + deviced[i].fontFamily + ';outline: none; background-size: contain;">',
					' <p id="' + i + 'txt"',
					' style="width: 100%; text-align: center; padding-top: 11px; font-family: ' + deviced[i].fontFamily + '; font-size: ' + deviced[i].fontSize + 'px; color: ' + JSONToTinycolor(deviced[i].fontColor) + ';">',
					' <span id="pre' + i + 'name"></span><span id="pre' + i + 'val"></span>',
					' </p>',
					' </div>',
					' </div>',
				].join('');
			} else if (deviced[i].devIndex == 15) {
				var preHtml = [
					' <div ',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; padding: ' + deviced[i].padding + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
					' <div id="pre' + i + '"',
					'	style="width: 100%; height: 100%; outline: none; background-color:' + JSONToTinycolor(deviced[i].bgColor) + ';">',
					'	</div>',
					' <span',
					'	style="color:' + deviced[i].fontColor + '; position: absolute; bottom: 10px; left: 0px;">' + deviced[i].devname + '</span>',
					' </div>',
				].join('');
			} else if (deviced[i].devIndex == 24) { //图表
				$('#prebg').append($('#' + i));
				$('#' + i).resizable({
					disabled: true
				});

				$('#' + i).draggable({
					disabled: true
				});
				if ($('#' + i).css('outline-style') !== 'none') {
					deviced[i].outlineStyle = $('#' + i).css('outline-style');
					$('#' + i).css('outline-style', 'none');
				}
				if (deviced[i].chartType == 'line') {
					for (var mi in deviced[i].series) {
						var chartSplitData = [];
						for (var num = 0; num <= deviced[i].chartSplit; num++) {
							chartSplitData.push({
								value: '',
								label: {
									normal: {
										show: false,
										position: 'top'
									}
								}
							});
						}
						deviced[i].seriesData[mi] = chartSplitData;
						deviced[i].data.push({
							data: deviced[i].seriesData[mi]
						});
					}
				} else if (deviced[i].chartType == 'bar') {
					for (var mi in deviced[i].series) {
						var chartSplitData = [];
						chartSplitData.push({
							value: '',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							}
						});
						deviced[i].seriesData[mi] = chartSplitData;
						deviced[i].data.push({
							data: deviced[i].seriesData[mi]
						});
					}
				}
				//edit by hero
				for (var moniId = 0; moniId < preChart.length; moniId++) {
					clearInterval(deviced[preChart[moniId]].chartInterval);
				}
				//end hero
				preChart.push(i);
				deviced[i].chartInterval = setInterval(function() {
					for (var moniId = 0; moniId < preChart.length; moniId++) {
						preCharts(preChart[moniId]);

						console.log('preChart[moniId]:' + preChart[moniId] + preChart.length);
					}
				}, 2000);
			}
			
			if (i != 'bg' && deviced[i].devIndex != 24) {
				$('#prebg').append(preHtml);
			}
			
			if (deviced[i].shape == 'circle') {
				$('#pre' + i).parent().css({
					borderRadius: '50%'
				});
				$('#pre' + i).css({
					borderRadius: '50%'
				});
			}

			if (deviced[i].devIndex == 'bg') {
				switch (deviced.bg.showmode) {
					case 'normal':
						$('#prebg').css({
							background: "url(" + deviced.bg.bgImg + ") no-repeat",
							backgroundSize: 'contain',
							backgroundColor: deviced.bg.bgColor
						});
						break;
					case 'strech':
						$('#prebg').css({
							background: "url(" + deviced.bg.bgImg + ") no-repeat",
							backgroundSize: 'cover',
							backgroundColor: deviced.bg.bgColor
						});
						break;
					case 'repeat':
						;
						$('#prebg').css({
							background: "url(" + deviced.bg.bgImg + ") repeat",
							backgroundColor: deviced.bg.bgColor
						});
						break;
					case 'none':
						$('#prebg').css({
							background: "none",
							backgroundColor: deviced.bg.bgColor
						});
						break;
				}
			} else if (deviced[i].devIndex == 8) {
				PreTextAlign(i);
			} else if (deviced[i].devIndex == 14) {
				var preId = document.getElementById('pre' + i);
				deviced[i].Chart = echarts.init(preId);
				deviced[i].Chart.setOption(deviced[i].option, true);
			} else if (deviced[i].devIndex == 11) {

				if (deviced[i].btnStyle == 'pic' || deviced[i].btnStyle == 'group') {
					preImg[i] = {};
					preImg[i].closeImgurl = new Image();
					preImg[i].closeImgurl.src = deviced[i].closeImgurl;

					preImg[i].openImgurl = new Image();
					preImg[i].openImgurl.src = deviced[i].openImgurl;
				} else {
					preImg[i] = {};
					preImg[i].closeImgurl = new Image();
					preImg[i].closeImgurl.src = '';

					preImg[i].openImgurl = new Image();
					preImg[i].openImgurl.src = '';
				}
				if (deviced[i].btnType == 'general') {
					$('#pre' + i).css({
						backgroundImage: "url(" + deviced[i].openImgurl + ")"
					}).text(deviced[i].openText);
				} else {
					$('#pre' + i).css({
						backgroundImage: "url(" + deviced[i].bgImg + ")"
					}).text(deviced[i].tagtext);
				}
				$('#pre' + i).click(function() {

					var upId = $(this).attr('id').substring(3); //截取字符串，从第三个字符开始到最后一个字符
					if (deviced[upId].btnType == 'general') {
						preImg[upId].stateValue = !deviced[upId].stateValue;
						deviced[upId].stateValue = preImg[upId].stateValue;
						var sendD = {
							state: deviced[upId].state
						};
					} else if (deviced[upId].btnType == 'ctrl') {
						var sendD = {
							state: deviced[upId].sendValue
						};
					}

					//按钮是提交按钮，点击时提交哪些数据？？？
					if (deviced[upId].btnType == 'submit') {
						$(this).parent().siblings().find('button').trigger('click');
					}

					if (deviced[upId].confirm == 'yes') {
						var dia = "<div id='configBox'style='width:400px;height:200px;'><p>请输入管理员密码（123456）</p><p><input type='password'name='Pass'id='userPass'/></p><button id='tijiao'>提交</button><button id='qixiao'>取消</button></div>";
						if ($('#configBox').length < 1) {
							$('#previewBox').append(dia);
						}

						$('#configBox').dialog({
							title: '输入管理员密码',
							width: 400,
							height: 200,
							onOpen: function() {
								var clickCount = 3;
								$('#tijiao').click(function() {
									$.ajax({
										url: "./php/yanzheng.php",
										data: {
											Pass: $('#userPass').val()
										},
										type: 'POST',
										async: false,
										error: function() {
											clickCount--;
											if (clickCount == 0) {
												$.messager.alert('提示', "ajax 连接服务器有误");
											} else {
												$.messager.show({
													title: '提示',
													msg: '正在加载中，请稍后...',
													timeout: 2000,
													showType: 'slide'
												});
												$('#tijiao').trigger('click');
											}

										},
										success: function(data) {

											if (data == 1) {
												if (deviced[upId].btnType == 'general') {
													if (preImg[upId].stateValue) {
														$('#pre' + upId).text(deviced[upId].closeText).css({
															backgroundColor: deviced[upId].albgColor,
															backgroundImage: "url(" + preImg[upId].closeImgurl.src + ")"
														});
													} else {

														$('#pre' + upId).text(deviced[upId].openText).css({
															backgroundColor: deviced[upId].bgColor,
															backgroundImage: "url(" + preImg[upId].openImgurl.src + ")"
														});
													}
												} else {
													$('#pre' + upId).text(deviced[upId].tagtext).css({
														backgroundColor: deviced[upId].bgColor,
														backgroundImage: 'url(' + deviced[upId].bgImg + ')'
													});

												}
												ctrlSend(sendD, 3);

											} else {
												$.messager.alert('提示', "您输入的密码不正确");
											}
										}
									});
								});
							}
						});
					} else if (deviced[upId].confirm == 'no') {
						if (deviced[upId].btnType == 'general') {
							if (preImg[upId].stateValue) {
								$('#pre' + upId).text(deviced[upId].closeText).css({
									backgroundColor: deviced[upId].albgColor,
									backgroundImage: "url(" + preImg[upId].closeImgurl.src + ")"
								});
							} else {
								$('#pre' + upId).text(deviced[upId].openText).css({
									backgroundColor: deviced[upId].bgColor,
									backgroundImage: "url(" + preImg[upId].openImgurl.src + ")"
								});
							}
						} else {
							$('#pre' + upId).text(deviced[upId].tagtext).css({
								backgroundColor: deviced[upId].bgColor,
								backgroundImage: 'url(' + deviced[upId].bgImg + ')'
							});

						}
						ctrlSend(sendD, 3);
					}
				});
			} else if (deviced[i].devIndex == 2) {
				PrePicShowMode(i);
				PreTextAlign(i);
			} else if (deviced[i].devIndex == 5) {
				if (deviced[i].moniShowMode == '0') {
					$('#pre' + i + 'name').text(deviced[i].devname);
					$('#pre' + i + 'val').text('');
				} else if (deviced[i].moniShowMode == '1') {
					$('#pre' + i + 'name').text('');
					$('#pre' + i + 'val').text(deviced[i].tagtext);
				} else if (deviced[i].moniShowMode == '2') {
					$('#pre' + i + 'name').text(deviced[i].devname + ' : ');
					$('#pre' + i + 'val').text(deviced[i].tagtext);
				}
				PreTextAlign(i);
			} else if (deviced[i].devIndex == 15) {
				deviced[i].dial = new canvasPanel();
				deviced[i].dial.bgColor = deviced[i].panelColor;
				deviced[i].dial.danwei = deviced[i].Unit;
				deviced[i].dial.splitNum = deviced[i].lineValue;
				deviced[i].dial.MaxNum = parseInt(deviced[i].dmaxvalue);
				deviced[i].dial.MinNum = parseInt(deviced[i].dminvalue);
				deviced[i].dial.init('pre' + i);
			} else if (deviced[i].devIndex == 20) {
				switch (deviced[i].showmode) {
					case 'normal':
						$('#pre' + i).css({
							background: "url(" + deviced[i].bgImg + ") no-repeat",
							backgroundSize: 'contain'
						});
						break;
					case 'strech':
						$('#pre' + i).css({
							background: "url(" + deviced[i].bgImg + ") no-repeat",
							backgroundSize: 'cover'
						});
						break;
					case 'repeat':
						;
						$('#pre' + i).css({
							background: "url(" + deviced[i].bgImg + ") repeat"
						});
						break;
					case 'none':
						$('#pre' + i).css({
							background: "none",
							backgroundColor: deviced[i].bgColor
						});
						break;
				}
			} else if (deviced[i].devIndex == 16) {
				$('#pre' + i).click(function() {
					OpenDoorShowInfo(deviced[i], 'previewBox');
				});
			} else if (deviced[i].devIndex == 22) {

				switch (deviced[i].MapType) {
					case 'BMap':
						PreviewBmapInit(i);
						break;
					case 'AMap':
						PreviewAmapInit(i);
						break;
					case 'qq':
						PreviewQmapInit(i);
						break;
					case 'google':
						break;
				}
			}
		}
	}
	var sendData = [];
	for (var i in deviced) {
		if (deviced[i].devIndex == 22) {
			var marker = {};
			// console.log(deviced[i].marker);
			for (var m in deviced[i].marker) {
				marker[m] = {};
				marker[m].markerId = m;
			}
			var jsonStr = {
				dev: i,
				devIndex: deviced[i].devIndex,
				devname: deviced[i].devname,
				marker: marker
			};
		} else {
			var jsonStr = {
				dev: i,
				devIndex: deviced[i].devIndex,
				devname: deviced[i].devname
			}
		}
		jsonStr.dataId = deviced[i].dataId;

		sendData[sendData.length] = jsonStr;
	}

	var JsonData = {};
	JsonData.total = sendData;
	var img = {};
	for (var k in deviced) {

		if (deviced[k].devIndex == 8) {
			img[k] = {};
			img[k].openImg = new Image();
			img[k].openImg.src = deviced[k].openImgurl;
			img[k].openImg.onload = function() {
				// img[k].openFlag = true;
			}
			img[k].closeImg = new Image();
			img[k].closeImg.src = deviced[k].closeImgurl;
			img[k].closeImg.onload = function() {
				// img[k].closeFlag = true;
			}
		}
	}
	//切换背景图时出现图片闪动的原因，每次改变背景图片时都要从服务器加载图片，并改变背景图片的地址，造成的延迟等问题。解决方案：图片预加载。
	/*$('#previewBox').empty();

	$('#contentBox').clone(true).appendTo("#previewBox");
	$('#previewBox').find('div').css({outline:'none'}); */

	var errorCount = 3;
	var doorCount = 20;
	var paintnormal = true; //用于判断刻度表是否需要更换背景色
	var paintalarm = true;
	intervalId = setInterval(function() {
		//		console.log(JSON.stringify(JsonData));
		$.ajax({
			url: 'randomData',
			data: JSON.stringify(JsonData),
			type: 'POST',
			contentType: "application/json;charset=UTF-8",
			async: false,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//console.log('XMLHttpRequest-------------------->' + JSON.stringify(XMLHttpRequest));
				if (errorCount == 0) {
					$.messager.alert('提示', "ajax 连接服务器有误,请检查");
				}
				$.messager.show({
					title: '提示',
					msg: '正在加载中，请稍后...',
					timeout: 3000,
					showType: 'slide'
				});
			},
			success: function(data) {
				//console.log(data);
				//	data = JSON.parse(data);
				for (var i = 0; i < data.length; i++) {
					for (var j in deviced) {
						if (data[i].dev == j) { //判断是哪一个控件
							if (data[i].devIndex == 8) { //判断该控件的类型，开关图片
								if (deviced[j].devnameShowMode == '1') {
									if (deviced[j].devtype == 'DefText') {
										var openText = deviced[j].devname + ' : ' + deviced[j].openText;
										var closeText = deviced[j].devname + ' : ' + deviced[j].closeText;
									} else {
										var openText = deviced[j].devname;
										var closeText = deviced[j].devname;
									}

								} else if (deviced[j].devnameShowMode == '0') {
									if (deviced[j].devtype == 'DefText') {
										var openText = deviced[j].openText;
										var closeText = deviced[j].closeText;
									} else {
										var openText = '';
										var closeText = '';
									}
								}

								if (data[i].nowValue == deviced[j].alarmValue) {

									if (data[i].nowValue == deviced[j].dopenvalue) {
										$('#pre' + j + '').css({
											backgroundImage: "url(" + img[j].openImg.src + ")"
										});
										$('#' + j + 'txt').text(openText);

									} else if (data[i].nowValue == deviced[j].dclosevalue) {
										$('#pre' + j + '').css({
											backgroundImage: "url(" + img[j].closeImg.src + ")"
										});
										$('#' + j + 'txt').text(closeText);

									}
									$('#pre' + j + 'img').parent().css({
										backgroundColor: deviced[j].albgColor
									});

								} else {
									if (data[i].nowValue == deviced[j].dopenvalue) {
										$('#pre' + j + '').css({
											backgroundImage: "url(" + img[j].openImg.src + ")"
										});
										$('#' + j + 'txt').text(openText);

									} else if (data[i].nowValue == deviced[j].dclosevalue) {
										$('#pre' + j + '').css({
											backgroundImage: "url(" + img[j].closeImg.src + ")"
										});
										$('#' + j + 'txt').text(closeText);

									}
									$('#pre' + j + 'img').parent().css({
										backgroundColor: deviced[j].bgColor
									});
								}
							} else if (data[i].devIndex == 14) { //表盘

								if (data[i].nowValue < deviced[j].alarmMinValue || data[i].nowValue > deviced[j].alarmMaxValue) {
									$('#pre' + j + '').parent().css({
										backgroundColor: deviced[j].albgColor
									});
								} else {
									$('#pre' + j + '').parent().css({
										backgroundColor: deviced[j].bgColor
									});
								}
								if (data[i].nowValue > deviced[j].option.series[0].max) {
									deviced[j].option.series[0].data[0].value = deviced[j].option.series[0].max;
								} else if (data[i].nowValue < deviced[j].option.series[0].min) {
									deviced[j].option.series[0].data[0].value = deviced[j].option.series[0].min;
								} else {
									deviced[j].option.series[0].data[0].value = data[i].nowValue;
								}

								deviced[j].Chart.setOption(deviced[j].option, true);
							} else if (data[i].devIndex == 15) { //刻度表
								if (data[i].nowValue < deviced[j].alarmMinValue || data[i].nowValue > deviced[j].alarmMaxValue) {
									$('#pre' + j + '').css({
										backgroundColor: deviced[j].albgColor
									});
									if (paintalarm) {
										paintalarm = false;
										paintnormal = true;
										deviced[j].dial.bgColor = deviced[j].alpanelColor;
										deviced[j].dial.current = data[i].nowValue;
										deviced[j].dial.paintBottom();
									}
								} else {
									$('#pre' + j + '').css({
										backgroundColor: deviced[j].bgColor
									});

									if (paintnormal) {
										paintnormal = false;
										paintalarm = true;
										deviced[j].dial.bgColor = deviced[j].panelColor;
										deviced[j].dial.current = data[i].nowValue;
										deviced[j].dial.paintBottom();
									}
								}
								if (data[i].nowValue < deviced[j].dminvalue) {
									data[i].nowValue = deviced[j].dminvalue;
								} else if (data[i].nowValue > deviced[j].dmaxvalue) {
									data[i].nowValue = deviced[j].dmaxvalue;
								}
								// deviced[j].dial.currentAmount = data[i].nowValue;
								deviced[j].dial.paintNowValue(data[i].nowValue);
							} else if (data[i].devIndex == 16) { //门禁
								doorCount--;
								if (doorCount == 0) {
									doorCount = 20;
									if (data[i].nowValue == deviced[j].openValue) {
										$('#pre' + j).css({
											backgroundImage: "url(" + deviced[j].closeImgurl + ")"
										});
										OpenDoorShowInfo(deviced[j], 'previewBox');

										setTimeout(function() {
											$('#openDoor').dialog('close');
											$('#openDoor').remove();
										}, 5000);
									} else {
										$('#pre' + j).css({
											backgroundImage: "url(" + deviced[j].openImgurl + ")"
										});
									}
								}
							} else if (data[i].devIndex == 5) { //监测点
								$('#pre' + j).css({
									backgroundColor: deviced[j].bgColor
								});
								if ((data[i].nowValue > deviced[j].alarmMaxValue) || (data[i].nowValue < deviced[j].alarmMinValue)) {
									if (deviced[j].moniShowMode == '0') {
										$('#pre' + j + 'val').text('');
									} else {
										if (deviced[j].alarmMode == 1) {
											$('#pre' + j).css({
												backgroundColor: deviced[j].albgColor
											});
										}
										$('#pre' + j + 'val').text(data[i].nowValue).css({
											backgroundColor: deviced[j].albgColor
										});
									}
								} else {
									if (deviced[j].moniShowMode == '0') {
										$('#pre' + j + 'val').text('');
									} else {
										$('#pre' + j + 'val').text(data[i].nowValue).css({
											backgroundColor: deviced[j].bgColor
										});
									}
								}
							} else if (data[i].devIndex == 22) { //地图
								for (var mk in data[i].marker) {
									if (BMoveMarker[j][mk].MarkerMove == 'move') {
										switch (deviced[j].MapType) {
											case 'BMap':
												BMapMarkMove(BMoveMarker[j][mk].Mmarker, data[i].marker[mk].pointLng, data[i].marker[mk].pointLat);
												break;
											case 'AMap':
												AMapMarkerMove(BMoveMarker[j][mk].Mmarker, data[i].marker[mk].pointLng, data[i].marker[mk].pointLat);
												break;
											case 'qq':
												QMapMarkerMove(BMoveMarker[j][mk], data[i].marker[mk].pointLng, data[i].marker[mk].pointLat);
												break;
											case 'google':
												break;
										}
									}
								}
							}
						}
					}
				}
				errorCount = 3;
			}
		});
	}, 5000);
}

//层级关系调整
function changeDevLeve(str) {
	var devAttr = $('.dev');
	for (var i = 0; i < devAttr.length; i++) {
		if (devAttr.eq(i).css('outline-style') !== 'none') {
			var nowIndex = devAttr.eq(i).css('zIndex');
			if (deviced[devAttr.eq(i).attr('id')].devFlag == 'groupBox') {
				var groupArr = devAttr.eq(i).parent().find('.dev');
				var arrLength = groupArr.length;
				for (var j = 0; j < arrLength; j++) {
					if (groupArr.eq(j).css('outline-style') !== 'none') {
						switch (str) {
							case 'top':
								//置顶时为保证层级最高，获取层级最高的节点的层级并在此基础上加1
								var num = Number(groupArr.eq(arrLength - 1).css('zIndex')) + 1;
								groupArr.eq(j).css({
									zIndex: num
								});
								deviced[groupArr.eq(j).attr('id')].zIndex = num;
								groupArr.eq(j).insertAfter(groupArr.eq(arrLength - 1));
								//devAttr.eq(length-1),插入的地方
								break;
							case 'pre':
								//1、调整层级关系，相邻的两个节点的层级调换
								//2、把相邻的两个节点的顺序调换
								//edit by lizhen 超出数组边界判断
								if (j + 1 == arrLength) {
									return;
								}
								var num = groupArr.eq(j + 1).css('zIndex');
								groupArr.eq(j + 1).css({
									zIndex: nowIndex
								});
								groupArr.eq(j).css({
									zIndex: num
								});
								deviced[groupArr.eq(j).attr('id')].zIndex = num;
								deviced[groupArr.eq(j + 1).attr('id')].zIndex = nowIndex;
								groupArr.eq(j).insertAfter(groupArr.eq(j + 1));

								break;
							case 'next':
								if (j == 0) {
									return;
								}
								var num = groupArr.eq(j - 1).css('zIndex');
								groupArr.eq(j - 1).css({
									zIndex: nowIndex
								});
								groupArr.eq(j).css({
									zIndex: num
								});
								deviced[groupArr.eq(j).attr('id')].zIndex = num;
								deviced[groupArr.eq(j - 1).attr('id')].zIndex = nowIndex;
								groupArr.eq(j).insertBefore(groupArr.eq(j - 1));
								break;
							case 'bottom':
								//置底时为保证层级最低，获取层级最低的节点的层级并在此基础上减1
								var num = Number(groupArr.eq(0).css('zIndex')) - 1;
								groupArr.eq(j).css({
									zIndex: num
								});
								deviced[groupArr.eq(j).attr('id')].zIndex = num;
								groupArr.eq(j).insertBefore(groupArr.eq(0));
								break;
						}
					}
				}
			} else {
				switch (str) {
					case 'top':
						//置顶时为保证层级最高，获取层级最高的节点的层级并在此基础上加1

						if (deviced[devAttr.eq(length - 1).attr('id')].devFlag == 'groupBox') {
							var appendId = devAttr.eq(length - 1).parent().parent();
						} else {
							var appendId = devAttr.eq(length - 1);
						}
						var num = Number(appendId.css('zIndex')) + 1;
						devAttr.eq(i).css({
							zIndex: num
						});
						deviced[devAttr.eq(i).attr('id')].zIndex = num;
						devAttr.eq(i).insertAfter(appendId);
						//devAttr.eq(length-1),插入的地方
						break;
					case 'pre':
						//1、调整层级关系，相邻的两个节点的层级调换
						//2、把相邻的两个节点的顺序调换
						//edit by lizhen ，修复数组越界 20181126
						if (i + 1 == devAttr.length) {
							return;
						}
						if (deviced[devAttr.eq(i + 1).attr('id')].devFlag == 'groupBox') {
							var appendId = devAttr.eq(i + 1).parent().parent();
						} else {
							var appendId = devAttr.eq(i + 1);
						}
						var num = appendId.css('zIndex');
						appendId.css({
							zIndex: nowIndex
						});
						devAttr.eq(i).css({
							zIndex: num
						});
						deviced[devAttr.eq(i).attr('id')].zIndex = num;
						deviced[appendId.attr('id')].zIndex = nowIndex;
						devAttr.eq(i).insertAfter(appendId);

						break;
					case 'next':
						//edit by lizhen ，修复数组越界 20181126
						if (i == 0) {
							return;
						}
						if (deviced[devAttr.eq(i - 1).attr('id')].devFlag == 'groupBox') {
							var appendId = devAttr.eq(i - 1).parent().parent();
						} else {
							var appendId = devAttr.eq(i - 1);
						}
						var num = appendId.css('zIndex');
						appendId.css({
							zIndex: nowIndex
						});
						devAttr.eq(i).css({
							zIndex: num
						});
						deviced[devAttr.eq(i).attr('id')].zIndex = num;
						deviced[appendId.attr('id')].zIndex = nowIndex;
						devAttr.eq(i).insertBefore(appendId);
						break;
					case 'bottom':
						//置底时为保证层级最低，获取层级最低的节点的层级并在此基础上减1
						var num = Number(devAttr.eq(0).css('zIndex')) - 1;
						devAttr.eq(i).css({
							zIndex: num
						});
						deviced[devAttr.eq(i).attr('id')].zIndex = num;
						devAttr.eq(i).insertBefore(devAttr.eq(0));
						break;
				}
			}
		}
	}
}

function property_change(devIndex, dataId) {
	//属性列表的切换
	$('#t_property').find('tr').hide();
	$('.static').show();
	$('.fontStyle').show();
	if (devIndex == 8) { //开关图片
		$('#tr_i_deviceid').show();
		$('#tr_i_bjcolor').show();
		$('#tr_i_alarmbjcolor').show();
		$('#tr_xingwei').show();
		$('#tr_i_devtype').show();
		$('#tr_i_alarmshowvalue').show();
		$('#tr_i_inverse').show();
		if (deviced[dataId].devtype == "Definde") {
			$('#tr_i_userDefinde').show();
			$('#tr_i_dopenimgurl').show();
			$('#tr_i_dcloseimgurl').show();
			$('#tr_i_shape').show();
		} else if (deviced[dataId].devtype == "DefText") {
			$('#tr_i_devnameShowMode').show();
			$('#tr_i_userDefinde').show();
			$('#tr_i_dopenText').show();
			$('#tr_i_dcloseText').show();
			$('#tr_i_inverse').hide();
			$('#tr_i_textAlign').show();
			$('#tr_i_font').show();
			textAlign(dataId);
		}
	} else if (devIndex == 14) { //表盘
		$('#tr_i_lineStyle').show();
		$('#tr_i_deviceid').show();
		$('#tr_i_dmaxvalue').show();
		$('#tr_i_dminvalue').show();
		$('#tr_i_bjcolor').show();
		$('#tr_i_alarmbjcolor').show();
		$('#tr_i_panelStyle').show();
		$('#tr_i_panStyle').show();
		$('#tr_i_panelColor').show();
		$('#i_panelColor').spectrum({
			showInput: true, //颜色值input
			showAlpha: true, //透明度选择
			showPalette: true, //左边显示选过的颜色
			clickoutFiresChange: true, //点击色盘外部可选中颜色
			showInitial: true, //当前值与选中值对比
			chooseText: "应用",
			cancelText: "取消"
		});
		$('#tr_i_alarmMinValue').show();
		$('#tr_i_alarmMaxValue').show();
	} else if (devIndex == 11) { //控制按钮
		$('#tr_i_btnType').show();
		$('#tr_i_deviceid').show();
		$('#tr_i_confirm').show();
		$('#tr_i_shape').show();
		$('#tr_i_btnTogger').show();
		if (deviced[dataId].btnStyle == 'text') {
			if (deviced[dataId].btnType == 'general') {
				$('#tr_i_dopenText').show();
				$('#tr_i_dcloseText').show();
				$('#tr_i_bjcolor').show();
				$('#tr_i_alarmbjcolor').show();
			} else if (deviced[dataId].btnType == 'ctrl') {
				$('#tr_i_tagtext').show();
				$('#tr_i_bjcolor').show();
				$('#tr_i_sendValue').show();
			} else if (deviced[dataId].btnType == 'submit') {
				$('#tr_i_tagtext').show();
				$('#tr_i_bjcolor').show();
			}
			$('#tr_i_font').show();
		} else if (deviced[dataId].btnStyle == 'pic') {
			if (deviced[dataId].btnType == 'general') {
				$('#tr_i_dopenimgurl').show();
				$('#tr_i_dcloseimgurl').show();
			} else if (deviced[dataId].btnType == 'ctrl') {
				$('#tr_i_bj').show();
				$('#tr_i_sendValue').show();
			} else if (deviced[dataId].btnType == 'submit') {
				$('#tr_i_bj').show();
			}
		} else if (deviced[dataId].btnStyle == 'group') {
			if (deviced[dataId].btnType == 'general') {
				$('#tr_i_dopenText').show();
				$('#tr_i_dcloseText').show();
				$('#tr_i_dopenimgurl').show();
				$('#tr_i_dcloseimgurl').show();
			} else if (deviced[dataId].btnType == 'ctrl') {
				$('#tr_i_tagtext').show();
				$('#tr_i_bj').show();
				$('#tr_i_sendValue').show();
			} else if (deviced[dataId].btnType == 'submit') {
				$('#tr_i_tagtext').show();
				$('#tr_i_bj').show();
			}
			$('#tr_i_font').show();
		}
	} else if (devIndex == 20) { //分组面板
		$('#tr_i_showmode').show();
		$('#tr_i_bj').show();
		$('#tr_i_bjcolor').show();
	} else if (devIndex == 2) { //静态标签
		$('#tr_i_tagtype').show();
		$('#tr_i_linkorgidstatus').show();
		$('#tr_i_textAlign').show();
		if (deviced[dataId].tagtype == 'pic') {
			$('#tr_i_bj').show();
			$('#tr_i_linkorgid').show();
			$('#tr_i_showmode').show();
			$('#tr_i_textAlign').hide();
		} else if (deviced[dataId].tagtype == 'text') {
			$('#tr_i_tagtext').show();
			$('#tr_i_font').show();
			$('#tr_i_bjcolor').show();
			textAlign(dataId);
		} else if (deviced[dataId].tagtype == 'group') {
			$('#tr_i_bj').show();
			$('#tr_i_linkorgid').show();
			$('#tr_i_showmode').show();
			$('#tr_i_tagtext').show();
			$('#tr_i_font').show();
			$('#tr_i_linkorgidstatus').show();
			textAlign(dataId);
		}
	} else if (devIndex == 5) { //监测点信息
		$('#tr_i_deviceid').show();
		$('#tr_i_moniShowMode').show();
		$('#tr_i_font').show();
		$('#tr_i_bjcolor').show();
		$('#tr_i_alarmbjcolor').show();
		$('#tr_i_textAlign').show();

		if (deviced[dataId].moniShowMode == '0') {
			$('#tr_i_alarmbjcolor').hide();
		} else if (deviced[dataId].moniShowMode == '1') {
			$('#tr_i_alarmMinValue').show();
			$('#tr_i_alarmMaxValue').show();
		} else if (deviced[dataId].moniShowMode == '2') {
			$('#tr_i_alarmMinValue').show();
			$('#tr_i_alarmMaxValue').show();
			$('#tr_i_alarmMode').show();
		}
		textAlign(dataId);
	} else if (devIndex == 15) { //刻度盘

		$('#tr_i_deviceid').show();
		$('#tr_i_dmaxvalue').show();
		$('#tr_i_dminvalue').show();
		$('#tr_i_alarmMinValue').show();
		$('#tr_i_alarmMaxValue').show();
		$('#tr_i_bjcolor').show();
		$('#tr_i_alarmbjcolor').show();
		$('#tr_i_panelName').show();
		$('#tr_i_Unit').show();
		$('#tr_i_lineValue').show();
		$('#tr_i_panelColor').show();
		$('#i_panelColor').spectrum({
			showInput: true, //颜色值input
			showAlpha: true, //透明度选择
			showPalette: true, //左边显示选过的颜色
			clickoutFiresChange: true, //点击色盘外部可选中颜色
			showInitial: true, //当前值与选中值对比
			chooseText: "应用",
			cancelText: "取消"
		});
		$('#tr_i_alpanelColor').show();
		$('#i_alpanelColor').spectrum({
			showInput: true, //颜色值input
			showAlpha: true, //透明度选择
			showPalette: true, //左边显示选过的颜色
			clickoutFiresChange: true, //点击色盘外部可选中颜色
			showInitial: true, //当前值与选中值对比
			chooseText: "应用",
			cancelText: "取消"
		});
	} else if (devIndex == 16) { //门禁
		$('#tr_i_OpenStateValue').show();
		$('#tr_i_DoorState').show();
		$('#tr_i_OpenDoorState').show();
		$('#tr_i_CardReader').show();
	} else if (devIndex == 24) { //图表
		$('#tr_i_addMoniState').show();
		$('#tr_i_chartType').show();
		$('#tr_i_titleText').show();

		if (deviced[dataId].chartType == 'line') {
			$('#tr_i_chartSplit').show();
		}
		if (deviced[dataId].moniIndex !== null) {
			$('.tr_i_monis' + dataId).show();
		}
	}

}

function property_change_mult_select() {
	//属性列表的切换
	$('#t_property').find('tr').hide();
	$('.static').show();
}


function JSONToTinycolor(colvar) {
	try {
		if (typeof colvar == "object") {
			var color = tinycolor();
			color._r = colvar._r;
			color._g = colvar._g;
			color._b = colvar._b;
			color._a = colvar._a;
			//return color;
			return 'rgba(' + colvar._r + ',' + colvar._g + ',' + colvar._b + ',' + colvar._a + ')';
		}
	} catch (e) {}
	return colvar;
}