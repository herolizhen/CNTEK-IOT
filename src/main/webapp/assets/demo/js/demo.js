var pandleft = null; //添加控件与左边距离
var pandtop = null; //添加控件与顶部距离

var falg = false; //是否拖动控件名称的标识
var devId = ''; //新添控件的ID
var count = 0; //添加的控件个数
var deviced = {}; //存储所有控件的所有属性
var type = {}; //按钮类型


function dclick(index) {
	var html = null;
	devId = 'dev_' + count;
	var zIn = 800 + count;
	html = '<div id="' + devId + '" class="dev" data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:102px;height:132px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img" style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;background-size:contain;"></div></div>';
	if (index == 1) { //静态标签
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%; background:url(./images/' + index + '.png) no-repeat;"></div></div>';
	} else if (index == 2) { //监测点
		html = '<div id="' + devId + '"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="width:100px;height:30px;border:1px solid #ccc;padding:2px;z-index:' + zIn + ';"><div id="' + devId + 'img"style="width:100%;height:100%;overflow:hidden;background-color:rgba(0,0,0,0);color:#333;font-size:14px;font-weight:bold;"><p id="p' + devId + 'img"style="width:100%;"><span id="' + devId + 'name">监测点</span><span id="' + devId + 'val"></span></p></div></div>';
	} else if (index == 3) { //图片
		html = '<div id="' + devId + '_out"class="dev"data-falg="false"data-bfalg="false"data-index="' + index + '"style="padding: 8px; border: 2px solid rgb(255, 0, 255); border-image: none;  width: 100px; height: 120px; position: absolute; z-index: ' + zIn + '; outline-offset: -8px;">'
			+ '<div id="' + devId + '"style="background: 0% 0% / contain rgb(0, 255, 255); outline: invert; border-radius: 10px; border: 2px solid rgb(32, 158, 145); border-image: none; width: 100%; height: 100%;"></div></div>';
	}
	count++;
	falg = true;
	return html;
}

$(function() {

	$('#resizeBox').click(function() {
		var rBox = $(this).get(0);
		$('#contentBox').find('div').css({
			outline : 'none'
		});
		var devAttr = $('.dev');
		$(this).css({
			outline : '2px dotted red'
		});
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
		if (falg) {
			falg = false;
			$target.append(html);

			//			$('#' + devId).css({
			//				position : 'absolute',
			//				left : left,
			//				top : top
			//			});

			$('#' + devId + '_out').css({
				position : 'absolute',
				left : left,
				top : top
			});
		}

		$('#' + devId + '_out').mouseover(function(e) {
			$("#dev_east").text(e.offsetX +'-'+ e.clientX +'-'+parseInt($(this).offset().left)  +'-'+  $(this).outerWidth());

			if (Math.abs(e.offsetX + e.clientX - $(this).offset().left) < 5 ||Math.abs(e.offsetX - $(this).outerWidth()) < 5) {
				$(this).css({
					cursor : 'w-resize'
				});
			} else if (Math.abs(e.offsetY + e.clientY - $(this).offset().top) < 5 ||Math.abs(e.offsetY - $(this).outerHeight()) < 5) {
				$(this).css({
					cursor : 's-resize'
				});
			} else {
				$(this).css({
					cursor : 'default'
				});
			}

		});

		$('#' + devId).draggable({
			onStopDrag : function(e) {
				$(this).trigger('click');
			}
		});

		$('#' + devId).click(function(e) {
			e.stopPropagation();
			$('#contentBox').find('div').css({
				outline : 'none'
			});
			$(this).css({
				//outline : '2px dotted red'
				outline : 'rgb(32, 158, 145) dotted 4px'
			});
		});

	}
});