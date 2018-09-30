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
import com.cntek.iot.modbus.dao.MbMdDefineMapper;
import com.cntek.iot.modbus.dto.MbComm;
import com.cntek.iot.modbus.entity.DevRealTime;
import com.cntek.iot.modbus.entity.MbMdDefine;
import com.cntek.iot.modbus.service.IMbMdDefineService;

@Service("mbMdDefineService")
public class MbMdDefineServiceImpl implements IMbMdDefineService {

	private static Log log = LogFactory.getLog(MbMdDefineServiceImpl.class);
	@Resource
	MbMdDefineMapper mbMdDefineDao;

	@Resource
	DevRealTimeMapper devRealTimeDao;

	@Override
	public int push(MbComm data) {
		String deviceId = data.getDeviceId();
		int reg_begin = data.getMbBeginAddress();
		int data_len = data.getMbDataLength();
		byte[] hexString = hexStringToBytes(data.getData());

		List<MbMdDefine> list = mbMdDefineDao.selectByFunCode(deviceId, data.getMbGateNo(), data.getMbFunCode());

		if (list.size() == 0) {
			return -1;
		}

		String tableName = "T_RT_" + deviceId.replaceAll("\\-", "");
		int has_table = this.devRealTimeDao.existTable(tableName);
		if (has_table == 0) {
			createNewTable(deviceId);
		}

		for (int i = 0; i < list.size(); i++) {
			MbMdDefine mbDefine = list.get(i);
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
			sb.append("device_id varchar(50) NOT NULL,");
			sb.append("mb_gate_no int NOT NULL,");
			sb.append("mb_fun_code int NOT NULL,");
			sb.append("mb_register_address int NOT NULL,");
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
	public int insertData(MbMdDefine define, Object data) {
		StringBuffer insertBuffer = new StringBuffer();
		try {
			insertBuffer.append("(mb_gate_no,mb_fun_code,mb_register_address,d_dec,d_char,device_id)");
			insertBuffer.append(" values(");
			insertBuffer.append(define.getMbGateNo() + ",");
			insertBuffer.append(define.getMbFunCode() + ",");
			insertBuffer.append(define.getMbRegisterAddress() + ",");

			if (data instanceof String) {
				insertBuffer.append(0 + ",");
				insertBuffer.append("'" + (String) data + "',");
			} else {
				insertBuffer.append(data + ",");
				insertBuffer.append("'',");
			}

			insertBuffer.append("'" + define.getDeviceId() + "')");
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

	public static Object dealMbData(byte[] data, int reg_begin, int data_len, MbMdDefine define) {
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

		if (define.getDataFun() != null && define.getDataFun().length() > 0) {
			String fun = define.getDataFun().replace("X", String.valueOf(o_data));
			try {
				o_data = jse.eval(fun);
				System.err.println(o_data);
			} catch (ScriptException e) {
				e.printStackTrace();
			}
		}

		if (define.getDataEnum() != null && define.getDataEnum().length() > 0) {
			String s_d = String.valueOf(o_data);
			String str_enum = define.getDataEnum();
			o_data = str_enum.substring(str_enum.indexOf(s_d) + s_d.length() + 1,
					str_enum.indexOf(",", str_enum.indexOf(s_d)));
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

}
