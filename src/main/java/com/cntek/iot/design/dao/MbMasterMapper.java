package com.cntek.iot.design.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cntek.iot.design.entity.MbMaster;

public interface MbMasterMapper {
	int deleteByPrimaryKey(String id);
	
	int deleteByPKs(String[] ids);

	int insert(MbMaster record);

	int insertSelective(MbMaster record);

	MbMaster selectByPrimaryKey(String id);

	int updateByPrimaryKeySelective(MbMaster record);

	int updateByPrimaryKey(MbMaster record);

	List<MbMaster> selectByUserId(String userId);

	List<MbMaster> selectByOrgId(String orgId);

	List<MbMaster> selectByOrgIdPageInfo(@Param("orgId") String orgId, @Param("offset") int offset,
			@Param("limit") int limit);

	int selectCountByOrgId(@Param("orgId") String orgId);

}