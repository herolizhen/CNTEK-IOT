package com.cntek.iot.modbus.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cntek.iot.comm.dto.RetInfoDto;
import com.cntek.iot.comm.util.CRCCheck;
import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.service.IMbMdDefineService;
import com.cntek.iot.modbus.service.IMbMetadataDefineService;

@RestController
public class ModBus {
	@Autowired
	private IMbMetadataDefineService mbMetadataDefineService;
	@Autowired
	private IMbMdDefineService mbMdDefineService;

	@RequestMapping(value = "/push")
	public String push(@RequestParam(value = "data") String data) {
		data = "01031000D100C89C400001008C00000D0A0CAF4A96";
		mbMetadataDefineService.push(data);
		return data;
	}

	@RequestMapping(value = "/pushMBData")
	public RetInfoDto pushData(@RequestBody MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		if (CRCCheck.checkHexString(dto.getData())) {
			mbMetadataDefineService.push(dto);
			info.meta.put("message", "pushMBData success.");
			info.meta.put("code", "0");
		} else {
			info.meta.put("message", "pushMBData fail.");
			info.meta.put("code", "-1000");
		}
		return info;
	}
	
	@RequestMapping(value = "/pushMBDataNew")
	public RetInfoDto pushMBData(@RequestBody MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		if (CRCCheck.checkHexString(dto.getData())) {
			mbMdDefineService.push(dto);
			info.meta.put("message", "pushMBData success.");
			info.meta.put("code", "0");
		} else {
			info.meta.put("message", "pushMBData fail.");
			info.meta.put("code", "-1000");
		}
		return info;
	}

}
