package com.cntek.iot.dtu.dto;

public class MonitorData {
	private int deviceid;
	private int orgid;
	private String orgname;
	private String devname;
	private int address;
	private int indexOfType;
	private String description;
	private int curValue;
	private String recvTime;

	public int getDeviceid() {
		return deviceid;
	}

	public void setDeviceid(int deviceid) {
		this.deviceid = deviceid;
	}

	public int getOrgid() {
		return orgid;
	}

	public void setOrgid(int orgid) {
		this.orgid = orgid;
	}

	public String getOrgname() {
		return orgname;
	}

	public void setOrgname(String orgname) {
		this.orgname = orgname;
	}

	public String getDevname() {
		return devname;
	}

	public void setDevname(String devname) {
		this.devname = devname;
	}

	public int getAddress() {
		return address;
	}

	public void setAddress(int address) {
		this.address = address;
	}

	public int getIndexOfType() {
		return indexOfType;
	}

	public void setIndexOfType(int indexOfType) {
		this.indexOfType = indexOfType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCurValue() {
		return curValue;
	}

	public void setCurValue(int curValue) {
		this.curValue = curValue;
	}

	public String getRecvTime() {
		return recvTime;
	}

	public void setRecvTime(String recvTime) {
		this.recvTime = recvTime;
	}

}
