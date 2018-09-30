(function (w) {
	var cfg = {};
	const HOST = 'localhost:8080';
	const APPNAME = 'CNTEK-IOT';

	cfg.URL_SELECTBYPAGE = 'http://' + HOST + '/' + APPNAME + '/device/selectByPage';

	w.$cfg = cfg;
})(window);