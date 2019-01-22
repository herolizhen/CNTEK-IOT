package com.cntek.iot.design.service.impl;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cntek.iot.design.dao.MbMasterMapper;
import com.cntek.iot.design.dao.MbMetadataDefineMapper;
import com.cntek.iot.design.dao.MbTopoDesignMapper;
import com.cntek.iot.design.entity.MbMaster;
import com.cntek.iot.design.entity.MbMetadataDefine;
import com.cntek.iot.design.entity.MbTopoDesign;
import com.cntek.iot.design.service.IModbusService;
import com.mysql.cj.util.StringUtils;

@Service("modbusService")
public class ModbusServiceImpl implements IModbusService {

//	private static Log log = LogFactory.getLog(ModbusServiceImpl.class);
	@Resource
	MbMasterMapper masterDao;
	@Resource
	MbMetadataDefineMapper metadaDefineDao;
	@Resource
	MbTopoDesignMapper topoDesignDao;

	@Override
	public int deleteMbMasterByPk(String id) {
		return this.masterDao.deleteByPrimaryKey(id);
	}

	@Override
	public MbMaster insertMbMaster(MbMaster record) {
		int ret = 0;
		record.setId(UUID.randomUUID().toString());
		ret = this.masterDao.insertSelective(record);
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public MbMaster selectMbMasterByPk(String id) {
		return this.masterDao.selectByPrimaryKey(id);
	}

	@Override
	public int updateMbMasterByPk(MbMaster record) {
		return this.masterDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<MbMaster> selectMbMasterByOrgId(String orgId) {
		return this.masterDao.selectByOrgId(orgId);
	}

	@Override
	public List<MbMaster> selectMbMasterByUserId(String userId) {
		return this.masterDao.selectByUserId(userId);
	}

	/**
	 * 分页处理有bug如果只有一条数据，limit 增加where是不会显示出来的
	 */
	@Override
	public List<MbMaster> selectMbMasterByOrgIdPageInfo(String orgId, int offset, int limit) {
		return this.masterDao.selectByOrgIdPageInfo(orgId, offset, limit);
	}

	@Override
	public int selectMbMasterCountByOrgId(String orgId) {
		return this.masterDao.selectCountByOrgId(orgId);
	}

	@Override
	public int deleteMbMetadataDefineByPk(String id) {
		return this.metadaDefineDao.deleteByPrimaryKey(id);
	}

	@Override
	public MbMetadataDefine insertMbMetadataDefine(MbMetadataDefine record) {
		int ret = 0;
		record.setId(UUID.randomUUID().toString());
		ret = this.metadaDefineDao.insertSelective(record);
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public MbMetadataDefine selectMbMetadataDefineByPk(String id) {
		return this.metadaDefineDao.selectByPrimaryKey(id);
	}

	@Override
	public int updateMbMetadataDefineByPk(MbMetadataDefine record) {
		return this.metadaDefineDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<MbMetadataDefine> selectMbMetadataDefineByOrgId(String orgId) {
		return this.metadaDefineDao.selectByOrgId(orgId);
	}

	@Override
	public List<MbMetadataDefine> selectMbMetadataDefineByUserId(String userId) {
		return this.metadaDefineDao.selectByUserId(userId);
	}

	@Override
	public List<MbMetadataDefine> selectMbMetadataDefineByMasterId(String masterId) {
		return this.metadaDefineDao.selectByMasterId(masterId);
	}
	
	public List<MbMetadataDefine>  selectMbMetadataDefineByMasterIdAndDataName(String masterId,String dataName){
		return this.metadaDefineDao.selectByMasterIdAndDataName(masterId, dataName);
	}

	@Override
	public int deleteMbTopoDesignByPk(String id) {
		return this.topoDesignDao.deleteByPrimaryKey(id);
	}

	@Override
	public MbTopoDesign insertMbTopoDesign(MbTopoDesign record) {
		int ret = 0;
		record.setId(UUID.randomUUID().toString());
		ret = this.topoDesignDao.insertSelective(record);
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public MbTopoDesign selectMbTopoDesignByPk(String id) {
		return this.topoDesignDao.selectByPrimaryKey(id);
	}

	@Override
	public int updateMbTopoDesignByPk(MbTopoDesign record) {
		return this.topoDesignDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateMbTopoDesignByPkWithBLOBs(MbTopoDesign record) {
		return this.topoDesignDao.updateByPrimaryKeyWithBLOBs(record);
	}

	@Override
	public List<MbTopoDesign> selectMbTopoDesignByOrgId(String orgId) {
		return this.topoDesignDao.selectByOrgId(orgId);
	}

	@Override
	public List<MbTopoDesign> selectMbTopoDesignByUserId(String userId) {
		return this.topoDesignDao.selectByUserId(userId);
	}

	@Override
	public List<MbTopoDesign> selectMbTopoDesignByMasterId(String masterId) {
		return this.topoDesignDao.selectByMasterId(masterId);
	}

	@Override
	public int deleteMbMasterByPks(String[] ids) {
		return this.masterDao.deleteByPKs(ids);
	}

	@Override
	public MbMaster insertOrUpdateMaster(MbMaster record) {
		int ret = 0;
		if (StringUtils.isNullOrEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			ret = this.masterDao.insertSelective(record);
		} else {
			ret = this.masterDao.updateByPrimaryKeySelective(record);
		}
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public MbMetadataDefine insertOrUpdateMetadataDefine(MbMetadataDefine record) {
		int ret = 0;
		int order = this.metadaDefineDao.selectCountByMasterId(record.getMasterId());
		order++;
		record.setDisOrder(order);
		if (StringUtils.isNullOrEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			ret = this.metadaDefineDao.insertSelective(record);
		} else {
			ret = this.metadaDefineDao.updateByPrimaryKeySelective(record);
		}
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public MbTopoDesign insertOrUpdateTopoDesign(MbTopoDesign record) {
		int count = this.topoDesignDao.selectCountByMasterId(record.getMasterId());
		if (count <= 1) {
			record.setIsMain(true);
		} else {
			record.setIsMain(false);
		}
		count++;
		record.setDisOrder(count);
		int ret = 0;
		if (StringUtils.isNullOrEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			ret = this.topoDesignDao.insertSelective(record);
		} else {
			ret = this.topoDesignDao.updateByPrimaryKeySelective(record);
		}
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public int deleteMbMetadataDefineByPks(String[] ids) {
		return this.metadaDefineDao.deleteByPKs(ids);
	}

	@Override
	public int deleteMbTopoDesignByPks(String[] ids) {
		return this.topoDesignDao.deleteByPKs(ids);
	}

	@Override
	public MbTopoDesign selectMainTopoByPK(String id) {
		return this.topoDesignDao.selectMainByMasterId(id);
	}

}
