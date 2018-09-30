(function(w) {
	var iot = {};

	iot.POST = function(url, token, data, success, error) {
		$.ajax({
			url : url,
			type : 'POST',
			crossDomain : true,
			timeout : 5000,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(data),
			headers : {
				"content-type" : "application/json",
				"authorization" : token
			},
			dataType : 'json',
			success : function(ret) {
				//console.log(url+'返回code码：-----------》'+ret.meta.code);
				if (!$api.isNull(ret) && !$api.isNull(ret.meta) && !$api.isNull(ret.meta.code)) {
					if (ret.meta.code == 0) {
						success(ret.data);
					} else {
						error();
					}
				} else {
					error();
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				//console.log('XMLHttpRequest-------------------->'+XMLHttpRequest);
				error();
			}
		});
	}

	w.$iot = iot;
})(window);