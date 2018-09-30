package com.cntek.iot.modbus.service;

import java.util.List;

import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.entity.MbMetadataDefine;

public interface IMbMetadataDefineService {

	int push(String data);

	List<MbMetadataDefine> selMbMetadataDefineByDeviceId(String deviceId);

	int createNewTable(String tableName);

	int insertData(MbMetadataDefine define, Object data);

	int push(MbComm data);
}
