package com.cntek.iot.device.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.cntek.iot.device.dao.DevAccountMapper;
import com.cntek.iot.device.entity.DevAccount;
import com.cntek.iot.device.service.IDeviceService;
import com.mysql.cj.util.StringUtils;

@Service("deviceService")
public class DeviceServiceImpl implements IDeviceService {
	@SuppressWarnings("unused")
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
		data.put("currIndex", (currPage - 1) * pageSize);
		data.put("pageSize", pageSize);
		return this.devAccountDao.selectByPage(data);
	}

	@Override
	public DevAccount saveOrUpdate(DevAccount record) {
		int ret = 0;
		if (StringUtils.isNullOrEmpty(record.getDeviceId())) {
			record.setDeviceId(UUID.randomUUID().toString());
			ret = this.devAccountDao.insert(record);
		} else {
			ret = this.devAccountDao.updateByPrimaryKeySelective(record);
		}

		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

}
