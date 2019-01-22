package com.cntek.iot.design.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cntek.iot.design.entity.MbTopoDesign;

public interface MbTopoDesignMapper {
	int deleteByPrimaryKey(String id);

	int insert(MbTopoDesign record);

	int insertSelective(MbTopoDesign record);

	MbTopoDesign selectByPrimaryKey(String id);
	
	MbTopoDesign selectMainByMasterId(String id);

	int updateByPrimaryKeySelective(MbTopoDesign record);

	int updateByPrimaryKeyWithBLOBs(MbTopoDesign record);

	int updateByPrimaryKey(MbTopoDesign record);

	List<MbTopoDesign> selectByUserId(String userId);

	List<MbTopoDesign> selectByOrgId(String orgId);

	List<MbTopoDesign> selectByMasterId(String masterId);

	int deleteByPKs(String[] ids);
	
	int selectCountByMasterId(@Param("masterId") String masterId);
}