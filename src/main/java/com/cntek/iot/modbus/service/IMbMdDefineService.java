package com.cntek.iot.modbus.service;


import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.entity.MbMdDefine;

public interface IMbMdDefineService {

	int createNewTable(String tableName);

	int insertData(MbMdDefine define, Object data);

	int push(MbComm data);
}
