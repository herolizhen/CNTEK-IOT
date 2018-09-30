package com.cntek.iot.device.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cntek.iot.comm.dto.PageQuery;
import com.cntek.iot.comm.dto.RetInfoDto;
import com.cntek.iot.device.entity.DevAccount;
import com.cntek.iot.device.service.IDeviceService;

/**
 * @class:DeviceController
 * @TODO:
 * @author:Herolizhen
 * @date:2018年9月29日
 */
@RestController
@RequestMapping("/device")
public class DeviceController {

	@Autowired
	private IDeviceService deviceService;

	private static Log log = LogFactory.getLog(DeviceController.class);

	@Transactional
	@RequestMapping(value = "/selectAll", method = RequestMethod.POST)
	public RetInfoDto selectAll() {
		RetInfoDto info = new RetInfoDto();

		try {
			List<DevAccount> data = this.deviceService.selectAll();
			if (data.size() == 0) {
				info.meta.put("message", "no data for this stats.");
				info.meta.put("code", 100);
			} else {
				info.meta.put("code", 0);
				info.data.put("data", data);
			}
		} catch (Exception e) {
			log.error(e);
			info.meta.put("message", e.getMessage());
			info.meta.put("code", -200);
		}
		return info;
	}

	@Transactional
	@RequestMapping(value = "/selectByPage", method = RequestMethod.POST)
	public RetInfoDto selectByPage(@RequestBody PageQuery page) {
		RetInfoDto info = new RetInfoDto();
		try {
			List<DevAccount> data = this.deviceService.selectByPage(page.getCurrIndex(), page.getPageSize());
			if (data.size() == 0) {
				info.meta.put("message", "no data for this stats.");
				info.meta.put("code", 100);
			} else {
				info.meta.put("code", 0);
				info.data.put("data", data);
			}
		} catch (Exception e) {
			log.error(e);
			info.meta.put("message", e.getMessage());
			info.meta.put("code", -200);
		}
		info.data.put("page", page);
		return info;
	}

}
