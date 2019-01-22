package com.cntek.iot.device.action;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cntek.iot.comm.dto.PageQuery;
import com.cntek.iot.comm.dto.RetInfoDto;
import com.cntek.iot.device.entity.DevAccount;
import com.cntek.iot.device.service.IDeviceService;
import com.cntek.iot.modbus.service.IDevRealTimeService;

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
	@Autowired
	private IDevRealTimeService devRealTimeService;

	private static Log log = LogFactory.getLog(DeviceController.class);

	@Transactional
	@RequestMapping(value = "/selectAll", method = RequestMethod.POST)
	public RetInfoDto selectAll() {
		RetInfoDto info = new RetInfoDto();

		try {
			List<DevAccount> data = this.deviceService.selectAll();
			info.setCode(0);
			info.setData(data);
		} catch (Exception e) {
			log.error(e);
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@Transactional
	@RequestMapping(value = "/selectByPage", method = RequestMethod.POST)
	public RetInfoDto selectByPage(@RequestBody PageQuery page) {
		RetInfoDto info = new RetInfoDto();
		try {
			List<DevAccount> data = this.deviceService.selectByPage(page.getCurrIndex(), page.getPageSize());
			info.setCode(0);
			info.setData(data);
		} catch (Exception e) {
			log.error(e);
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@Transactional
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	public RetInfoDto saveOrUpdate(@RequestBody DevAccount dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			DevAccount data = this.deviceService.saveOrUpdate(dto);
			if (data != null) {
				info.setCode(0);
			} else {
				info.setCode(1);
			}
			info.setData(data);

		} catch (Exception e) {
			log.error(e);
			info.setMessage(e.getMessage());
			info.setCode(-1);
			info.setData(dto);
		}
		return info;
	}

	@Transactional
	@RequestMapping(value = "/getRealTimeData", method = RequestMethod.POST)
	public RetInfoDto getRealTimeData(@RequestBody DevAccount dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			List<Map<String, Object>> data = this.devRealTimeService.selectLast(dto.getDeviceId());
			if (data != null) {
				info.setCode(0);
			} else {
				info.setCode(1);
			}
			info.setData(data);

		} catch (Exception e) {
			log.error(e);
			info.setMessage(e.getMessage());
			info.setCode(-1);
			info.setData(dto);
		}
		return info;
	}
}
