package com.cntek.iot.design.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cntek.iot.design.entity.MbMetadataDefine;

public interface MbMetadataDefineMapper {
	int deleteByPrimaryKey(String id);

	int insert(MbMetadataDefine record);

	int insertSelective(MbMetadataDefine record);

	MbMetadataDefine selectByPrimaryKey(String id);

	int updateByPrimaryKeySelective(MbMetadataDefine record);

	int updateByPrimaryKey(MbMetadataDefine record);

	List<MbMetadataDefine> selectByUserId(String userId);

	List<MbMetadataDefine> selectByOrgId(String orgId);

	List<MbMetadataDefine> selectByMasterId(String masterId);

	int deleteByPKs(String[] ids);

	int selectCountByMasterId(@Param("masterId") String masterId);

	List<MbMetadataDefine> selectByMasterIdAndDataName(@Param("masterId") String masterId,
			@Param("dataName") String dataName);
}