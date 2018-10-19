(function(w) {
	var iot = {};
	var err={"code":-100,"message":"request error!"};
	
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
				//console.log(url+'返回code码：-----------》'+ret.code);
				if (!$api.isNull(ret) && !$api.isNull(ret.code)) {
					if (ret.code == 0) {
						success(ret);
					} else {
						error(ret);
					}
				} else { 
					error(err);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				//console.log('XMLHttpRequest-------------------->'+XMLHttpRequest);
				err.message = XMLHttpRequest;
				error(err);
			}
		});
	}

	w.$iot = iot;
})(window);