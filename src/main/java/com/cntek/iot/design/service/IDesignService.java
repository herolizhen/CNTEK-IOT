package com.cntek.iot.design.service;

import java.util.List;

import com.cntek.iot.design.entity.MbMaster;
import com.cntek.iot.design.entity.MbMetadataDefine;
import com.cntek.iot.design.entity.MbTopoDesign;

public interface IDesignService {

	MbMaster insertMbMaster(MbMaster record);

	int updateMbMasterByPk(MbMaster record);

	MbMaster insertOrUpdateMaster(MbMaster record);

	int deleteMbMasterByPk(String id);

	int deleteMbMasterByPks(String[] ids);

	MbMaster selectMbMasterByPk(String id);

	List<MbMaster> selectMbMasterByOrgId(String orgId);

	List<MbMaster> selectMbMasterByUserId(String userId);

	List<MbMaster> selectMbMasterByOrgIdPageInfo(String orgId, int offset, int limit);

	int selectMbMasterCountByOrgId(String orgId);

	MbMetadataDefine insertMbMetadataDefine(MbMetadataDefine record);

	int deleteMbMetadataDefineByPk(String id);

	int deleteMbMetadataDefineByPks(String[] ids);

	int updateMbMetadataDefineByPk(MbMetadataDefine record);

	MbMetadataDefine insertOrUpdateMetadataDefine(MbMetadataDefine record);

	MbMetadataDefine selectMbMetadataDefineByPk(String id);

	List<MbMetadataDefine> selectMbMetadataDefineByOrgId(String orgId);

	List<MbMetadataDefine> selectMbMetadataDefineByUserId(String userId);

	List<MbMetadataDefine> selectMbMetadataDefineByMasterId(String masterId);

	public List<MbMetadataDefine> selectMbMetadataDefineByMasterIdAndDataName(String masterId, String dataName);

	MbTopoDesign insertMbTopoDesign(MbTopoDesign record);

	int deleteMbTopoDesignByPk(String id);

	int deleteMbTopoDesignByPks(String[] ids);

	int updateMbTopoDesignByPk(MbTopoDesign record);

	int updateMbTopoDesignByPkWithBLOBs(MbTopoDesign record);

	MbTopoDesign insertOrUpdateTopoDesign(MbTopoDesign record);

	MbTopoDesign selectMainTopoByPK(String id);

	MbTopoDesign selectMbTopoDesignByPk(String id);

	List<MbTopoDesign> selectMbTopoDesignByOrgId(String orgId);

	List<MbTopoDesign> selectMbTopoDesignByUserId(String userId);

	List<MbTopoDesign> selectMbTopoDesignByMasterId(String masterId);

}
