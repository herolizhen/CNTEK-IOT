package com.cntek.iot.design.entity;

import java.math.BigDecimal;

public class MbMetadataDefine {
    private String id;

    private Integer gateNo;

    private Integer disOrder;

    private Integer funCode;

    private Integer regAddress;

    private String dataName;

    private Integer dataType;

    private Integer dataDecode;

    private String dataUnit;

    private Integer dataDecimal;

    private BigDecimal dataRatio;

    private Integer dataBitPos;

    private String data0Dis;

    private String data1Dis;

    private String dataFun;

    private String userId;

    private String orgId;

    private String masterId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public Integer getGateNo() {
        return gateNo;
    }

    public void setGateNo(Integer gateNo) {
        this.gateNo = gateNo;
    }

    public Integer getDisOrder() {
        return disOrder;
    }

    public void setDisOrder(Integer disOrder) {
        this.disOrder = disOrder;
    }

    public Integer getFunCode() {
        return funCode;
    }

    public void setFunCode(Integer funCode) {
        this.funCode = funCode;
    }

    public Integer getRegAddress() {
        return regAddress;
    }

    public void setRegAddress(Integer regAddress) {
        this.regAddress = regAddress;
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

    public Integer getDataDecode() {
        return dataDecode;
    }

    public void setDataDecode(Integer dataDecode) {
        this.dataDecode = dataDecode;
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

    public String getData0Dis() {
        return data0Dis;
    }

    public void setData0Dis(String data0Dis) {
        this.data0Dis = data0Dis == null ? null : data0Dis.trim();
    }

    public String getData1Dis() {
        return data1Dis;
    }

    public void setData1Dis(String data1Dis) {
        this.data1Dis = data1Dis == null ? null : data1Dis.trim();
    }

    public String getDataFun() {
        return dataFun;
    }

    public void setDataFun(String dataFun) {
        this.dataFun = dataFun == null ? null : dataFun.trim();
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

    public String getMasterId() {
        return masterId;
    }

    public void setMasterId(String masterId) {
        this.masterId = masterId == null ? null : masterId.trim();
    }
}