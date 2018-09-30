package com.cntek.iot.comm.dto;

public class PageQuery {
	int currIndex;

	public int getCurrIndex() {
		return currIndex;
	}

	public void setCurrIndex(int currIndex) {
		this.currIndex = currIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	int pageSize;
}
