package com.cntek.iot.modbus.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.cntek.iot.modbus.dao.DevRealTimeMapper;
import com.cntek.iot.modbus.dao.MbMetadataDefineMapper;
import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.entity.DevRealTime;
import com.cntek.iot.modbus.entity.MbMetadataDefine;
import com.cntek.iot.modbus.service.IMbMetadataDefineService;

@Service("mbMetadataDefineService")
public class MbMetadataDefineServiceImpl implements IMbMetadataDefineService {

	private static Log log = LogFactory.getLog(MbMetadataDefineServiceImpl.class);
	@Resource
	MbMetadataDefineMapper mbMetadataDefineDao;

	@Resource
	DevRealTimeMapper devRealTimeDao;

	@Override
	public List<MbMetadataDefine> selMbMetadataDefineByDeviceId(String deviceId) {
		return mbMetadataDefineDao.selectByDeviceId(deviceId);
	}

	@Override
	public int push(String data) {
		String deviceId = "001";
		int reg_begin = 1;
		int data_len = 8;
		byte[] hexString = hexStringToBytes(data);
		List<MbMetadataDefine> list = this.selMbMetadataDefineByDeviceId(deviceId);
		String tableName = "T_RT_" + deviceId.replaceAll("\\-", "");
		int has_table = this.devRealTimeDao.existTable(tableName);
		if (has_table == 0) {
			createNewTable(deviceId);
		}

		for (int i = 0; i < list.size(); i++) {
			MbMetadataDefine mbDefine = list.get(i);
			if (mbDefine.getMbRegisterAddress() >= reg_begin
					&& mbDefine.getMbRegisterAddress() <= (reg_begin + data_len)) {
				Object d = dealMbData(hexString, reg_begin, data_len, mbDefine);
				insertData(mbDefine, d);
			}
		}
		return 0;
	}

	public int push(MbComm data) {
		String deviceId = data.getDeviceId();
		int reg_begin = data.getMbBeginAddress();
		int data_len = data.getMbDataLength();
		byte[] hexString = hexStringToBytes(data.getData());

		List<MbMetadataDefine> list = this.selMbMetadataDefineByDeviceId(deviceId);

		String tableName = "T_RT_" + deviceId.replaceAll("\\-", "");
		int has_table = this.devRealTimeDao.existTable(tableName);
		if (has_table == 0) {
			createNewTable(deviceId);
		}

		for (int i = 0; i < list.size(); i++) {
			MbMetadataDefine mbDefine = list.get(i);
			if (mbDefine.getMbRegisterAddress() >= reg_begin
					&& mbDefine.getMbRegisterAddress() <= (reg_begin + data_len)) {
				Object d = dealMbData(hexString, reg_begin, data_len, mbDefine);
				insertData(mbDefine, d);
			}
		}
		return 0;
	}

	@Override
	public int createNewTable(String tableName) {
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("device_id int(11) NOT NULL,");
			sb.append("mb_gate_no varchar(45) NOT NULL,");
			sb.append("mb_fun_code varchar(45) NOT NULL,");
			sb.append("mb_register_address varchar(45) NOT NULL,");
			sb.append("d_time timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),");
			sb.append("d_dec decimal(12,4) DEFAULT NULL,");
			sb.append("d_char varchar(45) DEFAULT NULL,");
			sb.append("PRIMARY KEY (device_id,mb_gate_no,mb_fun_code,mb_register_address,d_time)");
			DevRealTime drt = new DevRealTime();
			drt.setColDefString(sb.toString());
			tableName = "T_RT_" + tableName.replaceAll("\\-", "");
			drt.setTableName(tableName);
			this.devRealTimeDao.createTable(drt);
		} catch (Exception e) {
			System.out.println("Syntax Error:" + tableName);
			System.out.println("insertData  Fail :" + e.getMessage());
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public int insertData(MbMetadataDefine define, Object data) {
		StringBuffer insertBuffer = new StringBuffer();
		try {
			insertBuffer.append("(mb_gate_no,mb_fun_code,mb_register_address,d_dec,d_char,device_id)");
			insertBuffer.append(" values(");
			insertBuffer.append(define.getMbGateNo() + ",");
			insertBuffer.append(define.getMbFunCode() + ",");
			insertBuffer.append(define.getMbRegisterAddress() + ",");
			// 枚举处理
			if (define.getDataType() == 6) {
				insertBuffer.append(0 + ",");
				insertBuffer.append("'" + (String) data + "',");
			} else {
				insertBuffer.append(data + ",");
				insertBuffer.append("'',");
			}
			insertBuffer.append(define.getDeviceId() + ")");
			DevRealTime drt = new DevRealTime();
			drt.setInsertString(insertBuffer.toString());
			String tableName = "T_RT_" + define.getDeviceId().replaceAll("\\-", "");
			drt.setTableName(tableName);
			this.devRealTimeDao.insertData(drt);
		} catch (Exception e) {
			System.out.println("Syntax Error:" + insertBuffer.toString());
			System.out.println("insertData  Fail :" + e.getMessage());
			log.error(e);
			return 0;
		}
		return 1;
	}

	static ScriptEngine jse = new ScriptEngineManager().getEngineByName("JavaScript");

	public static Object dealMbData(byte[] data, int reg_begin, int data_len, MbMetadataDefine define) {
		int reg_to_read = define.getMbRegisterAddress();
		int mb_data_pre = 3;
		int mb_read_pos = (reg_to_read - reg_begin) * 2;

		Object o_data = 0;
		// 16 有符号
		if (define.getDataType() == 1) {
			// 16位有符号
			if (define.getDataDecodeOrder() == 1) {
				int d_1 = 0xff & data[mb_data_pre + mb_read_pos];
				int d_2 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				o_data = (short) (d_1 << 8 | d_2);
			} else if (define.getDataDecodeOrder() == 2) {
				int d_2 = 0xff & data[mb_data_pre + mb_read_pos];
				int d_1 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				o_data = (short) (d_1 << 8 | d_2);
			}
		} else if (define.getDataType() == 2) {
			// 16位无符号
			if (define.getDataDecodeOrder() == 1) {
				int d_1 = 0xff & data[mb_data_pre + mb_read_pos];
				int d_2 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				o_data = (int) (d_1 << 8 | d_2);
			} else if (define.getDataDecodeOrder() == 2) {
				int d_2 = 0xff & data[mb_data_pre + mb_read_pos];
				int d_1 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				o_data = (int) (d_1 << 8 | d_2);
			}
		} else if (define.getDataType() == 3) {
			// 32位有符號
			if (define.getDataDecodeOrder() == 1) {
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (int) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			} else if (define.getDataDecodeOrder() == 2) {
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (int) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			} else if (define.getDataDecodeOrder() == 3) {
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (int) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			} else if (define.getDataDecodeOrder() == 4) {
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (int) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			}
		} else if (define.getDataType() == 4) {// 32位无符號
			if (define.getDataDecodeOrder() == 1) {
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (long) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			} else if (define.getDataDecodeOrder() == 2) {
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (long) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			} else if (define.getDataDecodeOrder() == 3) {
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (long) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			} else if (define.getDataDecodeOrder() == 4) {
				long dd_4 = 0xff & data[mb_data_pre + mb_read_pos];
				long dd_3 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				long dd_2 = 0xff & data[mb_data_pre + mb_read_pos + 2];
				long dd_1 = 0xff & data[mb_data_pre + mb_read_pos + 3];
				o_data = (long) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
			}
		} else if (define.getDataType() == 6) {// 开关型
			int temp = 0;
			if (define.getDataDecodeOrder() == 1) {
				int d_1 = 0xff & data[mb_data_pre + mb_read_pos];
				int d_2 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				temp = (int) (d_1 << 8 | d_2);
			} else if (define.getDataDecodeOrder() == 2) {
				int d_2 = 0xff & data[mb_data_pre + mb_read_pos];
				int d_1 = 0xff & data[mb_data_pre + mb_read_pos + 1];
				temp = (int) (d_1 << 8 | d_2);
			}

			int mov_p = define.getDataBitPos() - 1;
			int d_bit = (temp & (1 << (mov_p))) >> mov_p;
			if (d_bit == 0) {
				o_data = define.getData0Display();
			} else if (d_bit == 1) {
				o_data = define.getData1Display();
			}
			System.err.println(o_data);
		}

		if (define.getDataFun() != null) {
			String fun = define.getDataFun().replace("X", String.valueOf(o_data));
			try {
				o_data = jse.eval(fun);
				System.err.println(o_data);
			} catch (ScriptException e) {
				e.printStackTrace();
			}
		}
		return o_data;

	}

	private static byte[] hexStringToBytes(String hexString) {
		if (hexString == null || hexString.equals("")) {
			return null;
		}
		hexString = hexString.toUpperCase();
		int length = hexString.length() / 2;
		char[] hexChars = hexString.toCharArray();
		byte[] d = new byte[length];
		for (int i = 0; i < length; i++) {
			int pos = i * 2;
			d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
		}
		return d;
	}

	private static byte charToByte(char c) {
		return (byte) "0123456789ABCDEF".indexOf(c);
	}

	public static void main(String[] args) {
		int d_hi = 0xff;
		int d_low = 0xdd;
		// 16位有符號
		short d = (short) (d_hi << 8 | d_low);
		System.err.println(d);
		// 16位無符號
		int ud = (int) (d_hi << 8 | d_low);
		System.err.println(ud);
		long dd_1 = 0xff;
		long dd_2 = 0x01;
		long dd_3 = 0xdd;
		long dd_4 = 0xdd;
		// 32位有符號
		long dd = (int) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
		System.err.println(dd);
		// 32位無符號
		long udd = (long) (dd_1 << 24 | dd_2 << 16 | dd_3 << 8 | dd_4);
		System.err.println(udd);
		// BYTE 處理
		int a = 191;
		int b = 6;
		System.err.println((a & (1 << b)) >> b);
		System.err.println(1 & 0);
	}
}
