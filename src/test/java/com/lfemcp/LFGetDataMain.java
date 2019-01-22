package com.lfemcp;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import com.alibaba.fastjson.JSON;
import com.lfemcp.dao.DbOperate;
import com.lfemcp.dto.HisdataDto;
import com.lfemcp.dto.LoginDto;

public class LFGetDataMain {

	public static void main(String[] args) {

		String from = "2019-01-21 00:00";
		String end =  "2019-01-22 00:00";

		String czSn = "A0I9F328";
		String wxSn = "A0I7R290";
		String rule = "4542";
		String cztable = "t_zlf_czwf";
		String wxtable = "t_zlf_wxly";

		String outputString = interfaceUtil("http://www.lfemcp.com/APIAction!login.action",
				"loginname=bfzn&password=12345678", "");
		HisdataDto hisdata;
		if (outputString != null) {
			LoginDto login = new LoginDto();
			login = (LoginDto) JSON.parseObject(outputString, LoginDto.class);

//			outputString = interfaceUtil("http://www.lfemcp.com/APIAction!queryAllEquip.action", "",
//					login.getSessionId());
//			System.out.println(outputString);

			// 常州伍丰

			DbOperate.delete(cztable, from);
			System.out.println("删除数据表：" + cztable);

			outputString = interfaceUtil("http://www.lfemcp.com/DataAction!queryHistory.action",
					"pagenum=1&ruleId=" + rule + "&dtuSn=" + czSn + "&from=" + from + "&end=" + end,
					login.getSessionId());

			hisdata = (HisdataDto) JSON.parseObject(outputString, HisdataDto.class);
			DbOperate.insertBatch(cztable, hisdata.getList());
			for (int i = 2; i < hisdata.getTotalPage(); i++) {
				outputString = interfaceUtil("http://www.lfemcp.com/DataAction!queryHistory.action",
						"pagenum=" + i + "&ruleId=" + rule + "&dtuSn=" + czSn + "&from=" + from + "&end=" + end,
						login.getSessionId());
				hisdata = (HisdataDto) JSON.parseObject(outputString, HisdataDto.class);
				DbOperate.insertBatch(cztable, hisdata.getList());
				System.out.println("常州伍丰:" + i + "---" + hisdata.getTotalPage());
			}

			// 无锡龙源

			DbOperate.delete(wxtable, from);
			System.out.println("删除数据表：" + wxtable);

			outputString = interfaceUtil("http://www.lfemcp.com/DataAction!queryHistory.action",
					"pagenum=1&ruleId=" + rule + "&dtuSn=" + wxSn + "&from=" + from + "&end=" + end,
					login.getSessionId());

			hisdata = (HisdataDto) JSON.parseObject(outputString, HisdataDto.class);
			DbOperate.insertBatch(wxtable, hisdata.getList());
			for (int i = 2; i < hisdata.getTotalPage(); i++) {
				outputString = interfaceUtil("http://www.lfemcp.com/DataAction!queryHistory.action",
						"pagenum=" + i + "&ruleId=" + rule + "&dtuSn=" + wxSn + "&from=" + from + "&end=" + end,
						login.getSessionId());
				hisdata = (HisdataDto) JSON.parseObject(outputString, HisdataDto.class);
				DbOperate.insertBatch(wxtable, hisdata.getList());
				System.out.println("无锡龙源:" + i + "---" + hisdata.getTotalPage());
			}

		}
	}

	public static String interfaceUtil(String path, String data, String jsessionid) {
		try {
			URL url = new URL(path);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			PrintWriter out = null;
			// 请求方式
//          conn.setRequestMethod("POST");
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
			// 设置sessionID
			conn.setRequestProperty("Cookie", "JSESSIONID=" + jsessionid);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			out = new PrintWriter(conn.getOutputStream());
			out.print(data);
			// 缓冲数据
			out.flush();
			// 获取URLConnection对象对应的输入流
			InputStream is = conn.getInputStream();
			// 构造一个字符流缓存
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			String outputString = "";
			String str = "";
			while ((str = br.readLine()) != null) {
				outputString += str;
			}
			// 关闭流
			is.close();
			conn.disconnect();
			return outputString;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
