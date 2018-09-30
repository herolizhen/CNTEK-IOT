package com.cntek.iot.modbus.entity;

import java.math.BigDecimal;

public class MbMetadataDefine {
 
    private String deviceId;
    private Integer mbGateNo;
    private Integer mbFunCode;
    private Integer mbRegisterAddress;
    private String deviceType;
    private String dataName;
    private Integer dataType;
    private Integer dataDecodeOrder;
    private String dataUnit;
    private Integer dataDecimal;
    private BigDecimal dataRatio;
    private Integer dataBitPos;
    private String data0Display;
    private String data1Display;
    private String dataFun;
    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
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

    public Integer getMbRegisterAddress() {
        return mbRegisterAddress;
    }

    public void setMbRegisterAddress(Integer mbRegisterAddress) {
        this.mbRegisterAddress = mbRegisterAddress;
    }
    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType == null ? null : deviceType.trim();
    }

    public String getDataName() {
        return dataName;
    }

    public void setDataName(String dataName) {
        this.dataName = dataName == null ? null : dataName.trim();
    }

    public Integer getDataType() {
        return dataType;
    }

    public void setDataType(Integer dataType) {
        this.dataType = dataType;
    }

    public Integer getDataDecodeOrder() {
        return dataDecodeOrder;
    }

    public void setDataDecodeOrder(Integer dataDecodeOrder) {
        this.dataDecodeOrder = dataDecodeOrder;
    }

    public String getDataUnit() {
        return dataUnit;
    }

    public void setDataUnit(String dataUnit) {
        this.dataUnit = dataUnit == null ? null : dataUnit.trim();
    }

    public Integer getDataDecimal() {
        return dataDecimal;
    }

    public void setDataDecimal(Integer dataDecimal) {
        this.dataDecimal = dataDecimal;
    }

    public BigDecimal getDataRatio() {
        return dataRatio;
    }

    public void setDataRatio(BigDecimal dataRatio) {
        this.dataRatio = dataRatio;
    }

    public Integer getDataBitPos() {
        return dataBitPos;
    }

    public void setDataBitPos(Integer dataBitPos) {
        this.dataBitPos = dataBitPos;
    }

    public String getData0Display() {
        return data0Display;
    }

    public void setData0Display(String data0Display) {
        this.data0Display = data0Display == null ? null : data0Display.trim();
    }

    public String getData1Display() {
        return data1Display;
    }

    public void setData1Display(String data1Display) {
        this.data1Display = data1Display == null ? null : data1Display.trim();
    }

    public String getDataFun() {
        return dataFun;
    }

    public void setDataFun(String dataFun) {
        this.dataFun = dataFun == null ? null : dataFun.trim();
    }
}