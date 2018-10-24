(function(w) {
	var cfg = {};
	const HOST = 'http://localhost:8080';
	const APPNAME = 'CNTEK-IOT';

	cfg.URL_DEV_SELECTBYPAGE = HOST + '/' + APPNAME + '/device/selectByPage';
	cfg.URL_DEV_SAVEORUPDATE = HOST + '/' + APPNAME + '/device/saveOrUpdate';
	cfg.URL_MBMD_SELMDBYDEVICEID = HOST + '/' + APPNAME + '/modbus/selMdByDeviceId';
	cfg.URL_MBMD_SAVEMD = HOST + '/' + APPNAME + '/modbus/saveMd';
	cfg.URL_MBMD_DELMDBYIDS = HOST + '/' + APPNAME + '/modbus/delMdByIds';

	w.$cfg = cfg;
})(window);