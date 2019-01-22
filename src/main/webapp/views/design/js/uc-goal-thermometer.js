var canvasPanel = function(){
    this.splitNum = 4;
    this.lineMaxlength = 8;
    this.lineMinLength = 3;
    this.danwei = "℃";
    this.MaxNum = 100;
    this.MinNum = 0;
    this.bgColor = 'rgb(3,3,195)';
    this.fontColor = 'rgb(3,3,195)';
    this.SplitfontSize =  '12';
    this.fontSize = '16';
    this.fontWeight = 'bold';
    this.SplitfontWeight = 'bold';
    this.fontFamily = 'Arial';
    this.SplitfontFamily = 'Arial';
    this.SplitfontColor = '#666';
    this.background = 'transparent';
    this.img1 = new Image();
    this.img1.src="../views/design/images/temperImg/glassBody.png";
   	this.img=new Image();
    this.img.src="../views/design/images/temperImg/glassBottom12.png";
    this.current = 50;
    this.timer = null;
}
canvasPanel.prototype.init =function(canvasId){
    var $this = this;
    $this.nowWidth = $('#'+canvasId).width();
    $this.nowHeight = $('#'+canvasId).height();
    if($('#'+canvasId).find('canvas').length>0){
    	$('#'+canvasId).empty();
    }
    $('#'+canvasId).append('<canvas width='+$this.nowWidth+'px height='+$this.nowHeight+'px style="background:'+$this.background+'"></canvas>');
    $this.myCanvas = $('#'+canvasId).find('canvas')[0];
    $this.context = $this.myCanvas.getContext('2d');
   	$this.times = Math.min((this.nowWidth/100),(this.nowHeight/220)).toFixed(2);
   	$this.splitHeight = (128/$this.splitNum).toFixed(2);
   	$this.SplitFontSize =  Math.round(12*$this.times);
    $this.ValueFontSize = Math.round(16*$this.times);
    $this.context.clearRect(0,0,$this.myCanvas.offsetWidth,$this.myCanvas.offsetHeight);
    var img2 = new Image();
    img2.src="../views/design/images/temperImg/glassTop.png";
    img2.onload=function(){
        $this.context.drawImage(img2,52*$this.times,0,34*$this.times,12*$this.times);
    }
    
  if($this.img.complete) { 
		$this.paintBottom();
		$this.paintFont();
		$this.paintNowValue($this.current);
		$this.paintSplit();
		return false; 
	}
  $this.img.onload = function(){
    $this.paintBottom();
    $this.paintFont();
    $this.paintNowValue($this.current);
    $this.paintSplit();
  }
}
canvasPanel.prototype.paintFont = function (){
  var $this = this;
  $this.value = (($this.MaxNum-$this.MinNum)/$this.splitNum).toFixed(2);
  var fontStyle = $this.SplitfontWeight+' '+Math.round($this.SplitfontSize*$this.times)+'px '+$this.SplitfontFamily; 
  $this.context.font = fontStyle;
  $this.context.fillStyle = $this.SplitfontColor;
 
  for(var i=0;i<=$this.splitNum;i++){ 
  	var zhi = ($this.MaxNum-$this.value*i).toFixed(1);
    $this.context.fillText(zhi+$this.danwei, 3*$this.times, (18+$this.splitHeight*i)*$this.times);
  }  
}

canvasPanel.prototype.paintSplit = function(){
    var $this = this;
    var smallSplit = ($this.splitHeight/5).toFixed(2);
    for(var i=0;i<$this.splitNum;i++){
        $this.context.strokeStyle='#000';
        $this.context.lineWidth=1;
        $this.context.lineCap='square';
        $this.context.beginPath();
        $this.context.moveTo(60*$this.times,(13+$this.splitHeight*i)*$this.times);
        $this.context.lineTo((60+$this.lineMaxlength)*$this.times,(13+$this.splitHeight*i)*$this.times);
        $this.context.stroke();
        $this.context.closePath();
        for(var j=1;j<5;j++){
            $this.context.beginPath();
            $this.context.moveTo(60*$this.times,(13+$this.splitHeight*i+smallSplit*j)*$this.times);
            $this.context.lineTo((60+$this.lineMinLength)*$this.times,(13+$this.splitHeight*i+smallSplit*j)*$this.times);
            $this.context.stroke();
            $this.context.closePath();
        }
    }
}

canvasPanel.prototype.paintBottom = function(){
	var $this=this;
	$this.context.clearRect(45*$this.times,12*$this.times,48*$this.times,183*$this.times);
	if(!$this.img1.complete){
  	$this.img1.onload=function(){
       $this.context.drawImage($this.img1,52*$this.times,13*$this.times,34*$this.times,130*$this.times);
    }
  }else{
    $this.context.drawImage($this.img1,52*$this.times,13*$this.times,34*$this.times,130*$this.times);
		$this.context.drawImage($this.img,45*$this.times,143*$this.times,48*$this.times,52*$this.times);
    $this.context.beginPath(); 
    $this.context.fillStyle=$this.bgColor;
    $this.context.fillRect(60*$this.times,142*$this.times,19*$this.times,12*$this.times);
    $this.context.closePath(); 
    var g1 = $this.context.createRadialGradient(65*$this.times,160*$this.times,0,65*$this.times,164*$this.times,12*$this.times);  
    g1.addColorStop(0.1, 'rgb(220,220,220)');    
    g1.addColorStop(1, $this.bgColor); 
    $this.context.fillStyle = g1;  
    $this.context.beginPath();  
    $this.context.arc(69*$this.times,167*$this.times,17*$this.times,0, Math.PI * 2, true);  
    $this.context.closePath();  
    $this.context.fill();  
	}
}

canvasPanel.prototype.paintNowValue = function (num){
    var $this=this;
    if(num>$this.MaxNum){
        num = $this.MaxNum;
    }else if(num<$this.MinNum){
        num = $this.MinNum;
    }
    var percentage = (num-$this.MinNum)/($this.MaxNum-$this.MinNum);
    var mHeight = Math.round((141-13)*$this.times * percentage); 
    $this.context.clearRect(45*$this.times,12*$this.times,48*$this.times,131*$this.times);
    $this.context.clearRect(0,195*$this.times,$this.nowWidth,40*$this.times);
    $this.context.drawImage($this.img1,52*$this.times,12*$this.times,34*$this.times,131*$this.times);
    $this.context.beginPath(); 
		$this.context.fillStyle=$this.bgColor;
    $this.context.fillRect(59*$this.times,(141*$this.times-mHeight),20*$this.times,10*$this.times+mHeight);
    $this.context.closePath();
    $this.paintSplit();
    var fontStyle = $this.fontWeight+' '+Math.round($this.fontSize*$this.times)+'px '+$this.fontFamily;
    $this.context.font = fontStyle;
    $this.fontColor = $this.bgColor;
    $this.context.fillStyle = $this.fontColor;
    $this.context.fillText(num+$this.danwei,45*$this.times,210*$this.times);
}