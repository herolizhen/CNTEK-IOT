package com.cntek.iot.dtu.service.impl;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cntek.iot.dtu.dao.MbDtuConfigMapper;
import com.cntek.iot.dtu.dao.MbDtuInfoMapper;
import com.cntek.iot.dtu.entity.MbDtuConfig;
import com.cntek.iot.dtu.entity.MbDtuInfo;
import com.cntek.iot.dtu.service.IMbDtuService;
import com.mysql.cj.util.StringUtils;

@Service("mbDtuService")
public class MbDtuServiceImpl implements IMbDtuService {
	@Resource
	MbDtuConfigMapper configDao;
	@Resource
	MbDtuInfoMapper infoDao;

	@Override
	public MbDtuConfig selectConfigByPk(String id) {
		return this.configDao.selectByPrimaryKey(id);
	}

	@Override
	public List<MbDtuConfig> selectConfigByUserId(String userId) {
		List<MbDtuConfig>  ownerList =  this.configDao.selectByUserId(userId);
		List<MbDtuConfig>  list = this.configDao.selPowUserDtuConfig(userId);
		
		for(int i = 0;i<list.size();i++) {
			boolean isHave = false;
			MbDtuConfig config = (MbDtuConfig)list.get(i);
			for( int j=0;j<ownerList.size();j++) {
				MbDtuConfig ownerConfig = (MbDtuConfig)ownerList.get(j);
				if(ownerConfig.getId().equalsIgnoreCase(config.getId())) {
					isHave = true;
				}
			}
			if(!isHave) {
				ownerList.add(config);
			}
		}
		return ownerList;
	}

	@Override
	public MbDtuConfig insertOrUpdateConfig(MbDtuConfig record) {
		int ret = 0;
		if (StringUtils.isNullOrEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			ret = this.configDao.insertSelective(record);
		} else {
			ret = this.configDao.updateByPrimaryKeySelective(record);
		}
		if (ret == 1) {
			return record;
		} else {
			return null;
		}

	}

	@Override
	public int deleteConfigByPks(String[] ids) {
		return this.configDao.deleteByPKs(ids);
	}

	@Override
	public List<MbDtuInfo> selectInfoAll() {
		return this.infoDao.selectAll();
	}

	@Override
	public MbDtuInfo selectInfoByPk(String id) {
		return this.infoDao.selectByPrimaryKey(id);
	}

	@Override
	public MbDtuInfo insertOrUpdateInfo(MbDtuInfo record) {
		int ret = 0;
		if (StringUtils.isNullOrEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			ret = this.infoDao.insertSelective(record);
		} else {
			ret = this.infoDao.updateByPrimaryKeySelective(record);
		}
		if (ret == 1) {
			return record;
		} else {
			return null;
		}
	}

	@Override
	public int deleteInfoByPks(String[] ids) {
		return this.infoDao.deleteByPKs(ids);
	}

	@Override
	public boolean validDtuPw(String dtuSn, String password) {
		int count = this.infoDao.validDtuSnPw(dtuSn, password);
		if (count == 1) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean validDtuSn(String configId, String dtuSn) {
		int count = this.configDao.isDtuUsed(configId, dtuSn);
		if (count <= 1) {
			return true;
		} else {
			return false;
		}
	}
}
