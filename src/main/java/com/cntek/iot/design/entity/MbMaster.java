package com.cntek.iot.design.entity;

public class MbMaster {
    private String id;

    private String name;

    private String description;

    private String displayType;

    private String powWrite;

    private String userId;

    private String orgId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getDisplayType() {
        return displayType;
    }

    public void setDisplayType(String displayType) {
        this.displayType = displayType == null ? null : displayType.trim();
    }

    public String getPowWrite() {
        return powWrite;
    }

    public void setPowWrite(String powWrite) {
        this.powWrite = powWrite == null ? null : powWrite.trim();
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