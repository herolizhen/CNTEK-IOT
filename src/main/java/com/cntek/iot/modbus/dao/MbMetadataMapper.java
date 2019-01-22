package com.cntek.iot.modbus.dao;

import com.cntek.iot.modbus.entity.MbMetadataDefine;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface MbMetadataMapper {
    int deleteByPrimaryKey(@Param("deviceId") String deviceId, @Param("mbGateNo") Integer mbGateNo, @Param("mbFunCode") Integer mbFunCode, @Param("mbRegisterAddress") Integer mbRegisterAddress);
    int insert(MbMetadataDefine record);
    MbMetadataDefine selectByPrimaryKey(@Param("deviceId") String deviceId, @Param("mbGateNo") Integer mbGateNo, @Param("mbFunCode") Integer mbFunCode, @Param("mbRegisterAddress") Integer mbRegisterAddress);
    List<MbMetadataDefine> selectAll();
    int updateByPrimaryKey(MbMetadataDefine record);
	List<MbMetadataDefine> selectByDeviceId(String deviceId);
}