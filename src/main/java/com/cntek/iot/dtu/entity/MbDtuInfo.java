package com.cntek.iot.dtu.entity;

import java.util.Date;

public class MbDtuInfo {
	private String id;

	private String dtuName;

	private String dtuSn;

	private String dtuPw;

	private String mac;

	private String moduleName;

	private String moduleType;

	private String firmware;

	private String firmwareType;

	private Boolean isActivate;

	private Boolean isRecovery;

	private String iotVersion;

	private Date activateTime;

	private String regIp;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getDtuName() {
		return dtuName;
	}

	public void setDtuName(String dtuName) {
		this.dtuName = dtuName == null ? null : dtuName.trim();
	}

	public String getDtuSn() {
		return dtuSn;
	}

	public void setDtuSn(String dtuSn) {
		this.dtuSn = dtuSn == null ? null : dtuSn.trim();
	}

	public String getDtuPw() {
		return dtuPw;
	}

	public void setDtuPw(String dtuPw) {
		this.dtuPw = dtuPw == null ? null : dtuPw.trim();
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac == null ? null : mac.trim();
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName == null ? null : moduleName.trim();
	}

	public String getModuleType() {
		return moduleType;
	}

	public void setModuleType(String moduleType) {
		this.moduleType = moduleType == null ? null : moduleType.trim();
	}

	public String getFirmware() {
		return firmware;
	}

	public void setFirmware(String firmware) {
		this.firmware = firmware == null ? null : firmware.trim();
	}

	public String getFirmwareType() {
		return firmwareType;
	}

	public void setFirmwareType(String firmwareType) {
		this.firmwareType = firmwareType == null ? null : firmwareType.trim();
	}

	public Boolean getIsActivate() {
		return isActivate;
	}

	public void setIsActivate(Boolean isActivate) {
		this.isActivate = isActivate;
	}

	public Boolean getIsRecovery() {
		return isRecovery;
	}

	public void setIsRecovery(Boolean isRecovery) {
		this.isRecovery = isRecovery;
	}

	public String getIotVersion() {
		return iotVersion;
	}

	public void setIotVersion(String iotVersion) {
		this.iotVersion = iotVersion == null ? null : iotVersion.trim();
	}

	public Date getActivateTime() {
		return activateTime;
	}

	public void setActivateTime(Date activateTime) {
		this.activateTime = activateTime;
	}

	public String getRegIp() {
		return regIp;
	}

	public void setRegIp(String regIp) {
		this.regIp = regIp == null ? null : regIp.trim();
	}
}