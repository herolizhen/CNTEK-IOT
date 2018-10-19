package com.cntek.iot.modbus.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cntek.iot.comm.dto.RetInfoDto;
import com.cntek.iot.comm.util.CRCCheck;
import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.entity.MbMdDefine;
import com.cntek.iot.modbus.service.IMbMdDefineService;
import com.cntek.iot.modbus.service.IMbMetadataDefineService;

@RestController
@RequestMapping("/modbus")
public class ModBusController {
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
			info.setMessage("pushMBData success.");
			info.setCode(0);
		} else {
			info.setMessage("pushMBData fail.");
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping(value = "/pushMBDataNew")
	public RetInfoDto pushMBData(@RequestBody MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		if (CRCCheck.checkHexString(dto.getData())) {
			mbMdDefineService.push(dto);
			info.setMessage("pushMBData success.");
			info.setCode(0);
		} else {
			info.setMessage("pushMBData fail.");
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping(value = "/selMdByDeviceId")
	public RetInfoDto selMdByDeviceId(@RequestBody MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			List<MbMdDefine> data = this.mbMdDefineService.getMdByDeviceID(dto.getDeviceId());
			info.setCode(0);
			info.setData(data);
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping(value = "/saveMd")
	public RetInfoDto saveMd(@RequestBody MbMdDefine dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbMdDefine data = this.mbMdDefineService.saveOrUpdateMd(dto);
			info.setCode(0);
			info.setData(data);
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping(value = "/delMdByIds")
	public RetInfoDto delMdByIds(@RequestBody MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			int ret = this.mbMdDefineService.delMbMdDefines(dto.getMbMdDefines());
			if (ret == 1) {
				info.setCode(0);
			} else {
				info.setCode(1);
			}
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

}
