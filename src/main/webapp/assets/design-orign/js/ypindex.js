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
//海康视频全局变量
var m_iNowChanNo = -1; //当前通道号
var m_iLoginUserId = -1; //注册设备用户ID
var m_iChannelNum = -1; //模拟通道总数
var m_bDVRControl = null; //OCX控件对象
var m_iProtocolType = 0; //协议类型，0 – TCP， 1 - UDP
var m_iStreamType = 0; //码流类型，0 表示主码流， 1 表示子码流
var m_iPlay = 0; //当前是否正在预览
var m_iRecord = 0; //当前是否正在录像
var m_iTalk = 0; //当前是否正在对讲
var m_iVoice = 0; //当前是否打开声音
var m_iAutoPTZ = 0; //当前云台是否正在自转
var m_iPTZSpeed = 4; //云台速度

//图表控件全局变量
//var moniCount = 0;//哪个图表控件，添加的监测点个数
//var moniIndex = null;//点击的是哪个图表控件的哪个监测点
//var Xdata = [];//哪个图表控件的坐标轴

function unique(arr) {
	var result = [],
		isRepeated;
	for (var i = 0, len1 = arr.length; i < len1; i++) {
		isRepeated = false;
		for (var j = 0, len = result.length; j < len; j++) {
			if (arr[i] == result[j]) {
				isRepeated = true;
				break;
			}
		}
		if (!isRepeated) {
			result.push(arr[i]);
		}
	}
	return result;
}

function dclick(index) {
	var html = null;
	devId = 'dev_' + count;
	var zIn = 800 + count;
	html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:102px;height:132px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;background-size:contain;"></div></div>';
	if (index == 8) { //开关量
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:102px;height:132px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;background-size:contain;"><p id="p' + devId + 'img" style="width:100%;font-size:14px;color:#333;"></p></div></div>';
	} else if (index == 14) { //表盘
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:200px;height:200px;padding:2px;border-radius:50%;border:1px solid #ccc;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:200px;height:200px;border-radius:50%;"></div><span></span></div>';
	} else if (index == 11) { //控制按钮
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:60px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><button id="' + devId + 'img" style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;border-radius:10%;background-size:cover;font-size:14px;font-weight:bold;"></button></div>';
	} else if (index == 20) { //分组面板
		html = '<div id="' + devId + '"class="dev"data-index="' + index + '"data-group="group"style="width:300px;height:300px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" data-Box="groupBox"style="position:relative;width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;"></div></div>';
	} else if (index == 2) { //静态标签
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;"></div></div>';
	} else if (index == 5) { //监测点
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%;overflow:hidden;background-color:rgba(0,0,0,0);color:#333;font-size:14px;font-weight:bold;"><p id="p' + devId + 'img"style="width:100%;"><span id="' + devId + 'name">监测点</span><span id="' + devId + 'val"></span></p></div></div>';
	} else if (index == 15) { //刻度盘
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:110px;height:230px;padding:2px;border:1px solid #ccc;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%;"></div><span></span></div>';

	} else if (index == 16) { //门禁
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:60px;height:100px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%;background:url(./images/' + index + '.png) no-repeat;background-size:contain;"></div></div>';
	} else if (index == 22) { //地图
		html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:700px;height:450px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'map" style="width:100%;height:100%;overflow:hidden;"></div><div id="' + devId + 'img" class="mapDrag"style="position:absolute;left:0px;top:-24px;width:20px;height:20px;background:url(./images/move.jpg);border:1px solid #666;"></div></div>';
	} else if (index == 23) { //视频

		html = '<div id="' + devId + '" class="dev video" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:700px;height:500px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';background:#5c5c5c;"><p style="width:100%;height:30px;font:16px bolder 微软雅黑;color:#fff;margin-left:10px;">视频监控</p><div id="' + devId +
			'tv" style="width:70%;height:90%;float:left;border:1px solid #ccc;margin-left:10px;position:relative;"><p id="tvtishi"style="position:absolute;color:#fff;left:100px;top:180px;font-size:16px;font-weight:bold;width:300px;display:none;">因控件的限制，该控件仅支持IE浏览器</p></div><div id="' + devId +
			'ctrl"style="width:175px;height:90%;float:left;margin-left:10px;"><div id="playbtn" style="margin-left:5px;color:#fff;"><p style="margin-left:5px;color:#fff;">通道选择：<select id="channel"></select></p><button id="startPreview" data-dev="' + devId + '"class="ctrlbtn">开始预览</button><button id="stopPreview"class="ctrlbtn"data-dev="' + devId + '">停止预览</button><button id="startVideo"data-dev="' + devId + '"class="ctrlbtn">开始录像</button><button id="stopVideo"data-dev="' + devId +
			'"class="ctrlbtn">停止录像</button><button id="openall"class="ctrlbtn"data-dev="' + devId + '">全部打开</button><button id="closeall"class="ctrlbtn"data-dev="' + devId + '">全部关闭</button><button id="capture"data-dev="' + devId + '"class="ctrlbtn">抓图</button><button id="fullScreen"data-dev="' + devId + '"class="ctrlbtn">全屏</button></div><div id="' + devId + 'console"style="width:160px;height:150px;margin-left:10px;margin-top:5px;"> <button class="yt2 yt"data-dev="' + devId +
			'" href="javascript:;" ></button><button class="yt4 yt"data-dev="' + devId + '"href="javascript:;" ></button><button class="yt5 yt" data-dev="' + devId + '" href="javascript:;" id="cptz"></button><button class="yt6 yt" data-dev="' + devId + '"href="javascript:;"></button><button class="yt8 yt"data-dev="' + devId + '" href="javascript:;" ></button></div><table style="color:#fff;margin:0 auto 5px;"><tr><td><button id="focus_minus"class="ctrlb"data-dev="' + devId +
			'">-</button></td><td>调焦</td><td><button id="focus_plus" class="ctrlb"data-dev="' + devId + '">+</button></td></tr><tr><td><button id="zoom_minus"class="ctrlb"data-dev="' + devId + '">-</button></td><td>变倍</td><td><button id="zoom_plus"class="ctrlb"data-dev="' + devId + '">+</button></td></tr> <tr><td><button  id="aperture_minus"class="ctrlb"data-dev="' + devId + '">-</button></td><td>光圈</td><td><button id="aperture_plus" class="ctrlb"data-dev="' + devId +
			'">+</button></td></tr></table><p style="margin-bottom:5px;margin-left:5px;color:#fff;">预置点:<select id="presetPoint"data-dev="' + devId + '"style="width:80px;margin-left:5px;"></select></p><button id="preset" class="prePoint">预置</button><button id="use"data-dev="' + devId + '"class="prePoint">调用</button></div><div id="' + devId +
			'img" class="mapDrag"style="position:absolute;left:0px;top:-24px;width:20px;height:20px;background:url(./images/move.jpg);border:1px solid #666;z-index:10px;"></div></div>';
		//<button id="capture"data-dev="'+devId+'"class="ctrlbtn">抓图</button>
	} else if (index == 24) { //图表控件
		html = '<div id="' + devId + '" class="dev chart" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:400px;height:300px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%;"></div></div>';
	}
	count++;
	falg = true;
	return html;
}

$(function() {
	$('.colorPicker').spectrum({
		showInput: true, //颜色值input
		showAlpha: true, //透明度选择
		showPalette: true, //左边显示选过的颜色
		clickoutFiresChange: true, //点击色盘外部可选中颜色
		showInitial: true, //当前值与选中值对比
		chooseText: "应用",
		cancelText: "取消"
	});
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
			onStopResize: function(e) {

			}
		});
		$("#selele").find("[data-Id='bg']").attr('selected', 'selected').siblings().removeAttr('selected');

		var title = $("#selele").find("[data-Id='bg']").text();
		$('#eastBox').panel('setTitle', '属性[　' + title + ']');
		//select 器件类型中火狐对selected的解析不一样，导致出现错误。但不报错，网上搜索的解决方案在select中添加属性autocomplete="off"，但添加后未能解决问题
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
				normalImg: './images/' + menuIndex + '.png',
				mename: $('[data-Id=' + devId + ']').val(),
				devlevel: '',
				zIndex: $('#' + devId).css('zIndex'),
				devFlag: DevFlag,
				appendTarget: $target.parent().attr('id'),
				outlineStyle: 'none',
			};

			if (deviced[devId].devIndex == 8) {
				//开关图片属性
				deviced[devId].bgColor = "rgba(0,0,0,0)";
				deviced[devId].albgColor = "rgba(0,0,0,0)";
				deviced[devId].dopenvalue = "0";
				deviced[devId].dclosevalue = "1";
				deviced[devId].openImgurl = "./images/1.png";
				deviced[devId].closeImgurl = "./images/8.png";
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
				deviced[devId].openImgurl = "./images/11.png";
				deviced[devId].closeImgurl = "./images/c11.png";
				deviced[devId].bgColor = "#c1c1c1";
				deviced[devId].albgColor = "#c1c1c1";
				deviced[devId].openText = "";
				deviced[devId].closeText = "";
				deviced[devId].shape = 'rectangle';
				deviced[devId].confirm = "no";
				deviced[devId].btnType = 'general';
				deviced[devId].state = false; //当前状态
				deviced[devId].bgImg = "./images/btn.png";
				deviced[devId].fontColor = "#333333";
				deviced[devId].fontSize = "14";
				deviced[devId].fontFamily = "Arial";
				deviced[devId].fontWeight = "bold";

			} else if (deviced[devId].devIndex == 20) { //分组面板
				deviced[devId].bgImg = './images/20.png';
				deviced[devId].bgColor = '#ffffff';
				deviced[devId].showmode = 'normal';
				groupFlag = true;

			} else if (deviced[devId].devIndex == 2) { //静态标签

				deviced[devId].bgImg = './images/2.png';
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

			} else if (deviced[devId].devIndex == 16) { //门禁
				deviced[devId].openValue = '0'; //门打开值
				deviced[devId].CardReader = "";
				deviced[devId].OpenDoorState = "";
				deviced[devId].DoorState = "";
				deviced[devId].openImgurl = "./images/c16.png";
				deviced[devId].closeImgurl = "./images/16.png";
				deviced[devId].avatar = "./images/head.jpg";
				deviced[devId].depart = "";
				deviced[devId].posName = "";
				deviced[devId].nameInfo = "";
				deviced[devId].CardCode = "";
			} else if (deviced[devId].devIndex == 22) { //地图
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						browersLng = (position.coords.longitude); //经度
						browersLat = (position.coords.latitude); //纬度
						deviced[devId].MapZoom = 14;
						deviced[devId].MapLng = browersLng || '113.43262';
						deviced[devId].MapLat = browersLat || '23.17229';
						deviced[devId].MapType = 'BMap';
						BMapinitialize(devId); //百度地图

					}, function(error) {
						deviced[devId].MapZoom = 14;
						deviced[devId].MapLng = browersLng || '113.43262';
						deviced[devId].MapLat = browersLat || '23.17229';
						deviced[devId].MapType = 'BMap';
						BMapinitialize(devId); //百度地图
					}, {
						// 指示浏览器获取高精度的位置，默认为false
						// enableHighAccuracy: true,
						// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
						timeout: 1000,
						// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
						// maximumAge: 3000
					});
				} else {
					deviced[devId].MapZoom = 14;
					deviced[devId].MapLng = browersLng || '113.43262';
					deviced[devId].MapLat = browersLat || '23.17229';
					deviced[devId].MapType = 'BMap';
					BMapinitialize(devId); //百度地图
				}
			} else if (deviced[devId].devIndex == 23) { //视频
				$('.ctrlbtn').css({
					width: '80px',
					height: '30px',
					background: 'transparent',
					color: '#fff',
					marginLeft: '5px',
					marginTop: '5px'
				}).hover(function() {
					$(this).css({
						backgroundColor: 'rgba(239, 129, 33, 0.8)'
					});
				}, function() {
					$(this).css({
						background: 'transparent'
					});
				});
				$('.ctrlb').css({
					border: '2px solid #ccc',
					background: 'transparent',
					width: '20px',
					height: '20px',
					lineHeight: '20px',
					margin: '3px',
					color: '#fff',
					fontSize: '16px',
					fontWeight: 'bold'
				}).hover(function() {
					$(this).css({
						backgroundColor: 'rgba(239, 129, 33, 0.8)'
					});
				}, function() {
					$(this).css({
						background: 'transparent'
					});
				});
				$('.yt2').css({
					marginLeft: '56px',
					marginRight: '53px',
					background: 'transparent url(./images/up.png)'
				});
				$('.yt4').css({
					background: 'transparent url(./images/left.png)',
					marginLeft: '6px',
				});
				$('.yt5').css({
					background: 'transparent url(./images/auto.png)',
					marginLeft: '3px',
					marginRight: '3px'
				});
				$('.yt6').css({
					background: 'transparent url(./images/right.png)',
					marginRight: '3px'
				});
				$('.yt8').css({
					marginLeft: '56px',
					marginRight: '53px',
					background: 'transparent url(./images/down.png)'
				});
				$('.yt').css({
					display: 'inline-block',
					width: '47px',
					height: '47px',
					borderRadius: '50%',
					border: '3px solid #ccc'
				}).hover(function() {
					$(this).css({
						position: 'relative',
						left: '-1px',
						top: '-2px',
						backgroundColor: 'rgba(239, 129, 33, 0.8)'
					});
				}, function() {
					$(this).css({
						position: 'relative',
						left: 0,
						top: 0,
						backgroundColor: 'transparent'
					});
				});
				$('.prePoint').css({
					color: '#fff',
					width: '80px',
					height: '30px',
					background: 'rgba(0,0,0,0.4)',
					borderRadius: '5px',
					marginLeft: '5px'
				}).hover(function() {
					$(this).css({
						backgroundColor: 'rgba(239, 129, 33, 0.8)'
					});
				}, function() {
					$(this).css({
						background: 'rgba(0,0,0,0.4)'
					});
				});

				deviced[devId].host = '';
				deviced[devId].port = '37777';
				deviced[devId].account = 'admin';
				deviced[devId].password = 'admin';
				deviced[devId].servertype = 'VC3200';
				deviced[devId].bgColor = '#5c5c5c';
				deviced[devId].visionType = 'hk';
				if (Sys.ie == 'ie') {
					hkvisiionPlayZoom(devId);
					$('#tvtishi').remove();
				} else {
					$('#tvtishi').show();
				}

				/*ocx = document.getElementById('ocx');
				ocx.LoginDeviceEx(deviced[devId].host,deviced[devId].port,deviced[devId].account, deviced[devId].password , 0);//配置设备登录信息
				ocx.SetDeviceMode(0, 1);//设置语音对讲模式
				var channelstr = ocx.GetChannelName();//返回通道名称字符串
				ocx.ConnectRealVideo(通道[0--num], 码流型号[0,1]);
				ocx.ConnectRealVideo(0, 1);//连接设备
				console.log(ocx.NetType);
				console.log(ocx.GetLoginID());//获取登陆的ID
				console.log(ocx.LogoutDevice());//退出登录
				ocx.CloseLocalPlay();//关闭本地播放
				ocx.DisConnectRealVideo(b);//切断设备连接
				ocx.ControlTalking(1);//语音控制
				ocx.GetColor();//获取当前选中窗口的颜色信息
				ocx.SetColor(0, gca, gcb, gcc, gcd);
				ocx.DisConnectAllChannel();//切断所有通道连接
				ocx.ConnectChannels(0, 16, b);
				ocx.GetChannelName();
				ocx.ConnectAllChannelEx(settings.openall);
				ocx.BeepAlarmControl(0);
				ocx.ResumeCurRealPlay();
				ocx.ConnectRealVideoEx(a, playInfoRecBak[a].state, playInfoRecBak[a].windowID);//连接所有通道
				ocx.ShowPlayback();
				ocx.ShowAlarm();
				ocx.AboutBox();
				ocx.SetPlayPos(a);//预置点设置
				ocx.ControlPtz(51, 0, 0, 0, 0);//云台设置
				// alert(deviced[dId].ocx.GetChannelTotall());//获取通道数
				///deviced[dId].ocx.ConfirmReboot();重启
				//console.log(deviced[dId].ocx.GetConvertStringFunc());//返回：297024771
				//console.log(deviced[dId].ocx.GetChannelTotall());//返回：通道总个数
				//console.log(deviced[dId].ocx.GetLangStyle());//返回：空
				//console.log(deviced[dId].ocx.GetDevConfig(3));//返回：11
				//console.log(deviced[dId].ocx.GetChannelName());//返回：所有通道的通道名称
				*/
				/******视频设备控制台*******/

				//视频开始预览
				$('#startPreview').click(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var channel = Number($('#channel').val());
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						deviced[dId].ocx.ConnectRealVideo(channel, 1); //连接设备
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.StartRealPlay(channel, m_iProtocolType, m_iStreamType);
					}
				});
				//停止预览
				$('#stopPreview').click(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var channel = Number($('#channel').val());
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						deviced[dId].ocx.DisConnectRealVideo(channel);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.StopRealPlay();
					}
				});
				//开始录像
				$('#startVideo').click(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(!0, 'SetPatternBegin', 3, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.StartRecord("C:/OCXRecordFiles");
					}

				});
				//停止录像
				$('#stopVideo').click(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(!0, 'SetPatternEnd', 3, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.StopRecord(1);
					}

				});

				//全部打开
				$('#openall').click(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					/*deviced[dId].ocx.DisConnectAllChannel();//断开所有通道
					deviced[dId].ocx.ConnectChannels(0, 16, 1);//打开所有通道*/
					deviced[dId].ocx.ConnectAllChannelEx(1); //打开所有通道的实时监控，参数 1--主码流,2--辅码流
				});
				//全部关闭
				$('#closeall').click(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					deviced[dId].ocx.DisConnectAllChannel(); //关闭所有通道的实时监控
				});
				//全屏
				$('#fullScreen').click(function() {
					/*var title = $('.tabs-selected').text();
					if(title=="组态图设计"){
						return false;
					}*/
					var dId = $(this).attr('data-dev');
					var script = document.createElement("script");
					script.language = "JavaScript";
					script.htmlFor = "HIKOBJECT1"; //for=对象
					script.event = "FullScreen()"; //对象事件
					script.text = "console.log(111);";
					document.body.appendChild(script);
				});
				//向上
				$('.yt2').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'Up', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(0, m_iPTZSpeed);
					}

				});
				$('.yt2').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'Up', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}

				});
				//向左
				$('.yt4').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'Left', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(2, m_iPTZSpeed);
					}
				});
				$('.yt4').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'Left', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}

				});
				//自转
				$('.yt5').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzEx(this);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(10, m_iPTZSpeed);
					}
				});
				$('.yt5').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {

					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//向右
				$('.yt6').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'Right', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(3, m_iPTZSpeed);
					}
				});
				$('.yt6').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'Right', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//向下
				$('.yt8').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'Down', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(1, m_iPTZSpeed);
					}
				});
				$('.yt8').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'Down', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//变倍+
				$('#zoom_plus').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'ZoomTele', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(5, m_iPTZSpeed);
					}

				});
				$('#zoom_plus').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'ZoomTele', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}

				});
				//变倍—
				$('#zoom_minus').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'ZoomWide', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(4, m_iPTZSpeed);
					}

				});
				$('#zoom_minus').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'ZoomWide', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//调焦+
				$('#focus_plus').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'FocusFar', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(7, m_iPTZSpeed);
					}

				});
				$('#focus_plus').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}

					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'FocusFar', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//调焦-
				$('#focus_minus').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'FocusNear', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(6, m_iPTZSpeed);
					}

				});
				$('#focus_minus').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}

					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'FocusNear', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//光圈+
				$('#aperture_plus').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'IrisLarge', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(8, m_iPTZSpeed);
					}

				});
				$('#aperture_plus').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}

					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'IrisLarge', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//光圈-
				$('#aperture_minus').mousedown(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}
					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(true, 'IrisSmall', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStart(9, m_iPTZSpeed);
					}

				});
				$('#aperture_minus').mouseup(function() {
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}

					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						cptzd(false, 'IrisSmall', 5, 0);
					} else if (deviced[dId].visionType == 'hk') {
						m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
					}
				});
				//预置点设置
				$('#preset').click(function() {
					//获取当前摄像头的位置信息及状态信息，添加到下拉列表$('#presetPoint')
					// console.log(!0);
					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}

					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {
						var dId = $(this).attr('data-dev');
						deviced[dId].ocx.SetPlayPos(1); //预置点设置

					} else if (deviced[dId].visionType == 'hk') {
						var iPreset = parseInt(document.getElementById("presetPoint").value);
						var bRet = m_bDVRControl.PTZCtrlSetPreset(iPreset);
					}

				});
				//应用预置点
				$('#use').click(function() {
					//发送命令使摄像头快速转动到下拉列表显示的预置点位置

					var title = $('.tabs-selected').text();
					if (title == "组态图设计") {
						return false;
					}

					var dId = $(this).attr('data-dev');
					if (deviced[dId].visionType == 'dh') {

					} else if (deviced[dId].visionType == 'hk') {
						var iPreset = parseInt(document.getElementById("presetPoint").value);
						var bRet = m_bDVRControl.PTZCtrlGotoPreset(iPreset);
					}
				});
			} else if (deviced[devId].devIndex == 24) { //图表
				deviced[devId].titleText = '机房';
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
							if (zoneBox.parent().parent().attr('data-index') != 20) {
								deviced[zoneId].devFlag = "";
								$('#resizeBox').append($(this));
							} else {
								deviced[zoneId].devFlag = "groupBox";
								zoneBox.parent().append($(this));
							}
							$(this).css({
								left: (zoneLeft + devLeft) + 'px',
								top: (zoneTop + devTop) + 'px'
							});
						}
					}

					var Left = $(this).position().left;
					var Top = $(this).position().top;
					var devArr = $(this).siblings();
					for (var i = 0; i < devArr.length; i++) {
						if (deviced[devArr.eq(i).attr('id')].devIndex == 20) {
							if (devArr.eq(i).css('zIndex') < $(this).css('zIndex')) {
								var panelLeft = devArr.eq(i).position().left;
								var panelTop = devArr.eq(i).position().top;
								var panelRight = devArr.eq(i).width() + panelLeft;
								var panelBottom = devArr.eq(i).height() + panelTop;
								if (Left < panelRight && Left > panelLeft && Top > panelTop && Top < panelBottom) {
									devArr.eq(i).children(":first").append($(this));
									var x = Left - panelLeft;
									var y = Top - panelTop;
									$(this).css({
										left: x + 'px',
										top: y + 'px'
									});
									deviced[zoneId].devFlag = 'groupBox';
								}
							}
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


				if ($(this).css('outline-style') !== 'none') {
					if (deviced[$(this).attr('id')].devFlag == 'groupBox') {
						//当选中的是分组面板里面的元素时，禁止分组面板的拖动
						$(this).parent().parent().draggable({
							disabled: true
						});
						$(this).draggable({
							disabled: false
						});
					} else if (deviced[$(this).attr('id')].devFlag != 'groupBox') {
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
					}
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


				$('#eastBox').panel('setTitle', '属性[　' + title + ']');
				//select 器件类型中火狐对selected的解析不一样，导致出现错误。但不报错，网上搜索的解决方案在select中添加属性autocomplete="off"，但添加后未能解决问题

				var devIndex = $(this).attr('data-index');

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
				} else if (devIndex == 22) { //地图
					$('#tr_i_MapType').show();
					$('#tr_i_MapZoom').show();
					$('#tr_i_MapLng').show();
					$('#tr_i_MapLat').show();
					$('#tr_i_Marker').show();
					$('#tr_i_devGroupId').show();
					$('#tr_i_MarkerLng').show();
					$('#tr_i_MarkerLat').show();
					$('#tr_i_MarkerLable').show();
					$('#tr_i_bjcolor').show();
					$('#tr_i_alarmbjcolor').show();
					$('#i_MarkerLng').attr('readonly', true);
					$('#i_MarkerLat').attr('readonly', true);
					$('#' + dataId + 'img').show();
					$('#tr_i_MarkerMove').show();
					if (markerID !== null) {
						var MarkerMove = deviced[dataId].marker[markerID].MarkerMove;
						if (MarkerMove == 'move') {
							$('#tr_i_moniDevId').show();
						} else if (MarkerMove == 'fixed') {
							$('#tr_i_moniDevId').hide();
						}
					}
				} else if (devIndex == 23) { //视频
					$('#tr_dvr').show();
					$('#tr_dvr_host').show();
					$('#tr_dvr_port').show();
					$('#tr_dvr_account').show();
					$('#tr_dvr_password').show();
					// $('#tr_dvr_servertype').show();
					$('#' + dataId + 'img').show();
					$('#tr_i_bjcolor').show();
					$('#tr_dvr_visionType').show();
					if (deviced[dataId].visionType == 'hk') {
						$('#tr_dvr_row').show();
						$('#tr_dvr_col').show();
					}
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

	//设备组
	$('#i_linkorgid').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
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
	//开门显示信息设置
	/*$('#i_OpenDoorInfo').focus(function(){
		var devArr= $('.dev');
		for(var i=0;i<devArr.length;i++){
			if(devArr.eq(i).css('outline-style')!=='none'){
				var upId = devArr.eq(i).attr('id');
				OpenDoorShowInfo(deviced[upId],'contentBox');
			}
		}
	});*/

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
				} else if (deviced[devArr.eq(i).attr('id')].devIndex == 22) {

					deviced[devArr.eq(i).attr('id')].marker[markerID].bgColor = normalColor;
					switch (deviced[devArr.eq(i).attr('id')].MapType) {
						case 'BMap':
							deviced[devArr.eq(i).attr('id')].marker[markerID].Label.setStyle({
								background: normalColor
							});
							break;
						case 'AMap':
							break;
						case 'qq':
							deviced[devArr.eq(i).attr('id')].marker[markerID].Label.setStyle({
								background: normalColor
							});
							break;
						case 'google':
							break;
					}
					return false;
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
		fileDialog('subFile.php', 'i_dopenimgurl');
	});

	//值为1时的图片，图片上传
	$('#i_dcloseimgurl').focus(function() {
		fileDialog('subFile.php', 'i_dcloseimgurl');
	});


	//背景图片，图片上传
	$('#i_bj').focus(function() {
		fileDialog('subFile.php', 'i_bj');
	});

	//保存数据
	$('#saveAttr').click(function() {
		var data = deviced;
		$.ajax({
			cache: true,
			type: "POST",
			url: "./php/saveAttr.php",
			data: data,
			async: true,
			error: function(request) {
				$.messager.alert('提示', "ajax 连接服务器有误");
			},
			success: function(data) {
				$.messager.alert('提示', '数据保存成功！');
			}
		});
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
					deviced[tagId].bgImg = './images/2.png';
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

					deviced[tagId].bgImg = './images/2.png';
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
					;
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

	//图片显示权重
	$('#i_showindex').change(function() {
		var showindex = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].showindex = showindex;
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
					deviced[btnId].openImgurl = "./images/11.png";
					deviced[btnId].closeImgurl = "./images/c11.png";
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].openImgurl + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text('');
				} else if (btnType == 'ctrl') {
					deviced[btnId].bgImg = "./images/btn.png";
					deviced[btnId].sendValue = '0';
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].bgImg + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text('');
				} else if (btnType == 'submit') {
					deviced[btnId].bgImg = "./images/btn.png";
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
						deviced[btnId].closeImgurl = './images/c11.png';
						deviced[btnId].openImgurl = './images/11.png';
						deviced[btnId].openText = '';
						deviced[btnId].closeText = '';
					} else if (btnStyle == 'text') {
						deviced[btnId].closeImgurl = '';
						deviced[btnId].openImgurl = '';
						deviced[btnId].openText = '打开';
						deviced[btnId].closeText = '关闭';
					} else if (btnStyle == 'group') {
						deviced[btnId].closeImgurl = './images/c11.png';
						deviced[btnId].openImgurl = './images/11.png';
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
						deviced[btnId].bgImg = './images/btn.png';
						deviced[btnId].tagtext = '';
					} else if (btnStyle == 'text') {
						deviced[btnId].bgImg = '';
						deviced[btnId].tagtext = '打开';
					} else if (btnStyle == 'group') {
						deviced[btnId].bgImg = './images/btn.png';
						deviced[btnId].tagtext = '打开';
					}
					devAttr.eq(i).find('button').css({
						backgroundImage: "url(" + deviced[btnId].bgImg + ")",
						backgroundColor: deviced[btnId].bgColor,
						color: deviced[btnId].fontColor
					}).text(deviced[btnId].tagtext);

				} else if (deviced[btnId].btnType == 'submit') {
					if (btnStyle == 'pic') {
						deviced[btnId].bgImg = './images/btn.png';
						deviced[btnId].tagtext = '';
					} else if (btnStyle == 'text') {
						deviced[btnId].bgImg = '';
						deviced[btnId].tagtext = '设置';
					} else if (btnStyle == 'group') {
						deviced[btnId].bgImg = './images/btn.png';
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
	//地图类型
	$('#i_MapType').change(function() {
		var MapType = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				var oldMapType = deviced[devId].MapType;
				deviced[devId].MapType = MapType;
				devAttr.eq(i).find(':first').empty();

				switch (MapType) {
					case 'BMap':
						if (oldMapType == 'AMap' || oldMapType == 'qq' || oldMapType == 'google') {
							deviced[devId].MapLng = deviced[devId].MapLng + 0.0065;
							deviced[devId].MapLat = deviced[devId].MapLat + 0.0060;
						}
						BMapinitialize(devId);
						break;
					case 'AMap':
						if (oldMapType == 'BMap') {
							deviced[devId].MapLng = deviced[devId].MapLng - 0.0065;
							deviced[devId].MapLat = deviced[devId].MapLat - 0.0060;
						}
						AMapinitialize(devId);
						break;
					case 'qq':
						if (oldMapType == 'BMap') {
							deviced[devId].MapLng = deviced[devId].MapLng - 0.0065;
							deviced[devId].MapLat = deviced[devId].MapLat - 0.0060;
						}
						QMapinitialize(devId);
						break;
					case 'google':
						if (oldMapType == 'BMap') {
							deviced[devId].MapLng = deviced[devId].MapLng - 0.0065;
							deviced[devId].MapLat = deviced[devId].MapLat - 0.0060;
						}
						break;
				}
			}
		}
	});

	//地图缩放等级设置
	$('#i_MapZoom').blur(function() {
		var MapZoom = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].MapZoom = Number(MapZoom);
				deviced[devAttr.eq(i).attr('id')].map.setZoom(Number(MapZoom));
			}
		}
	});
	//中心经度
	$('#i_MapLng').blur(function() {
		var MapLng = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].MapLng = Number(MapLng);
				switch (deviced[devAttr.eq(i).attr('id')].MapType) {
					case 'BMap':
						var point = new BMap.Point(Number(MapLng), deviced[devAttr.eq(i).attr('id')].MapLat);
						deviced[devAttr.eq(i).attr('id')].map.setCenter(point);
						break;
					case 'AMap':
						deviced[devAttr.eq(i).attr('id')].map.setCenter([Number(MapLng), deviced[devAttr.eq(i).attr('id')].MapLat])
						break;
					case 'qq':
						var point = new qq.maps.LatLng(deviced[devAttr.eq(i).attr('id')].MapLat, Number(MapLng));
						deviced[devAttr.eq(i).attr('id')].map.panTo(point);
						break;
					case 'google':
						break;
				}
			}
		}
	});
	//中心纬度
	$('#i_MapLat').blur(function() {
		var MapLat = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].MapLat = Number(MapLat);
				switch (deviced[devAttr.eq(i).attr('id')].MapType) {
					case 'BMap':
						var point = new BMap.Point(deviced[devAttr.eq(i).attr('id')].MapLng, Number(MapLat));
						deviced[devAttr.eq(i).attr('id')].map.setCenter(point);
						break;
					case 'AMap':
						deviced[devAttr.eq(i).attr('id')].map.setCenter([deviced[devAttr.eq(i).attr('id')].MapLng, Number(MapLat)]);
						break;
					case 'qq':
						var point = new qq.maps.LatLng(Number(MapLat), deviced[devAttr.eq(i).attr('id')].MapLng);
						deviced[devAttr.eq(i).attr('id')].map.panTo(point);
						break;
					case 'google':
						break;
				}

			}
		}
	});
	//标记点组ID
	$('#i_devGroupId').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});
	//监控点
	$('#i_moniDevId').focus(function() {
		var stateName = $(this).attr('name');
		selectDevState(stateName);
	});
	//标记点文本
	$('#i_MarkerLable').blur(function() {
		// var markerId = $('#i_MarkerId').val();
		var markerLable = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].marker[markerID].MarkerLable = markerLable;
				switch (deviced[devAttr.eq(i).attr('id')].MapType) {
					case 'BMap':
						deviced[devAttr.eq(i).attr('id')].marker[markerID].Label.setContent(markerLable);
						break;
					case 'AMap':
						deviced[devAttr.eq(i).attr('id')].marker[markerID].Marker.setLabel({
							offset: new AMap.Pixel(20, -10), //修改label相对于maker的位置
							content: markerLable
						});
						break;
					case 'qq':
						deviced[devAttr.eq(i).attr('id')].marker[markerID].Label.setContent(markerLable);
						break;
					case 'google':
						break;
				}
			}
		}
	});
	//标记点是否移动
	$('#i_MarkerMove').change(function() {
		var MarkerMove = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[devAttr.eq(i).attr('id')].marker[markerID].MarkerMove = MarkerMove;
				if (MarkerMove == 'move') {
					$('#tr_i_moniDevId').show();
				} else if (MarkerMove == 'fixed') {
					$('#tr_i_moniDevId').hide();
				}
			}
		}
	});

	//层级关系调整
	$('#i_devlevel').change(function() {

		var str = $(this).val();
		$(this).val('');

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
	});
	//视频类型
	$('#i_dvr_visionType').change(function() {
		var visionType = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].visionType = visionType;
				deviced[devId].host = '';
				deviced[devId].port = '';
				deviced[devId].account = '';
				deviced[devId].password = '';
				$('#channel').empty();
				if (visionType == 'hk') {
					if (Sys.ie == 'ie') {
						$('#' + devId + 'tv').empty();
						hkvisiionPlayZoom(devId);
					}
					$('#capture').show();
					$('#fullScreen').show();
					$('#tr_dvr_row').show();
					$('#tr_dvr_col').show();
				} else if (visionType == 'dh') {
					if (Sys.ie == 'ie') {
						$('#' + devId + 'tv').empty();
						dhvisionPlayZoom(devId);
					}
					$('#capture').hide();
					$('#fullScreen').hide();
					$('#tr_dvr_row').hide();
					$('#tr_dvr_col').hide();
				}
				devAttr.eq(i).trigger('click');
			}
		}
	});
	//显示行数
	$('#i_dvr_row').blur(function() {
		var row = Number($(this).val());
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				var oldrow = deviced[devId].row;
				deviced[devId].row = row;
				deviced[devId].col = row;
				$('#i_dvr_col').val(row);
				var hkW = $('#' + devId + 'tv').width();
				var hkH = $('#' + devId + 'tv').height();
				var width = (hkW - 4 * row - 2) / row;
				var height = (hkH - 4 * row - 2) / row;
				if (row < oldrow) {
					$('.smallocxdiv:gt(' + (row * row - 1) + ')').remove();
					$('.smallocxdiv').css({
						width: width + 'px',
						height: height + 'px'
					});
				} else if (row > oldrow) {
					for (var i = (oldrow * oldrow + 1); i <= row * row; i++) {
						$('#' + devId + 'tv').append('<div class="smallocxdiv" id="NetPlayOCX' + i + '"><object classid="CLSID:CAFCF48D-8E34-4490-8154-026191D73924" standby="Waiting..." id="HIKOBJECT' + i + '" width="100%" height="100%" name="HIKOBJECT' + i + '" ></object></div>');
						$('.smallocxdiv').css({
							width: width + 'px',
							height: height + 'px'
						});
						if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
							document.getElementById("HIKOBJECT" + i).SetUserID(m_iLoginUserId);
						}
					}
				} else {
					return false;
				}
			}
		}
	});
	//显示列数
	$('#i_dvr_col').blur(function() {
		var col = Number($(this).val());
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				var oldcol = deviced[devId].col;
				deviced[devId].row = col;
				deviced[devId].col = col;
				$('#i_dvr_row').val(col);
				var hkW = $('#' + devId + 'tv').width();
				var hkH = $('#' + devId + 'tv').height();
				var width = (hkW - 4 * col - 2) / col;
				var height = (hkH - 4 * col - 2) / col;
				if (col < oldcol) {
					$('.smallocxdiv:gt(' + (col * col - 1) + ')').remove();
					$('.smallocxdiv').css({
						width: width + 'px',
						height: height + 'px'
					});
				} else if (col > oldcol) {
					for (var i = (oldcol * oldcol + 1); i <= col * col; i++) {
						$('#' + devId + 'tv').append('<div class="smallocxdiv" id="NetPlayOCX' + i + '"><object classid="CLSID:CAFCF48D-8E34-4490-8154-026191D73924" standby="Waiting..." id="HIKOBJECT' + i + '" width="100%" height="100%" name="HIKOBJECT' + i + '" ></object></div>');
						$('.smallocxdiv').css({
							width: width + 'px',
							height: height + 'px'
						});
						if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
							document.getElementById("HIKOBJECT" + i).SetUserID(m_iLoginUserId);
						}
					}
				} else {
					return false;
				}
			}
		}
	});
	//主机
	$('#i_dvr_host').blur(function() {
		var host = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].host = host;
				if (Sys.ie == 'ie') {
					if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
						setVideoConnect(devId);
					}
				}
			}
		}
	});
	//端口
	$('#i_dvr_port').blur(function() {
		var port = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].port = port;
				if (Sys.ie == 'ie') {
					if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
						setVideoConnect(devId);
					}
				}
			}
		}
	});
	//账号
	$('#i_dvr_account').blur(function() {
		var account = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].account = account;
				if (Sys.ie == 'ie') {
					if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
						setVideoConnect(devId);
					}
				}
			}
		}
	});

	//密码
	$('#i_dvr_password').blur(function() {
		var password = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].password = password;
				if (Sys.ie == 'ie') {
					if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
						setVideoConnect(devId);
					}
				}
			}
		}
	});

	//服务器类型
	$('#i_dvr_servertype').change(function() {
		var servertype = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				deviced[fontId].servertype = servertype;
			}
		}
	});
	//图表标题
	$('#i_titleText').blur(function() {
		var titleText = $(this).val();
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (devAttr.eq(i).css('outline-style') !== 'none') {
				var devId = devAttr.eq(i).attr('id');
				deviced[devId].titleText = titleText;
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
	/*deviced[devId].option = {
	    title: {
	        text: deviced[devId].titleText
	    },
	    tooltip: {
	        trigger: 'axis',
	    },
	    legend: {
	        data:deviced[devId].legendData
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap : false,
	        splitLine: {
	            show: true
	        },
	        data:Xdata
	    },
	    yAxis: {
	        type: 'value',
	        splitLine: {
	            show: false
	        }
	    },
	    series:deviced[devId].series
	};*/
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
	/*setInterval(function () {
	    data.push(Math.random() *100);
	    data1.push(Math.random()*100);
	    data2.push(Math.random()*220);
	    if(data.length>6){
	    	data.shift();
	    	data1.shift();
	    	data2.shift();
	    	Xdata.shift();
	    	var curTime = new Date();
	    	var curHour = curTime.getHours();
	    	var curMinu = curTime.getMinutes();
	    	var curSec = curTime.getSeconds();
	    	Xdata.push(curHour+':'+curMinu+':'+curSec);
	    }
	   	deviced[devId].Chart.setOption({
	   		xAxis: {
		        data:Xdata
		    },
	        series: [{
	            data: data
	        },{
	        	data:data1
	        },{
	        	data:data2
	        }]

	    });
	}, 1000);*/
	deviced[devId].Chart.setOption(deviced[devId].option, true);
	return deviced[devId].option;
}

//视频连接配置
function setVideoConnect(devId) {
	if (deviced[devId].visionType == 'dh') {
		deviced[devId].ocx = document.getElementById('ocx');
		deviced[devId].ocx.LoginDeviceEx(deviced[devId].host, deviced[devId].port, deviced[devId].account, deviced[devId].password, 0); //配置设备登录信息
		deviced[devId].ocx.SetDeviceMode(0, 1); //配置设备显示模式
		var channelstr = deviced[devId].ocx.GetChannelName();
		var channelArray = channelstr.replace(/[^0-9]+/g, '').split('');
		var channelNum = unique(channelArray);
		for (var i = 0; i < channelNum.length; i++) {
			$('#channel').append('<option value="' + i + '">通道' + (i + 1) + '</option>');
		}
	} else if (deviced[devId].visionType == 'hk') {

		m_iLoginUserId = m_bDVRControl.Login(deviced[devId].host, deviced[devId].port, deviced[devId].account, deviced[devId].password);
		if (m_iLoginUserId == -1) {
			$.messager.show({
				title: '提示',
				msg: '登录设备失败！',
				timeout: 3000,
				showType: 'slide'
			});
		} else {
			for (var i = 2; i <= 4; i++) {
				document.getElementById("HIKOBJECT" + i).SetUserID(m_iLoginUserId);
			}
		}
		szServerInfo = m_bDVRControl.GetServerInfo();
		var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false"
		xmlDoc.loadXML(szServerInfo)
		m_iChannelNum = parseInt(xmlDoc.documentElement.childNodes[0].childNodes[0].nodeValue);
		//m_szDeviceType = xmlDoc.documentElement.childNodes[1].childNodes[0].nodeValue;
		//m_iChannelNum = parseInt(iChannelNum);
		if (m_iChannelNum < 1) {
			$.messager.show({
				title: '提示',
				msg: '获取通道失败！',
				timeout: 3000,
				showType: 'slide'
			});
		} else {
			document.getElementById("channel").length = 0; //先清空下拉列表
			for (var i = 0; i < m_iChannelNum; i++) {
				var szChannelName = m_bDVRControl.GetChannelName(i);
				if (szChannelName == "") {
					szChannelName = "通道" + (i + 1);
				}
				document.getElementById("channel").options.add(new Option(szChannelName, i));
			}
		}
	}
}
//云台控制
function cptzd(a, b, d, c) {
	var RequestDataStart = {
		method: 'ptz.start',
		session: '60286208&1489459650153',
		params: {
			channel: Number($('#channel').val()),
			code: b,
			arg1: d,
			arg2: 0,
			arg3: 0
		},
		id: 1
	};
	var RequestDataStop = {
		method: 'ptz.stop',
		session: '60286208&1489459650153',
		params: {
			channel: Number($('#channel').val()),
			code: b,
			arg1: d,
			arg2: 0,
			arg3: 0
		},
		id: 1
	};
	var sendData = '';
	if (a) {
		sendData = RequestDataStart;
	} else {
		sendData = RequestDataStop;
	}
	$.ajax({
		url: './php/random.php',
		data: sendData,
		success: function(data) {
			// alert('发送成功！');
		}
	});
	$('.yt').css({
		backgroundColor: 'transparent'
	});
}

//旋转录像
function cptzEx() {
	/*ocx.ControlPtz(51, 0, 0, 0, 1);
	ocx.ControlPtz(51, 0, 0, 0, 0);//参数的意思？*/
}
//是否可变
/*function chg_i_dcontrolmode(){
	var devArr= $('.dev');
	for(var i=0;i<devArr.length;i++){
		if(devArr.eq(i).css('outline-style')!=='none'){
			var ctrl = $('#i_dcontrolmode').val();
			deviced[devArr.eq(i).attr('id')].toggle=ctrl;
		}
	}
}

function chg_i_dcontrolvalue(){
	var devArr= $('.dev');
	for(var i=0;i<devArr.length;i++){
		if(devArr.eq(i).css('outline-style')!=='none'){
			var ctrlvalue = $('#i_dcontrolvalue').val();
			deviced[devArr.eq(i).attr('id')].controlvalue=ctrlvalue;
		}
	}
}*/
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
		onResize: function(e) {

		},
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
	var dataPanel =
		'<div id="MonitoringSitePanel"><table><tr><td>设备组：</td><td><span class="textbox combo" style="width: 171px; height: 20px;"><span class="textbox-addon textbox-addon-right" style="right: 0px;"><a href="javascript:void(0)" class="textbox-icon combo-arrow" icon-index="0" tabindex="-1" style="width: 18px; height: 20px;"></a></span><input type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" readonly="readonly" placeholder="" style="margin-left: 0px; margin-right: 18px; padding-top: 3px; padding-bottom: 3px; width: 145px;"><input type="hidden" class="textbox-value" name="" value=""></span></td><td>设备名：</td><td><input id="devname" style=" border:1px solid #ccc; width:80px;"></td><td><a id="query" href="#" class="easyui-linkbutton" data-options="iconCls:\'icon-search\'">查询</a></td></td><td><a id="a_save" href="#" class="easyui-linkbutton" data-options="iconCls:\'icon-save\'">确认选择</a><td></td></tr></table><table id="MonitoringSiteTable"></table></div>';
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
		url: './php/getMonitorData.php',
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
					field: 'deviceid',
					title: '设备ID号',
					width: 60,
					align: 'center',
					hidden: 'true'
				},
				{
					field: 'orgid',
					title: '父ID号',
					width: 60,
					align: 'center',
					hidden: 'true'
				},
				{
					field: 'orgname',
					title: '设备组',
					width: 70,
					align: 'center'
				},
				{
					field: 'devname',
					title: '设备名',
					width: 70,
					align: 'center'
				},
				{
					field: 'Address',
					title: '模块',
					width: 30,
					align: 'center'
				},
				{
					field: 'IndexOfType',
					title: '索引',
					width: 30,
					align: 'center'
				},
				{
					field: 'Description',
					title: '值类型',
					width: 70,
					align: 'center'
				},
				{
					field: 'CurValue',
					title: '当前值',
					width: 30,
					align: 'center'
				},
				{
					field: 'RecvTime',
					title: '更新时间',
					width: 80,
					align: 'center'
				},
			]
		]

	});
	$('#query').click(function() {
		$('#MonitoringSiteTable').datagrid('load', {
			orgid: 0,
			devname: $('#devname').val()
		});
	});

	$('#a_save').click(function() {
		var row = $('#MonitoringSiteTable').datagrid('getSelected');
		if (row) {
			var devArr = $('.dev');
			for (var i = 0; i < devArr.length; i++) {
				if (devArr.eq(i).css('outline-style') !== 'none') {
					var upId = devArr.eq(i).attr('id');
					switch (stateName) {
						case 'devname':
							$('#i_deviceid').val(row.devname);
							deviced[upId].devname = row.devname;
							if (deviced[upId].devIndex == 8) {

								var txt = textShowMode(upId);
								var textID = 'p' + upId + 'img';

								$('#' + textID).text(txt).css({
									color: deviced[upId].fontColor
								});
								textAlign(devId);

							} else if (deviced[upId].devIndex == 14) {
								devArr.eq(i).find('span').text(row.devname).css({
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
								devArr.eq(i).find('span').text(row.devname).css({
									color: '#555',
									position: 'absolute',
									bottom: '10px',
									left: '0px'
								});
							}
							break;
						case 'OpenDoorState':
							$('#i_OpenDoorState').val(row.devname);
							deviced[upId].OpenDoorState = row.devname;
							break;
						case 'DoorState':
							$('#i_DoorState').val(row.devname);
							deviced[upId].DoorState = row.devname;
							break;
						case 'CardReader':
							$('#i_CardReader').val(row.devname);
							deviced[upId].CardReader = row.devname;
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
								deviced[upId].marker[markerID].moniDevId = row.devname;
								$('#i_moniDevId').val(row.devname);
							}
							break;
						case 'addMoniState':
							$('#tr_i_devlevel').before('<tr id="tr_i_moni' + upId + deviced[upId].moniCount + '" class="tr_i_monis' + upId + '"><td></td><td class="txt monitext' + upId + '" >监测点' + deviced[upId].moniCount + '</td><td class="txt"style="position:relative;"><input id="i_moni' + upId + deviced[upId].moniCount +
								'" name="moni' + upId + deviced[upId].moniCount + '" data-mCount=' + deviced[upId].moniCount + ' style="box-sizing:border-box;width:154px;padding-right:20px;background:transparent;"readonly="readonly"/><div class="triangle-down' + upId + ' triangle-down"></div></td></tr>');
							deviced[upId]['moni' + upId + deviced[upId].moniCount] = row.devname;
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
							$('#i_moni' + upId + deviced[upId].moniCount).val(row.devname).click(function() {
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
	return devname;
}

//门打开时显示信息
function OpenDoorShowInfo(data, parentId) {
	if ($('.window').length > 0) {
		$('.window').remove();
		$('.window-shadow').remove();
	}
	$('#openDoor').remove();
	var infoHtml =
		"<div id='openDoor'><div id='closebtn'style='position:absolute;right:10px;top:0px;width:10px;height:10px;font:bold 20px 微软雅黑;cursor:pointer;'>×</div><div id='avatar'style='width:150px;height:180px;margin-top:10px;margin-left:170px;border:1px solid #ccc;background:url(./images/head.jpg)'></div><table style='margin-left:100px;margin-top:5px;'><tr><td align='right'>部门：</td><td><input type='text'id='dep'></td></tr><tr><td align='right'>职位：</td><td><input type='text'id='pos'></td></tr><tr><td align='right'>姓名：</td><td><input type='text'id='Info'></td></tr><tr><td align='right'>卡号：</td><td><input type='text'id='CardWord'></td></tr><tr><td align='right'>开门控制点：</td><td><input type='text'id='OpenCtrl'></td></tr><tr><td colspan='2'><button id='openDoorOk'style='width:100px;margin:2px 5px 2px 15px;'>开门</button><button id='dopenDoorOk'style='width:100px;margin:2px 5px;'>确定</button></td></tr></table></div>";

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
			fileDialog('subFile.php', 'avatar');
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
				url: "./php/random.php",
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
//删除组件
function delele() {
	var delId = $("#selele").find("option:selected").attr('data-Id');
	$('#' + delId).remove();
	$("#selele").find("option:selected").remove();
	delete deviced[delId];
	$('#eastBox').panel('setTitle', '属性[背景]');
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
	var FileController = "./php/" + url;

	// FormData h5新对象
	var form = new FormData();
	form.append("file", fileObj);

	// XMLHttpRequest 请求

	var xhr = new XMLHttpRequest();

	xhr.open("post", FileController, true);

	xhr.onload = function(data) {

	};
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var response = xhr.responseText;
				var imgUrl = './data/' + response;
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
		backgroundColor: '#ffffff',
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
					type[i].openImgurl = "./images/1.png";
					type[i].closeImgurl = "./images/8.png";
					break;
				case 'Smoke':
					type[i].openImgurl = "./images/s1.jpg";
					type[i].closeImgurl = "./images/s12.jpg";
					break;
				case 'Infrared':
					type[i].openImgurl = "./images/h1.jpg";
					type[i].closeImgurl = "./images/h12.jpg";
					break;
				case 'Leaker':
					type[i].openImgurl = "./images/l1.jpg";
					type[i].closeImgurl = "./images/l12.jpg";
					break;
				case 'Fan':
					type[i].openImgurl = "./images/f1.jpg";
					type[i].closeImgurl = "./images/f12.jpg";
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
		deviced[devId].openImgurl = "./images/1.png";
		deviced[devId].closeImgurl = "./images/8.png";
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

//百度地图相关设置
function BMapinitialize(devId) {
	if (markerID == null) {
		var markerCount = 0;
		deviced[devId].marker = {};
	} else {
		markerCount = markerID + 1;
	}
	// 百度地图API功能
	deviced[devId].map = new BMap.Map(devId + "map"); // 创建Map实例
	var point = new BMap.Point(deviced[devId].MapLng, deviced[devId].MapLat); //设置点坐标
	if (!mapinitflag) {
		var convertor = new BMap.Convertor();
		var pointArr = [];
		pointArr.push(point);
		convertor.translate(pointArr, 1, 5, function(data) {
			deviced[devId].map.centerAndZoom(data.points[0], deviced[devId].MapZoom); // 初始化地图,设置中心点坐标和地图级别(数值越大，越精确)
		});
		mapinitflag = true;
	} else {
		deviced[devId].map.centerAndZoom(point, deviced[devId].MapZoom); // 初始化地图,设置中心点坐标和地图级别(数值越大，越精确)
	}


	deviced[devId].map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
	deviced[devId].map.setCurrentCity(city); // 设置地图显示的城市

	deviced[devId].map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	//map.panTo(new BMap.Point(113.262232,23.154345));   //移动到某个位置,可用于从后台获取数据点在把地图移动到这个位置
	//map.setZoom(14);  //放大缩小地图
	deviced[devId].map.enableDragging(); //开启拖拽
	//map.disableDragging();     //禁止拖拽

	var top_left_control = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_TOP_LEFT
	}); // 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
	//var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	/*缩放控件type有四种类型:
	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

	//添加控件和比例尺
	deviced[devId].map.addControl(top_left_control);
	deviced[devId].map.addControl(top_left_navigation);
	// map.addControl(top_right_navigation);
	//addMarker(deviced[devId].map,point,'机房');  //添加标记点

	//移除控件和比例尺
	function delete_control() {
		deviced[devId].map.removeControl(top_left_control);
		deviced[devId].map.removeControl(top_left_navigation);
		deviced[devId].map.removeControl(top_right_navigation);
	}
	var pointLng = null;
	var pointLat = null;
	//给地图添加右击事件,获取右击时的经纬度，用于右键添加标记点
	deviced[devId].map.addEventListener("rightclick", function(e) {
		pointLng = e.point.lng; //右键点击位置经度
		pointLat = e.point.lat; //右键点击位置纬度
	});
	//给地图添加右键菜单功能
	var menu = new BMap.ContextMenu();
	var txtMenuItem = [{
		text: '添加标记点',
		callback: function() {
			deviced[devId].marker[markerCount] = {};
			deviced[devId].marker[markerCount].MarkerId = markerCount;
			deviced[devId].marker[markerCount].devGroupId = '';
			deviced[devId].marker[markerCount].moniDevId = '';
			deviced[devId].marker[markerCount].MarkerLng = pointLng;
			deviced[devId].marker[markerCount].MarkerLat = pointLat;
			deviced[devId].marker[markerCount].MarkerLable = '机房';
			deviced[devId].marker[markerCount].bgColor = 'rgb(255,255,255)';
			deviced[devId].marker[markerCount].albgColor = 'rgb(255,255,255)';
			deviced[devId].marker[markerCount].MarkerMove = 'fixed';
			for (var i in deviced[devId].marker[markerCount]) {
				$('[name="' + i + '"]').val(deviced[devId].marker[markerCount][i]);
				if ($('[name="' + i + '"]').is('.colorPicker')) {
					$('[name="' + i + '"]').spectrum('set', deviced[devId].marker[markerCount][i]);
				}
			}

			markerID = markerCount;
			var Mpoint = new BMap.Point(pointLng, pointLat);
			addMarker(devId, Mpoint, '机房', markerCount);
			markerCount++;
		}
	}];
	menu.addItem(new BMap.MenuItem(txtMenuItem[0].text, txtMenuItem[0].callback, 80));
	deviced[devId].map.addContextMenu(menu);

	deviced[devId].map.addEventListener("tilesloaded", function(e) { //获取地图加载完成后的中心点位置信息,及缩放等级
		var MapZoom = deviced[devId].map.getZoom(); //获取缩放等级
		var str = deviced[devId].map.getBounds().getCenter();

		deviced[devId].MapLng = str.lng;
		deviced[devId].MapLat = str.lat;
		deviced[devId].MapZoom = MapZoom;
		$('#i_MapZoom').val(MapZoom);
		$('#i_MapLng').val(str.lng);
		$('#i_MapLat').val(str.lat);

		if (markerID !== null) {
			//添加标记点
			for (var i in deviced[devId].marker) {
				var label = deviced[devId].marker[i].MarkerLable;
				var pointLng = deviced[devId].marker[i].MarkerLng;
				var pointLat = deviced[devId].marker[i].MarkerLat;
				var labelBg = deviced[devId].marker[i].bgColor;

				var Mpoint = new BMap.Point(pointLng, pointLat);
				var Label = new BMap.Label(label, {
					offset: new BMap.Size(20, -10)
				}); //创建标注文本
				deviced[devId].marker[i].Marker = new BMap.Marker(Mpoint); //创建标注
				deviced[devId].map.addOverlay(deviced[devId].marker[i].Marker);
				deviced[devId].marker[i].Marker.setLabel(Label);
				Label.setStyle({
					background: labelBg
				});


				deviced[devId].marker[i].Marker.enableDragging();
				deviced[devId].marker[i].Marker.addEventListener('click', bMarkerClick);
				deviced[devId].marker[i].Marker.addEventListener('dragend', bMarkerdragend);
				//删除标记点
				var markerMenu = new BMap.ContextMenu();
				markerMenu.addItem(new BMap.MenuItem('删除标记点', removeMarker.bind(deviced[devId].marker[i].Marker)));
				deviced[devId].marker[i].Marker.addContextMenu(markerMenu);
			}
		}

	});
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

//预览百度地图配置
function PreviewBmapInit(devId) {
	var map = new BMap.Map('pre' + devId); // 创建Map实例
	var point = new BMap.Point(deviced[devId].MapLng, deviced[devId].MapLat); //设置点坐标
	map.centerAndZoom(point, deviced[devId].MapZoom); // 初始化地图,设置中心点坐标和地图级别(数值越大，越精确)
	map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
	//map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	map.enableDragging(); //开启拖拽

	var top_left_control = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_TOP_LEFT
	}); // 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件

	//添加控件和比例尺
	map.addControl(top_left_control);
	map.addControl(top_left_navigation);
	BMoveMarker[devId] = {};
	//添加标记点
	for (var i in deviced[devId].marker) {
		// console.log(i);
		BMoveMarker[devId][i] = {};
		BMoveMarker[devId][i].MmarkerId = i;
		BMoveMarker[devId][i].MarkerMove = deviced[devId].marker[i].MarkerMove;
		var label = deviced[devId].marker[i].MarkerLable;
		var pointLng = deviced[devId].marker[i].MarkerLng;
		var pointLat = deviced[devId].marker[i].MarkerLat;
		var labelBg = deviced[devId].marker[i].bgColor;

		var Mpoint = new BMap.Point(pointLng, pointLat);
		var Label = new BMap.Label(label, {
			offset: new BMap.Size(20, -10)
		}); //创建标注文本
		BMoveMarker[devId][i].Mmarker = new BMap.Marker(Mpoint); //创建标注
		map.addOverlay(BMoveMarker[devId][i].Mmarker);
		BMoveMarker[devId][i].Mmarker.setLabel(Label);
		Label.setStyle({
			background: labelBg
		});
	}
	// console.log(MoveMarker);
}

//标记点移动
function BMapMarkMove(Marker, pointLng, pointLat) {
	var MovePoint = new BMap.Point(pointLng, pointLat); //获取百度地图坐标点
	Marker.setPosition(MovePoint); //设置marker的坐标点
}

//高德地图相关设置
function AMapinitialize(devId) {
	if (markerID == null) {
		var markerCount = 0;
		deviced[devId].marker = {};
	} else {
		markerCount = markerID + 1;
	}

	deviced[devId].map = new AMap.Map(devId + 'map', { //添加地图
		resizeEnable: true,
		zoom: deviced[devId].MapZoom,
		center: [deviced[devId].MapLng, deviced[devId].MapLat]
	});
	deviced[devId].map.plugin(["AMap.ToolBar"], function() { //添加工具条
		deviced[devId].map.addControl(new AMap.ToolBar());
	});
	deviced[devId].map.on('complete', function() {
		var MapZoom = deviced[devId].map.getZoom(); //获取缩放等级
		var str = deviced[devId].map.getCenter();
		deviced[devId].MapLng = str.lng;
		deviced[devId].MapLat = str.lat;
		deviced[devId].MapZoom = MapZoom;
		$('#i_MapZoom').val(MapZoom);
		$('#i_MapLng').val(str.lng);
		$('#i_MapLat').val(str.lat);
		if (markerID !== null) {
			for (var i in deviced[devId].marker) {
				var label = deviced[devId].marker[i].MarkerLable;
				var pointLng = deviced[devId].marker[i].MarkerLng;
				var pointLat = deviced[devId].marker[i].MarkerLat;

				deviced[devId].marker[i].Marker = new AMap.Marker({
					draggable: true,
					map: deviced[devId].map,
					position: [pointLng, pointLat] //基点位置
				});
				// 添加label
				deviced[devId].marker[i].Marker.setLabel({
					offset: new AMap.Pixel(20, -10), //修改label相对于maker的位置
					content: label
				});
				//标记点绑定鼠标右击事件——弹出右键菜单
				deviced[devId].marker[i].Marker.on('rightclick', aMarkerremove);
				//标记点绑定鼠标点击事件
				deviced[devId].marker[i].Marker.on('click', aMarkerclick);
				//标记点拖拽完成事件
				deviced[devId].marker[i].Marker.on('dragend', aMarkerdragend);
			}
		}
	});

	var contextMenu1 = new AMap.ContextMenu(); //创建右键菜单

	//右键添加Marker标记
	contextMenu1.addItem("添加标记点", function() {
		deviced[devId].marker[markerCount] = {};
		deviced[devId].marker[markerCount].MarkerId = markerCount;
		deviced[devId].marker[markerCount].devGroupId = '';
		deviced[devId].marker[markerCount].moniDevId = '';
		deviced[devId].marker[markerCount].MarkerLng = contextMenuPositon.lng;
		deviced[devId].marker[markerCount].MarkerLat = contextMenuPositon.lat;
		deviced[devId].marker[markerCount].MarkerLable = '机房';
		deviced[devId].marker[markerCount].bgColor = 'rgb(255,255,255)';
		deviced[devId].marker[markerCount].albgColor = 'rgb(255,255,255)';
		deviced[devId].marker[markerCount].MarkerMove = 'fixed';
		for (var i in deviced[devId].marker[markerCount]) {
			$('[name="' + i + '"]').val(deviced[devId].marker[markerCount][i]);
			if ($('[name="' + i + '"]').is('.colorPicker')) {
				$('[name="' + i + '"]').spectrum('set', deviced[devId].marker[markerCount][i]);
			}
		}
		markerID = markerCount;
		AMapaddMarker(deviced[devId].map, contextMenuPositon, markerCount)
		markerCount++;
	}, 0);

	//地图绑定鼠标右击事件——弹出右键菜单
	deviced[devId].map.on('rightclick', function(e) {
		alert(contextMenu1);
		console.log(contextMenu1);
		contextMenu1.open(deviced[devId].map, e.lnglat);
		contextMenuPositon = e.lnglat;
		//正常添加右键菜单的输出
		/*c {CLASS_NAME: "AMap.ContextMenu", Qi: true, G: Object, pi: Object, map: null…}
		CLASS_NAME:"AMap.ContextMenu"
		Ea:c
		G:Object
		Og:false
		Qi:true
		map:null
		pi:Object
		bubble:false
		clickable:true
		draggable:false
		extData:Object
		items:Array(1)
		map:null
		position:c
		visible
		:
		false
		__proto__
		:
		Object
		rh
		:
		Object
		bubble
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		clickable
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		content
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		draggable
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		items
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		position
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		visible
		:
		Array(1)
		0
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		zIndex
		:
		Array(1)
		0
		:
		Object
		Ha
		:
		function (b)
		bk
		:
		undefined
		we
		:
		c
		__proto__
		:
		Object
		length
		:
		1
		__proto__
		:
		Array(0)
		__proto__
		:
		Object
		__proto__
		:
		c*/
	});
}

function AMapaddMarker(map, position, markerCount) {
	deviced[devId].marker[markerCount].Marker = new AMap.Marker({
		draggable: true,
		map: map,
		position: position //基点位置
	});
	// 添加label
	deviced[devId].marker[markerCount].Marker.setLabel({
		offset: new AMap.Pixel(20, -10), //修改label相对于maker的位置
		content: "机房"
	});


	//标记点绑定鼠标右击事件——弹出右键菜单
	deviced[devId].marker[markerCount].Marker.on('rightclick', aMarkerremove);
	//标记点绑定鼠标点击事件
	deviced[devId].marker[markerCount].Marker.on('click', aMarkerclick);
	//标记点拖拽完成事件
	deviced[devId].marker[markerCount].Marker.on('dragend', aMarkerdragend);
}
//高德地图标记点拖拽完成回调函数
function aMarkerdragend(e) {
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
			deviced[devId].marker[upmarkerId].MarkerLng = e.lnglat.lng;
			deviced[devId].marker[upmarkerId].MarkerLat = e.lnglat.lat;
			$('#i_MarkerLng').val(e.lnglat.lng);
			$('#i_MarkerLat').val(e.lnglat.lat);
		}
	}
}

//高德地图标记点点击事件回调函数
function aMarkerclick(e) {
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
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
//高德地图标记点右键点击事件回调函数
function aMarkerremove(e) {
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
		}
	}
	var MarkcontextMenu = new AMap.ContextMenu(); //创建右键菜单
	//右键添加Marker标记
	MarkcontextMenu.addItem("删除标记点", function() {
		var markId = deviced[devId].marker[upmarkerId].MarkerId;
		deviced[devId].map.remove(deviced[devId].marker[markId].Marker); //删除点标记
		delete deviced[devId].marker[markId]; //删除数据
		$('#i_devGroupId').val('');
		$('#i_MarkerLng').val('');
		$('#i_MarkerLat').val('');
		$('#i_MarkerLable').val('');
		$('[name="bgColor"]').spectrum('set', '#fff');
		$('[name="albgColor"]').spectrum('set', '#fff');
	});
	MarkcontextMenu.open(deviced[devId].map, e.lnglat);
}

//预览高德地图
function PreviewAmapInit(devId) {
	var map = new AMap.Map('pre' + devId, { //天机地图
		resizeEnable: true,
		zoom: deviced[devId].MapZoom,
		center: [deviced[devId].MapLng, deviced[devId].MapLat]
	});
	map.plugin(["AMap.ToolBar"], function() { //添加工具条
		deviced[devId].map.addControl(new AMap.ToolBar());
	});
	BMoveMarker[devId] = {};
	//添加标记点
	for (var i in deviced[devId].marker) {
		BMoveMarker[devId][i] = {};
		BMoveMarker[devId][i].MmarkerId = i;
		BMoveMarker[devId][i].MarkerMove = deviced[devId].marker[i].MarkerMove;
		var label = deviced[devId].marker[i].MarkerLable;
		var pointLng = deviced[devId].marker[i].MarkerLng;
		var pointLat = deviced[devId].marker[i].MarkerLat;

		BMoveMarker[devId][i].Mmarker = new AMap.Marker({
			draggable: true,
			map: map,
			position: [pointLng, pointLat] //基点位置
		});
		// 添加label
		BMoveMarker[devId][i].Mmarker.setLabel({
			offset: new AMap.Pixel(20, -10), //修改label相对于maker的位置
			content: label
		});
	}
}
//标记点移动
function AMapMarkerMove(Marker, pointLng, pointLat) {
	Marker.setPosition([pointLng, pointLat]);
}

//腾讯地图相关设置
function QMapinitialize(devId) {
	if (markerID == null) {
		var markerCount = 0;
		deviced[devId].marker = {};
	} else {
		markerCount = markerID + 1;
	}
	//创建地图
	deviced[devId].map = new qq.maps.Map(document.getElementById(devId + "map"), {
		center: new qq.maps.LatLng(deviced[devId].MapLat, deviced[devId].MapLng), // 地图的中心地理坐标。
		zoom: deviced[devId].MapZoom // 地图的中心地理坐标。
	});
	var labelsArray = [];
	//添加监听事件  获取鼠标右键点击事件,添加右键菜单
	qq.maps.event.addListener(deviced[devId].map, 'rightclick', function(event) {

		var pointLat = event.latLng.lat;
		var pointLng = event.latLng.lng;
		//添加右键菜单，文本标注
		var label = new qq.maps.Label({
			position: event.latLng,
			map: deviced[devId].map,
			content: '添加标记点'
		});
		labelsArray.push(label);
		//添加菜单点击事件
		qq.maps.event.addListener(label, 'click', function(event) {
			deviced[devId].marker[markerCount] = {};
			deviced[devId].marker[markerCount].MarkerId = markerCount;
			deviced[devId].marker[markerCount].devGroupId = '';
			deviced[devId].marker[markerCount].moniDevId = '';
			deviced[devId].marker[markerCount].MarkerLng = pointLng;
			deviced[devId].marker[markerCount].MarkerLat = pointLat;
			deviced[devId].marker[markerCount].MarkerLable = '机房';
			deviced[devId].marker[markerCount].bgColor = 'rgb(255,255,255)';
			deviced[devId].marker[markerCount].albgColor = 'rgb(255,255,255)';
			deviced[devId].marker[markerCount].MarkerMove = 'fixed';
			for (var i in deviced[devId].marker[markerCount]) {
				$('[name="' + i + '"]').val(deviced[devId].marker[markerCount][i]);
				if ($('[name="' + i + '"]').is('.colorPicker')) {
					$('[name="' + i + '"]').spectrum('set', deviced[devId].marker[markerCount][i]);
				}
			}
			markerID = markerCount;
			//添加标记点，及标注文本
			deviced[devId].marker[markerCount].Marker = new qq.maps.Marker({
				position: new qq.maps.LatLng(pointLat, pointLng),
				map: deviced[devId].map,
				draggable: true
			});
			deviced[devId].marker[markerCount].Label = new qq.maps.Label({
				position: new qq.maps.LatLng(pointLat, pointLng),
				map: deviced[devId].map,
				content: '机房'
			});
			if (labelsArray) {
				for (var i in labelsArray) {
					labelsArray[i].setMap(null);
				}
				labelsArray.length = 0;
			}

			//标记点右键添加菜单，删除该标记点
			qq.maps.event.addListener(deviced[devId].marker[markerCount].Marker, 'rightclick', qMarkerRemove);
			//点击标记点选中当前标记点
			qq.maps.event.addListener(deviced[devId].marker[markerCount].Marker, 'click', qMarkerclick);
			//标记点拖拽结束事件
			qq.maps.event.addListener(deviced[devId].marker[markerCount].Marker, 'dragend', qMarkerdragend);
			//标记点拖拽事件
			qq.maps.event.addListener(deviced[devId].marker[markerCount].Marker, 'dragging', qMarkerdraging);
			markerCount++;
		});
	});
	//地图拖拽结束事件
	qq.maps.event.addListener(deviced[devId].map, 'dragend', function(event) {
		var MapZoom = deviced[devId].map.getZoom(); //获取缩放等级
		var str = deviced[devId].map.getCenter();
		deviced[devId].MapLng = str.lng;
		deviced[devId].MapLat = str.lat;
		deviced[devId].MapZoom = MapZoom;
		$('#i_MapZoom').val(MapZoom);
		$('#i_MapLng').val(str.lng);
		$('#i_MapLat').val(str.lat);
	});
	if (markerID !== null) {
		for (var i in deviced[devId].marker) {
			var label = deviced[devId].marker[i].MarkerLable;
			var pointLng = deviced[devId].marker[i].MarkerLng;
			var pointLat = deviced[devId].marker[i].MarkerLat;

			deviced[devId].marker[i].Marker = new qq.maps.Marker({
				position: new qq.maps.LatLng(pointLat, pointLng),
				map: deviced[devId].map,
				draggable: true
			});
			// 添加label
			deviced[devId].marker[i].Label = new qq.maps.Label({
				position: new qq.maps.LatLng(pointLat, pointLng),
				map: deviced[devId].map,
				content: label,
				style: {
					background: deviced[devId].marker[i].bgColor
				}
			});
			//标记点右键添加菜单，删除该标记点
			qq.maps.event.addListener(deviced[devId].marker[i].Marker, 'rightclick', qMarkerRemove);
			//点击标记点选中当前标记点
			qq.maps.event.addListener(deviced[devId].marker[i].Marker, 'click', qMarkerclick);
			//标记点拖拽结束事件
			qq.maps.event.addListener(deviced[devId].marker[i].Marker, 'dragend', qMarkerdragend);
			//标记点拖拽事件
			qq.maps.event.addListener(deviced[devId].marker[i].Marker, 'dragging', qMarkerdraging);
		}
	}
}

//腾讯地图标记点拖拽完成事件回调函数
function qMarkerdragend(event) {
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			deviced[devId].marker[j].MarkerLng = event.latLng.lng;
			deviced[devId].marker[j].MarkerLat = event.latLng.lat;
			deviced[devId].marker[j].Label.setPosition(event.latLng);
			$('#i_MarkerLng').val(event.latLng.lng);
			$('#i_MarkerLat').val(event.latLng.lat);
		}
	}
}
//腾讯地图标记点拖拽事件
function qMarkerdraging(event) {
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			deviced[devId].marker[j].Label.setPosition(event.latLng);
		}
	}
}
//腾讯地图标记点点击事件回调函数
function qMarkerclick() {
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
			for (var i in deviced[devId].marker[upmarkerId]) {
				$('[name="' + i + '"]').eq(0).val(deviced[devId].marker[upmarkerId][i]);
				if ($('[name="' + i + '"]').is('.colorPicker')) {
					$('[name="' + i + '"]').spectrum('set', deviced[devId].marker[upmarkerId][i]);
				}
			}
		}
	}
}
//腾讯地图标记点右键添加菜单删除标记点函数
function qMarkerRemove(event) {
	var mlabel = new qq.maps.Label({
		position: event.latLng,
		map: deviced[devId].map,
		content: '删除标记点'
	});
	for (var j in deviced[devId].marker) {
		if (deviced[devId].marker[j].Marker == this) {
			var upmarkerId = j;
			qq.maps.event.addListener(mlabel, 'click', function(event) {
				this.setMap(null);
				// markersArray[j].setMap(null);
				deviced[devId].marker[upmarkerId].Marker.setMap(null);
				deviced[devId].marker[upmarkerId].Label.setMap(null);
				// markersArray.splice((j-1),1);//从j的位置开始向后删除1个元素

				delete deviced[devId].marker[upmarkerId]; //删除数据
				$('#i_devGroupId').val('');
				$('#i_MarkerLng').val('');
				$('#i_MarkerLat').val('');
				$('#i_MarkerLable').val('');
				$('[name="bgColor"]').spectrum('set', '#fff');
				$('[name="albgColor"]').spectrum('set', '#fff');
			});
		}
	}
}

//预览腾讯地图
function PreviewQmapInit(devId) {
	var map = new qq.maps.Map(document.getElementById("pre" + devId), {
		center: new qq.maps.LatLng(deviced[devId].MapLat, deviced[devId].MapLng), // 地图的中心地理坐标。
		zoom: deviced[devId].MapZoom // 地图的中心地理坐标。
	});
	BMoveMarker[devId] = {};
	//添加标记点
	for (var i in deviced[devId].marker) {
		BMoveMarker[devId][i] = {};
		BMoveMarker[devId][i].MmarkerId = i;
		BMoveMarker[devId][i].MarkerMove = deviced[devId].marker[i].MarkerMove;
		var label = deviced[devId].marker[i].MarkerLable;
		var pointLng = deviced[devId].marker[i].MarkerLng;
		var pointLat = deviced[devId].marker[i].MarkerLat;

		BMoveMarker[devId][i].Mmarker = new qq.maps.Marker({
			position: new qq.maps.LatLng(pointLat, pointLng),
			map: map
		});
		// 添加label
		BMoveMarker[devId][i].Label = new qq.maps.Label({
			position: new qq.maps.LatLng(pointLat, pointLng),
			map: map,
			content: label,
			style: {
				background: deviced[devId].marker[i].bgColor
			}
		});
	}
}
//标记点移动
function QMapMarkerMove(ml, pointLng, pointLat) {
	var point = new qq.maps.LatLng(pointLat, pointLng);
	ml.Mmarker.setPosition(point);
	ml.Label.setPosition(point);
}

//播放窗口选中事件
function CheckPlayVideo(devId, obj) {

	// obj.css({borderColor:'#0f0'}).siblings().css({borderColor:'#ccc'});
	// var num = obj.attr('data-num');
	for (var i in deviced[devId].dvr[num]) {
		$('[name="' + i + '"]').val(deviced[devId].dvr[num][i]);
	}
}
//创建大华播放区域
function dhvisionPlayZoom(devId) {
	$('#capture').hide();
	$('#fullScreen').hide();
	$('#' + devId + 'tv').append("<object id='ocx' width='100%' height='100%' classid='CLSID:EDD8DF0B-A160-45df-A26E-67C390A57B18' codebase='http://192.168.0.166/webrec.cab#version=3,0,0,1'><param name='lVideoWindNum' value=4></object>");
	if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
		setTimeout(function() {
			setVideoConnect(devId);
		}, 800);
	}
}
//创建海康播放区域
function hkvisiionPlayZoom(devId) {
	$('#' + devId + 'tv').append('<div class="smallocxdiv" id="NetPlayOCX1">' +
		'<object classid="CLSID:CAFCF48D-8E34-4490-8154-026191D73924" codebase="../codebase/NetVideoActiveX23.cab#version=2,3,23,9" standby="Waiting..." id="HIKOBJECT1" width="100%" height="100%" name="HIKOBJECT1" ></object>' +
		'</div>' +
		'<div class="smallocxdiv" id="NetPlayOCX2">' +
		'<object classid="CLSID:CAFCF48D-8E34-4490-8154-026191D73924" standby="Waiting..." id="HIKOBJECT2" width="100%" height="100%" name="HIKOBJECT2" ></object>' +
		'</div>' +
		'<div class="smallocxdiv" id="NetPlayOCX3">' +
		'<object classid="CLSID:CAFCF48D-8E34-4490-8154-026191D73924" standby="Waiting..." id="HIKOBJECT3" width="100%" height="100%" name="HIKOBJECT3" ></object>' +
		'</div>' +
		'<div class="smallocxdiv" id="NetPlayOCX4">' +
		'<object classid="CLSID:CAFCF48D-8E34-4490-8154-026191D73924" standby="Waiting..." id="HIKOBJECT4" width="100%" height="100%" name="HIKOBJECT4" ></object>' +
		'</div>');
	/* $('#playbtn').append('<button id="capture"data-dev="'+devId+'"class="ctrlbtn">抓图</button><button id="fullScreen"data-dev="'+devId+'"class="ctrlbtn">全屏</button>');
    $('.ctrlbtn').css({width:'80px',height:'30px',background:'transparent',color:'#fff',marginLeft:'5px',marginTop:'5px'}).hover(function(){
		$(this).css({backgroundColor:'rgba(239, 129, 33, 0.8)'});
	},function(){
		$(this).css({background:'transparent'});
	});*/
	$('.ctrlbtn').show();
	deviced[devId].col = 2;
	deviced[devId].row = 2;
	var hkW = $('#' + devId + 'tv').width();
	var hkH = $('#' + devId + 'tv').height();
	var smallocxdivWidth = (hkW - 4 * deviced[devId].col - 2) / deviced[devId].col;
	var smallocxdivHeight = (hkH - 4 * deviced[devId].row - 2) / deviced[devId].row;
	$('.smallocxdiv').css({
		width: smallocxdivWidth + 'px',
		height: smallocxdivHeight + 'px'
	});
	if (document.getElementById("HIKOBJECT1").object == null) {
		alert("请先下载控件并注册！");
		m_bDVRControl = null;
	} else {
		m_bDVRControl = document.getElementById("HIKOBJECT1");
		ChangeStatus(1);
	}

	if (deviced[devId].host != '' && deviced[devId].port != '' && deviced[devId].account != '' && deviced[devId].password != '') {
		setVideoConnect(devId);
	}
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
				var preHtml = '<div id="prebg" style="width:' + deviced.bg.width + 'px;height:' + deviced.bg.height + 'px;border:' + deviced.bg.borderWidth + 'px solid ' + deviced.bg.borderColor + ';background-color:' + deviced.bg.bgColor + ';position:relative;overflow:' + deviced.bg.scroll + ';"></div>';
				$('#previewBox').append(preHtml);
			} else if (deviced[i].devIndex == 8) {
				var oText = textShowMode(i);
				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;padding:' + deviced[i].padding + 'px;z-index:' + deviced[i].zIndex + ';"><div id="pre' + i + '"style="width:100%;height:100%;background-color:' + deviced[i].bgColor + ';font-size:' + deviced[i].fontSize + 'px;font-weight:' + deviced[i].fontWeight +
					';font-family:' + deviced[i].fontFamily + ';background-image:url(' + deviced[i].openImgurl + ');background-repeat:no-repeat;background-size:contain;color:' + deviced[i].fontColor + ';"><p id="' + i + 'txt">' + oText + '</p></div></div>';

			} else if (deviced[i].devIndex == 14) {
				var width = deviced[i].w;
				var height = deviced[i].h;
				var v = Math.min(width, height);
				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;background-color:' + deviced[i].bgColor + ';z-index:' + deviced[i].zIndex + ';color:#555;padding:' + deviced[i].padding + 'px;border-radius:50%;"><div id="pre' + i + '"style="width:' + v + 'px;height:' + v +
					'px;border-radius:50%;"></div><div style="position:absolute;z-index:200;bottom:10px;">' + deviced[i].devname + '</div></div>';
			} else if (deviced[i].devIndex == 11) {

				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;padding:' + deviced[i].padding + 'px;z-index:' + deviced[i].zIndex + ';"><button id="pre' + i + '"style="width:100%;height:100%;font-size:' + deviced[i].fontSize + 'px;font-family:' + deviced[i].fontFamily + ';font-weight:' + deviced[i].fontWeight +
					';background-repeat:no-repeat;background-size:cover;color:' + deviced[i].fontColor + ';background-color:' + deviced[i].bgColor + ';border-radius:10%;"></button></div>';

			} else if (deviced[i].devIndex == 2) {
				if (deviced[i].tagtype == 'pic') {
					var oText = '';
				} else {
					var oText = deviced[i].tagtext;
				}
				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;padding:' + deviced[i].padding + 'px;z-index:' + deviced[i].zIndex + ';"><div id="pre' + i + '"style="width:100%;height:100%;font-size:' + deviced[i].fontSize + 'px;font-weight:' + deviced[i].fontWeight + ';font-family:' + deviced[i].fontFamily +
					';background-color:' + deviced[i].bgColor + ';background-image:url(' + deviced[i].bgImg + ');color:' + deviced[i].fontColor + ';"><p id="' + i + 'txt">' + oText + '</p></div></div>';

			} else if (deviced[i].devIndex == 5) {

				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;padding:' + deviced[i].padding + 'px;z-index:' + deviced[i].zIndex + ';"><div id="pre' + i + '"style="width:100%;height:100%;font-size:' + deviced[i].fontSize + 'px;font-weight:' + deviced[i].fontWeight + ';font-family:' + deviced[i].fontFamily +
					';color:' + deviced[i].fontColor + ';background-color:' + deviced[i].bgColor + ';"><p id="' + i + 'txt"><span id="pre' + i + 'name"></span><span id="pre' + i + 'val"></span></p></div></div>';
			} else if (deviced[i].devIndex == 15) {

				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;background-color:' + deviced[i].bgColor + ';z-index:' + deviced[i].zIndex + ';color:#555;padding:' + deviced[i].padding + 'px;"><div id="pre' + i + '"style="width:100%;height:100%;"></div><div style="position:absolute;bottom:10px;">' + deviced[i].devname +
					'</div></div>';

			} else if (deviced[i].devIndex == 16) {

				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;background-color:' + deviced[i].bgColor + ';z-index:' + deviced[i].zIndex + ';color:#555;padding:' + deviced[i].padding + 'px;"><div id="pre' + i + '"style="width:100%;height:100%;background-image:url(' + deviced[i].openImgurl +
					');background-repeat:no-repeat;background-size:contain;"></div><div style="position:absolute;bottom:10px;">' + deviced[i].devname + '</div></div>';
			} else if (deviced[i].devIndex == 20) {

				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;padding:' + deviced[i].padding + 'px;z-index:' + deviced[i].zIndex + ';"><div id="pre' + i + '"style="width:100%;height:100%;font-size:' + deviced[i].fontSize + 'px;font-weight:' + deviced[i].fontWeight + ';font-family:' + deviced[i].fontFamily +
					';position:relative;background-color:' + deviced[i].bgColor + ';background-image:url(' + deviced[i].bgImg + ');background-repeat:no-repeat;background-size:contain;"></div></div>';
			} else if (deviced[i].devIndex == 22) { //地图
				var preHtml = '<div style="width:' + deviced[i].w + 'px;height:' + deviced[i].h + 'px;border:' + deviced[i].borderWidth + 'px solid ' + deviced[i].borderColor + ';position:absolute;left:' + (deviced[i].x) + 'px;top:' + (deviced[i].y) + 'px;padding:' + deviced[i].padding + 'px;z-index:' + deviced[i].zIndex + ';"><div id="pre' + i + '"style="width:100%;height:100%;"></div></div>';
			} else if (deviced[i].devIndex == 23) { //视频
				deviced[i].video = $('#' + i);
				$('#prebg').append($('#' + i));
				$('#' + i).resizable({
					disabled: true
				});
				$('#' + i + 'img').hide();
				if ($('#' + i).css('outline-style') !== 'none') {
					deviced[i].outlineStyle = $('#' + i).css('outline-style');
					$('#' + i).css('outline-style', 'none');
				}
				deviced[i].ocx.ConnectAllChannelEx(1); //打开所有通道的实时监控，参数 1--主码流,2--辅码流
			} else if (deviced[i].devIndex == 24) { //图表
				$('#prebg').append($('#' + i));
				$('#' + i).resizable({
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
				preChart.push(i);
				deviced[i].chartInterval = setInterval(function() {
					for (var moniId = 0; moniId < preChart.length; moniId++) {
						preCharts(preChart[moniId]);
					}
				}, 1000);
			}
			if (deviced[i].devFlag == 'groupBox') {
				var apId = deviced[i].appendTarget;
				$('#pre' + apId).append(preHtml);
			} else {
				if (i != 'bg') {
					$('#prebg').append(preHtml);
				}
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
		$.ajax({
			url: "./php/random.php",
			data: JsonData,
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
				//console.log(data);
				data = JSON.parse(data);
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
	}, 1500);
}