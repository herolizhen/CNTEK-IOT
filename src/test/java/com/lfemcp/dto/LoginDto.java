
/**   
* @Title: LoginDto.java 
* @Package com.lfemcp.dto 
* @Description: TODO(用一句话描述该文件做什么) 
* @author herolizhen
* @date 2019年1月3日 上午11:34:44 
* @version V1.0   
*/

package com.lfemcp.dto;

public class LoginDto {
	boolean result;
	String sessionId;

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
}
