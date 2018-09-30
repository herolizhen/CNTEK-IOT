package com.cntek.iot.modbus.dao;

import java.util.List;
import java.util.Map;

import com.cntek.iot.modbus.entity.DevRealTime;

public interface DevRealTimeMapper {
	int createTable(DevRealTime devRealTime);

	int existTable(String tableName);

	int dropTable(DevRealTime devRealTime);

	List<DevRealTime> getTableCols(DevRealTime devRealTime);

	Map<String, Object> selectLast(DevRealTime devRealTime);

	int insertData(DevRealTime DevRealTime);

}