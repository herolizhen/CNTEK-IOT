package com.cntek.iot.modbus.dto;

import java.util.List;

import com.cntek.iot.modbus.entity.MbMdDefine;

public class MbComm {

	private String deviceId;
	private Integer mbGateNo;
	private Integer mbFunCode;
	private Integer mbBeginAddress;
	private Integer mbDataLength;
	private String data;
	private List<MbMdDefine> mbMdDefines;
	private String ids;

	public List<MbMdDefine> getMbMdDefines() {
		return mbMdDefines;
	}

	public void setMbMdDefines(List<MbMdDefine> mbMdDefines) {
		this.mbMdDefines = mbMdDefines;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public Integer getMbGateNo() {
		return mbGateNo;
	}

	public void setMbGateNo(Integer mbGateNo) {
		this.mbGateNo = mbGateNo;
	}

	public Integer getMbFunCode() {
		return mbFunCode;
	}

	public void setMbFunCode(Integer mbFunCode) {
		this.mbFunCode = mbFunCode;
	}

	public Integer getMbBeginAddress() {
		return mbBeginAddress;
	}

	public void setMbBeginAddress(Integer mbBeginAddress) {
		this.mbBeginAddress = mbBeginAddress;
	}

	public Integer getMbDataLength() {
		return mbDataLength;
	}

	public void setMbDataLength(Integer mbDataLength) {
		this.mbDataLength = mbDataLength;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

}
