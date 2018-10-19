package com.cntek.iot.modbus.service;

import java.util.List;

import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.entity.MbMdDefine;

public interface IMbMdDefineService {

	int createNewTable(String tableName);

	int insertData(MbMdDefine define, Object data);

	int push(MbComm data);

	List<MbMdDefine> getMdByDeviceID(String device_id);

	MbMdDefine saveOrUpdateMd(MbMdDefine define);

	int delMbMdDefines(List<MbMdDefine> mbMdDefines);
}
