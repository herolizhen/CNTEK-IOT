$(function() {
	preview();
});


var intervalId = null;
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

//预览
function preview() {
	var preImg = {};
	var preChart = [];
	if ($.isEmptyObject(deviced)) {
		return false;
	} else {
		for (var i in deviced) {
			if (deviced[i].devIndex == 'bg') {
				var preHtml = '<div id="prebg" style="width:' + deviced.bg.width + 'px;height:' + deviced.bg.height + 'px;border:' + deviced.bg.borderWidth + 'px solid ' + JSONToTinycolor(deviced.bg.borderColor) + ';background-color:' + JSONToTinycolor(deviced.bg.bgColor) + ';position:relative;overflow:' + deviced.bg.scroll + ';"></div>';
				$('#previewBox').append(preHtml);
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
			} else if (deviced[i].devIndex == 11) {
				var preHtml = [
					' <div ',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; border: ' + deviced[i].borderWidth + 'px solid ' + JSONToTinycolor(deviced[i].borderColor) + '; padding: ' + deviced[i].padding + 'px; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;border-radius:10%;">',
					' <button id="pre' + i + '"',
					'	style="width: 100%; height: 100%; background: url(' + deviced[i].normalImg + ') 0% 0% / cover no-repeat ' + JSONToTinycolor(deviced[i].bgColor) + '; border-radius: 10%; font-size: ' + deviced[i].fontSize + 'px; font-weight: ' + deviced[i].fontWeight + '; color:' + JSONToTinycolor(deviced[i].fontColor) + '; font-family:' + deviced[i].fontFamily + ';"></button>',
					' </div>',
				].join('');
			} else if (deviced[i].devIndex == 14) {
				var preHtml = [
					' <div ',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; padding:  ' + deviced[i].padding + 'px; border-radius:  ' + deviced[i].borderRadius + 'px; border:' + deviced[i].borderWidth + 'px solid  ' + JSONToTinycolor(deviced[i].borderColor) + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
					' <div id="pre' + i + '"',
					' style="width: 100%; height: 100%; border-radius: 50%; -webkit-tap-highlight-color: transparent; user-select: none; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';outline: none;">',
					' </div>',
					' <span',
					' style="color: ' + deviced[i].fontColor + '; display: inline-block; position: absolute; bottom: 10px;">' + deviced[i].devname + '</span>',
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
				var html = [
					' <div id="' + i + '" class="dev chart" data-falg="false" data-bfalg="true" data-index="' + deviced[i].devIndex + '"',
					' style="width: ' + deviced[i].w + 'px; height: ' + deviced[i].h + 'px; padding:  ' + deviced[i].padding + 'px; border-radius:  ' + deviced[i].borderRadius + 'px; border: ' + deviced[i].borderWidth + 'px solid  ' + JSONToTinycolor(deviced[i].borderColor) + '; z-index: ' + deviced[i].zIndex + '; position: absolute; left: ' + deviced[i].x + 'px; top: ' + deviced[i].y + 'px;">',
					' <div id="' + i + 'img"',
					' style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; background: ' + JSONToTinycolor(deviced[i].bgColor) + ';outline: none;">',
					' </div>',
					' </div>',
				].join('');

				$('#prebg').append(html);

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
				MyLineChartInit(i);
				//edit by hero
				for (var moniId = 0; moniId < preChart.length; moniId++) {
					clearInterval(deviced[preChart[moniId]].chartInterval);
				}
				//end hero
				preChart.push(i);
				deviced[i].chartInterval = setInterval(function() {
					for (var moniId = 0; moniId < preChart.length; moniId++) {
						preCharts(preChart[moniId]);
					}
				}, 1000);
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
										backgroundColor: JSONToTinycolor(deviced[j].albgColor)
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
										backgroundColor: JSONToTinycolor(deviced[j].bgColor)
									});
								}
							} else if (data[i].devIndex == 14) { //表盘

								if (data[i].nowValue < deviced[j].alarmMinValue || data[i].nowValue > deviced[j].alarmMaxValue) {
									$('#pre' + j + '').parent().css({
										backgroundColor: JSONToTinycolor(deviced[j].albgColor)
									});
								} else {
									$('#pre' + j + '').parent().css({
										backgroundColor: JSONToTinycolor(deviced[j].bgColor)
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
										backgroundColor: JSONToTinycolor(deviced[j].albgColor)
									});
									if (paintalarm) {
										paintalarm = false;
										paintnormal = true;
										deviced[j].dial.bgColor = JSONToTinycolor(deviced[j].alpanelColor);
										deviced[j].dial.current = data[i].nowValue;
										deviced[j].dial.paintBottom();
									}
								} else {
									$('#pre' + j + '').css({
										backgroundColor: JSONToTinycolor(deviced[j].bgColor)
									});

									if (paintnormal) {
										paintnormal = false;
										paintalarm = true;
										deviced[j].dial.bgColor = JSONToTinycolor(deviced[j].panelColor);
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
							} else if (data[i].devIndex == 5) { //监测点
								$('#pre' + j).css({
									backgroundColor: JSONToTinycolor(deviced[j].bgColor)
								});
								if ((data[i].nowValue > deviced[j].alarmMaxValue) || (data[i].nowValue < deviced[j].alarmMinValue)) {
									if (deviced[j].moniShowMode == '0') {
										$('#pre' + j + 'val').text('');
									} else {
										if (deviced[j].alarmMode == 1) {
											$('#pre' + j).css({
												backgroundColor: JSONToTinycolor(deviced[j].albgColor)
											});
										}
										$('#pre' + j + 'val').text(data[i].nowValue).css({
											backgroundColor: JSONToTinycolor(deviced[j].albgColor)
										});
									}
								} else {
									if (deviced[j].moniShowMode == '0') {
										$('#pre' + j + 'val').text('');
									} else {
										$('#pre' + j + 'val').text(data[i].nowValue).css({
											backgroundColor: JSONToTinycolor(deviced[j].bgColor)
										});
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

function JSONToTinycolor(colvar) {
	try {
		if (typeof colvar == "object") {
			var color = tinycolor();
			color._r = colvar._r;
			color._g = colvar._g;
			color._b = colvar._b;
			color._a = colvar._a;
			return color;
		}
	} catch (e) {}
	return colvar;
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
//折线图图表初始化
function MyLineChartInit(devId) {
	deviced[devId].Chart = echarts.init(document.getElementById(devId + 'img'));
	deviced[devId].Chart.setOption(deviced[devId].option, true);
}