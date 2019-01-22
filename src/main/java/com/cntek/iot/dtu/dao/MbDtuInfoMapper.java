package com.cntek.iot.dtu.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cntek.iot.dtu.entity.MbDtuInfo;

public interface MbDtuInfoMapper {
	int deleteByPrimaryKey(String id);

	int insert(MbDtuInfo record);

	int insertSelective(MbDtuInfo record);

	MbDtuInfo selectByPrimaryKey(String id);

	int updateByPrimaryKeySelective(MbDtuInfo record);

	int updateByPrimaryKey(MbDtuInfo record);

	int deleteByPKs(String[] ids);

	List<MbDtuInfo> selectAll();
	
	int validDtuSnPw(@Param("dtuSn") String dtuSn, @Param("dtuPw") String dtuPw);
}