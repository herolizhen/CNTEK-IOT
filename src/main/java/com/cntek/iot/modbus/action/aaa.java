package com.cntek.iot.modbus.action;

public class aaa {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		String a  = "12:正常,14:异常,15:告警";
		
		String str_enum = "12";
		
		String cc = a.substring(a.indexOf(str_enum)+str_enum.length()+1, a.indexOf(",", a.indexOf(str_enum)));
		
		System.out.println(cc);
				

	}

}
