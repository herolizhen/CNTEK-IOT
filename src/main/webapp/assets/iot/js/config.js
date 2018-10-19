(function(w) {
	var cfg = {};
	const HOST = 'http://localhost:8080';
	const APPNAME = 'CNTEK-IOT';

	cfg.URL_SELECTBYPAGE = HOST + '/' + APPNAME + '/device/selectByPage';
	cfg.URL_SELMDBYDEVICEID = HOST + '/' + APPNAME + '/modbus/selMdByDeviceId';
	cfg.URL_SAVEMD = HOST + '/' + APPNAME + '/modbus/saveMd';
	cfg.URL_DELMDBYIDS = HOST + '/' + APPNAME + '/modbus/delMdByIds';

	w.$cfg = cfg;

})(window);