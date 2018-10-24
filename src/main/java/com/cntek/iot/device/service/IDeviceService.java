package com.cntek.iot.device.service;

import java.util.List;

import com.cntek.iot.device.entity.DevAccount;

public interface IDeviceService {

	List<DevAccount> selectAll() throws Exception;
	List<DevAccount> selectByPage(int currPage, int pageSize);
	
	DevAccount saveOrUpdate(DevAccount record);
}
