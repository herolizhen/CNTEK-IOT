package com.cntek.iot.modbus.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.cntek.iot.modbus.dao.DevRealTimeMapper;
import com.cntek.iot.modbus.entity.DevRealTime;
import com.cntek.iot.modbus.service.IDevRealTimeService;

/**
 * @class:DevRealTimeServiceImpl
 * @TODO:
 * @author:Herolizhen
 * @date:2018年9月19日
 */
@Service("devRealTimeService")
public class DevRealTimeServiceImpl implements IDevRealTimeService {
	private static Log log = LogFactory.getLog(DevRealTimeServiceImpl.class);
	@Resource
	DevRealTimeMapper devRealTimeDao;

	@Override
	public int createNewTable(String tableName) {
		String colDefString = "dtime datetime not null DEFAULT CURRENT_TIMESTAMP,keyvalue decimal(10,4),device_id varchar(36),keyname varchar(36) not null,primary key (dtime, keyname)";
		DevRealTime drt = new DevRealTime();
		drt.setColDefString(colDefString);
		tableName = "T_RT_" + tableName.replaceAll("\\-", "");
		drt.setTableName(tableName);
		return this.devRealTimeDao.createTable(drt);
	}

	@Override
	public int existTable(String tableName) {
		tableName = "T_RT_" + tableName.replaceAll("\\-", "");
		return this.devRealTimeDao.existTable(tableName);
	}

	@Override
	public int dropTable(String tableName) {
		DevRealTime drt = new DevRealTime();
		tableName = "T_RT_" + tableName.replaceAll("\\-", "");
		drt.setTableName(tableName);
		return this.devRealTimeDao.dropTable(drt);
	}

	@Override
	public int createTable(String tableName, String jsonString) {
		try {
			JSONObject obj = JSONObject.parseObject(jsonString);
			StringBuffer colDefBuffer = new StringBuffer();
			colDefBuffer.append("dtime timestamp(3) not null DEFAULT CURRENT_TIMESTAMP(3),device_id varchar(36),");
			for (String key : obj.keySet()) {
				colDefBuffer.append("col_" + key.toLowerCase() + " decimal(10,4),");
			}
			colDefBuffer.append("primary key (dtime)");
			DevRealTime drt = new DevRealTime();
			drt.setColDefString(colDefBuffer.toString());
			tableName = "T_RT_" + tableName.replaceAll("\\-", "");
			drt.setTableName(tableName);
			this.devRealTimeDao.createTable(drt);
		} catch (Exception e) {
			System.out.println("ESHARE Alert createTable  Fail, Payload Syntax Error:" + jsonString);
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public int insertData(String tableName, String jsonString) {
		try {
			JSONObject obj = JSONObject.parseObject(jsonString);
			StringBuffer insertBuffer = new StringBuffer();
			insertBuffer.append("(");
			for (String key : obj.keySet()) {
				insertBuffer.append("col_" + key.toLowerCase() + ",");
			}
			insertBuffer.append("device_id) values(");
			for (String key : obj.keySet()) {
				insertBuffer.append(obj.get(key) + ",");
			}
			insertBuffer.append("'" + tableName + "') ");
			DevRealTime drt = new DevRealTime();
			drt.setInsertString(insertBuffer.toString());
			tableName = "T_RT_" + tableName.replaceAll("\\-", "");
			drt.setTableName(tableName);
			this.devRealTimeDao.insertData(drt);
		} catch (Exception e) {
			System.out.println("ESHARE Alert insertData  Fail, Payload Syntax Error:" + jsonString);
			System.out.println("ESHARE Alert insertData  Fail :" + e.getMessage());
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public List<Map<String, Object>> selectLast(String tableName) {
		DevRealTime drt = new DevRealTime();
		tableName = "T_RT_" + tableName.replaceAll("\\-", "");
		drt.setTableName(tableName);
		List<Map<String, Object>> lastDateSet = this.devRealTimeDao.selectLast(drt);
		return lastDateSet;
	}

}
