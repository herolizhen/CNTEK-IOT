package com.cntek.iot.modbus.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cntek.iot.modbus.entity.MbMdDefine;

public interface MbMdDefineMapper {
	int deleteByPrimaryKey(String id);

	int insert(MbMdDefine record);

	int insertSelective(MbMdDefine record);

	MbMdDefine selectByPrimaryKey(String id);

	int updateByPrimaryKeySelective(MbMdDefine record);

	int updateByPrimaryKey(MbMdDefine record);

	List<MbMdDefine> selectAll();

	List<MbMdDefine> selectByFunCode(@Param("deviceId") String deviceId, @Param("mbGateNo") Integer mbGateNo,
			@Param("mbFunCode") Integer mbFunCode);

	List<MbMdDefine> selectByDeviceId(@Param("deviceId") String deviceId);

}