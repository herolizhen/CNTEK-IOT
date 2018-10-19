(function(w) {
	var modbus = {};

	modbus.token = '';

	function Initialize() {
	}
	;

	modbus.selMdByDeviceId = function(data, success, error) {
		Initialize();
		$iot.POST($cfg.URL_SELMDBYDEVICEID, modbus.token, data, success, error);
	};
	modbus.saveMd = function(data, success, error) {
		Initialize();
		$iot.POST($cfg.URL_SAVEMD, modbus.token, data, success, error);
	};
	modbus.delMdByIds = function(data, success, error) {
		Initialize();
		$iot.POST($cfg.URL_DELMDBYIDS, modbus.token, data, success, error);
	};
	w.$modbus = modbus;
})(window);