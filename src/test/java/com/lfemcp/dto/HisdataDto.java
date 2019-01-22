package com.lfemcp.dto;

import java.util.List;
import java.util.Map;

public class HisdataDto {
	boolean result;
	List<String[]> list;
	List<Map<String, Object>> head;
	int totalPage;
	int totalCount;

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public List<String[]> getList() {
		return list;
	}

	public void setList(List<String[]> list) {
		this.list = list;
	}

	public List<Map<String, Object>> getHead() {
		return head;
	}

	public void setHead(List<Map<String, Object>> head) {
		this.head = head;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
}
