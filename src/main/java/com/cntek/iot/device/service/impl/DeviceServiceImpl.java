package com.cntek.iot.device.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.cntek.iot.device.dao.DevAccountMapper;
import com.cntek.iot.device.entity.DevAccount;
import com.cntek.iot.device.service.IDeviceService;


@Service("deviceService")
public class DeviceServiceImpl implements IDeviceService {
	private static Log log = LogFactory.getLog(DeviceServiceImpl.class);
	@Resource
	DevAccountMapper devAccountDao;

	@Override
	public List<DevAccount> selectAll() throws Exception {
		return this.devAccountDao.selectAll();
	}

	@Override
	public List<DevAccount> selectByPage(int currPage, int pageSize) {
		Map<String, Object> data = new HashMap<String, Object>();
        data.put("currIndex", (currPage-1)*pageSize);
        data.put("pageSize", pageSize);
		return this.devAccountDao.selectByPage(data);
	}

}
