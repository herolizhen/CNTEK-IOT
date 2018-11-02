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
		html = '<div id="' + devId + '" class="dev video" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:700px;height:500px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';background:#5c5c5c;"><p style="width:100%;height:30px;font:16px bolder 微软雅黑;color:#fff;margin-left:10px;">视频监控</p><div id="' + devId + 'tv" style="width:70%;height:90%;float:left;border:1px solid #ccc;margin-left:10px;position:relative;"><p id="tvtishi"style="position:absolute;color:#fff;left:100px;top:180px;font-size:16px;font-weight:bold;width:300px;display:none;">因控件的限制，该控件仅支持IE浏览器</p></div><div id="' + devId + 'ctrl"style="width:175px;height:90%;float:left;margin-left:10px;"><div id="playbtn" style="margin-left:5px;color:#fff;"><p style="margin-left:5px;color:#fff;">通道选择：<select id="channel"></select></p><button id="startPreview" data-dev="' + devId + '"class="ctrlbtn">开始预览</button><button id="stopPreview"class="ctrlbtn"data-dev="' + devId + '">停止预览</button><button id="startVideo"data-dev="' + devId + '"class="ctrlbtn">开始录像</button><button id="stopVideo"data-dev="' + devId + '"class="ctrlbtn">停止录像</button><button id="openall"class="ctrlbtn"data-dev="' + devId + '">全部打开</button><button id="closeall"class="ctrlbtn"data-dev="' + devId + '">全部关闭</button><button id="capture"data-dev="' + devId + '"class="ctrlbtn">抓图</button><button id="fullScreen"data-dev="' + devId + '"class="ctrlbtn">全屏</button></div><div id="' + devId + 'console"style="width:160px;height:150px;margin-left:10px;margin-top:5px;"> <button class="yt2 yt"data-dev="' + devId + '" href="javascript:;" ></button><button class="yt4 yt"data-dev="' + devId + '"href="javascript:;" ></button><button class="yt5 yt" data-dev="' + devId + '" href="javascript:;" id="cptz"></button><button class="yt6 yt" data-dev="' + devId + '"href="javascript:;"></button><button class="yt8 yt"data-dev="' + devId + '" href="javascript:;" ></button></div><table style="color:#fff;margin:0 auto 5px;"><tr><td><button id="focus_minus"class="ctrlb"data-dev="' + devId + '">-</button></td><td>调焦</td><td><button id="focus_plus" class="ctrlb"data-dev="' + devId + '">+</button></td></tr><tr><td><button id="zoom_minus"class="ctrlb"data-dev="' + devId + '">-</button></td><td>变倍</td><td><button id="zoom_plus"class="ctrlb"data-dev="' + devId + '">+</button></td></tr> <tr><td><button  id="aperture_minus"class="ctrlb"data-dev="' + devId + '">-</button></td><td>光圈</td><td><button id="aperture_plus" class="ctrlb"data-dev="' + devId + '">+</button></td></tr></table><p style="margin-bottom:5px;margin-left:5px;color:#fff;">预置点:<select id="presetPoint"data-dev="' + devId + '"style="width:80px;margin-left:5px;"></select></p><button id="preset" class="prePoint">预置</button><button id="use"data-dev="' + devId + '"class="prePoint">调用</button></div><div id="' + devId + 'img" class="mapDrag"style="position:absolute;left:0px;top:-24px;width:20px;height:20px;background:url(./images/move.jpg);border:1px solid #666;z-index:10px;"></div></div>';
	} else if (index == 24) { //图表控件
		html = '<div id="' + devId + '" class="dev chart" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:400px;height:300px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%;"></div></div>';
	}
	count++;
	falg = true;
	return html;
}

$(function() {

	deviced.bg = {
		x : 0,
		y : 0,
		w : parseInt($('#resizeBox').width()),
		h : parseInt($('#resizeBox').height()),
		controlType : '背景',
		devIndex : 'bg',
		borderWidth : '1',
		borderColor : '#cccccc',
		bgColor : '#ffffff',
		bgImg : '',
		showmode : 'normal',
		scroll : 'hidden'
	};

	$('#resizeBox').click(function() {
		var rBox = $(this).get(0);
		$('.mapDrag').hide();
		$('#contentBox').find('div').css({
			outline : 'none'
		});
		var devAttr = $('.dev');
		for (var i = 0; i < devAttr.length; i++) {
			if (deviced[devAttr.eq(i).attr('id')].shape == 'circle') {
				devAttr.eq(i).css({
					borderRadius : '50%'
				});
			}
		}
		$(this).css({
			outline : '2px dotted red'
		});

		deviced.bg.w = parseInt(rBox.scrollWidth);
		deviced.bg.h = parseInt(rBox.scrollHeight);

		deviced.bg.width = parseInt($('#resizeBox').width());
		deviced.bg.height = parseInt($('#resizeBox').height());

		$(this).resizable({
			disabled : false,
			handles : 'e,s,se',
			minWidth : 200,
			minHeight : 200,
			maxWidth : 1000,
			maxHeight : 1000,
			edge : 10,
			onStopResize : function(e) {}
		});
		$("#selele").find("[data-Id='bg']").attr('selected', 'selected').siblings().removeAttr('selected');
		var title = $("#selele").find("[data-Id='bg']").text();
		$('#eastBox').panel('setTitle', '属性[　' + title + ']');
		//select 器件类型中火狐对selected的解析不一样，导致出现错误。但不报错，网上搜索的解决方案在select中添加属性autocomplete="off"，但添加后未能解决问题
		$('#t_property').find('tr').hide();
		$('.static').show();

		for (var i in deviced.bg) {
			$('[name="' + i + '"]').val(deviced.bg[i]);
		}
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
			n.html('<p style="position:relative;z-index:9999;">'+ $(source).html() +'</p>').appendTo('body');
			return n;
		},
		onStopDrag : function(e) { //拖拽完成时触发
			pandleft = e.clientX ;
			pandtop = e.clientY  ;
		}
	});

	function createDev($target, left, top, html, DevFlag) {
		if (falg) {

			falg = false;
			$target.append(html);
			$('#' + devId).css({
				position : 'absolute',
				left : left,
				top : top
			});
			var menuIndex = $('#' + devId).attr('data-index');
			var menuText = $('[id="a_' + menuIndex + '"]').text();

			$('#selele').append('<option data-Id="' + devId + '"value="' + menuIndex + '">' + menuText + '</option>');

			deviced[devId] = {
				x : parseInt(left),
				y : parseInt(top),
				w : parseInt($('#' + devId).width()),
				h : parseInt($('#' + devId).height()),
				controlType : menuText,
				devIndex : menuIndex,
				borderWidth : '1',
				borderColor : '#cccccc',
				padding : '2',
				devname : '',
				normalImg : './images/' + menuIndex + '.png',
				mename : $('[data-Id=' + devId + ']').val(),
				devlevel : '',
				zIndex : $('#' + devId).css('zIndex'),
				devFlag : DevFlag,
				appendTarget : $target.parent().attr('id'),
				outlineStyle : 'none',
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
				deviced[devId].lineStyle = [ [ 0.2, '#fc1' ], [ 0.8, '#48b' ], [ 1, '#f00' ] ];
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
			}
		}

		$('#' + devId).draggable({
			handle : '#' + devId + 'img',
			onStopDrag : function(e) {
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
							left : (zoneLeft + devLeft) + 'px',
							top : (zoneTop + devTop) + 'px'
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
									left : x + 'px',
									top : y + 'px'
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
		
		$('#'+devId).click(function(e){	
			e.stopPropagation();
			var title = $('.tabs-selected').text();  
			if(title=="预览"){
				return false;
			}
			var devAttr = $('.dev');
			for(var i=0;i<devAttr.length;i++){
				if(deviced[devAttr.eq(i).attr('id')].shape=='circle'){
					devAttr.eq(i).css({borderRadius:'50%'});
				}
				deviced[devAttr.eq(i).attr('id')].outlineStyle = 'none';
			}
			$('#contentBox').find('div').css({outline:'none'});
			
			$(this).css({outline:'2px dotted red'});
		});

	}
});

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