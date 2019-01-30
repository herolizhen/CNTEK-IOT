package com.cntek.iot.dtu.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cntek.iot.dtu.entity.MbDtuConfig;

public interface MbDtuConfigMapper {
	int deleteByPrimaryKey(String id);

	int insert(MbDtuConfig record);

	int insertSelective(MbDtuConfig record);

	MbDtuConfig selectByPrimaryKey(String id);

	int updateByPrimaryKeySelective(MbDtuConfig record);

	int updateByPrimaryKey(MbDtuConfig record);

	List<MbDtuConfig> selectByUserId(String userId);

	List<MbDtuConfig> selectByOrgId(String orgId);

	int deleteByPKs(String[] ids);
	
	int isDtuUsed(@Param("dtuSn") String dtuSn, @Param("id") String id);
	
	List<MbDtuConfig> selPowUserDtuConfig(String userId);
	
}