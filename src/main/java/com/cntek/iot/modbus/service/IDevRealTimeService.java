package com.cntek.iot.modbus.service;

import java.util.List;
import java.util.Map;

public interface IDevRealTimeService {
	int createNewTable(String tableName);

	int createTable(String tableName, String jsonString);

	int existTable(String tableName);

	int dropTable(String tableName);

	int insertData(String tableName, String jsonString) throws Exception;

	List<Map<String, Object>> selectLast(String tableName) throws Exception;

}
