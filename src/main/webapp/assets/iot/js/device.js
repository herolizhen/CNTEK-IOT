(function (w) {
    var dev = {};
    
    dev.token ='';
    
    function Initialize() {
    };
    
    dev.selectByPage = function (data, success, error) {
    	Initialize();
    	$iot.POST($cfg.URL_SELECTBYPAGE, dev.token, data, success, error);
    };
    w.$dev = dev;
})(window);