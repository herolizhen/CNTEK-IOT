package com.cntek.iot.dtu.entity;

import java.math.BigDecimal;

public class MbDtuConfig {
	private String id;

	private String imgUrl;

	private String name;

	private String memo;

	private String dtuSn;

	private String ruleName;

	private String ruleId;

	private Boolean isOpen;

	private Boolean isOnline;

	private Integer dataCount;

	private Integer saveCycle;

	private String location;

	private BigDecimal longitude;

	private BigDecimal latitude;

	private String userId;

	private String orgId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl == null ? null : imgUrl.trim();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo == null ? null : memo.trim();
	}

	public String getDtuSn() {
		return dtuSn;
	}

	public void setDtuSn(String dtuSn) {
		this.dtuSn = dtuSn == null ? null : dtuSn.trim();
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName == null ? null : ruleName.trim();
	}

	public String getRuleId() {
		return ruleId;
	}

	public void setRuleId(String ruleId) {
		this.ruleId = ruleId == null ? null : ruleId.trim();
	}

	public Boolean getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}

	public Boolean getIsOnline() {
		return isOnline;
	}

	public void setIsOnline(Boolean isOnline) {
		this.isOnline = isOnline;
	}

	public Integer getDataCount() {
		return dataCount;
	}

	public void setDataCount(Integer dataCount) {
		this.dataCount = dataCount;
	}

	public Integer getSaveCycle() {
		return saveCycle;
	}

	public void setSaveCycle(Integer saveCycle) {
		this.saveCycle = saveCycle;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location == null ? null : location.trim();
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude ;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId == null ? null : userId.trim();
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId == null ? null : orgId.trim();
	}
}