package com.cntek.iot.device.dao;

import java.util.List;
import java.util.Map;

import com.cntek.iot.device.entity.DevAccount;

public interface DevAccountMapper {
    int deleteByPrimaryKey(String deviceId);

    int insert(DevAccount record);

    int insertSelective(DevAccount record);

    DevAccount selectByPrimaryKey(String deviceId);

    int updateByPrimaryKeySelective(DevAccount record);

    int updateByPrimaryKey(DevAccount record);
    
	List<DevAccount> selectAll();
	List<DevAccount> selectByPage(Map<String, Object> data);
}