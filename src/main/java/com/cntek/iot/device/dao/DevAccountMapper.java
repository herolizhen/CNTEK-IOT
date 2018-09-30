package com.cntek.iot.device.dao;

import com.cntek.iot.device.entity.DevAccount;
import java.util.List;
import java.util.Map;

public interface DevAccountMapper {
	int deleteByPrimaryKey(String deviceId);

	int insert(DevAccount record);

	DevAccount selectByPrimaryKey(String deviceId);

	List<DevAccount> selectAll();

	int updateByPrimaryKey(DevAccount record);

	List<DevAccount> selectByPage(Map<String, Object> data);
}