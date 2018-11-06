(function(w) {
	var modbus = {};

	modbus.token = '';

	function Initialize() {
	};

	modbus.selMdByDeviceId = function(data, success, error) {
		Initialize();
		$iot.POST($cfg.URL_MBMD_SELMDBYDEVICEID, modbus.token, data, success, error);
	};
	modbus.saveMd = function(data, success, error) {
		Initialize();
		$iot.POST($cfg.URL_MBMD_SAVEMD, modbus.token, data, success, error);
	};
	modbus.delMdByIds = function(data, success, error) {
		Initialize();
		$iot.POST($cfg.URL_MBMD_DELMDBYIDS, modbus.token, data, success, error);
	};
	w.$modbus = modbus;
})(window);