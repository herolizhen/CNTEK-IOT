package com.cntek.iot.dtu.service;

import java.util.List;

import com.cntek.iot.dtu.entity.MbDtuConfig;
import com.cntek.iot.dtu.entity.MbDtuInfo;

public interface IMbDtuService {

	MbDtuConfig selectConfigByPk(String id);

	List<MbDtuConfig> selectConfigByUserId(String userId);

	MbDtuConfig insertOrUpdateConfig(MbDtuConfig record);

	int deleteConfigByPks(String[] ids);

	List<MbDtuInfo> selectInfoAll();

	MbDtuInfo selectInfoByPk(String id);

	MbDtuInfo insertOrUpdateInfo(MbDtuInfo record);

	int deleteInfoByPks(String[] ids);

	boolean validDtuPw(String dtuSn, String password);

	boolean validDtuSn(String configId, String dtuSn);
}
