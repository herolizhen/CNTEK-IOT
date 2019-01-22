package com.cntek.iot.dtu.action;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cntek.iot.comm.dto.RetInfoDto;
import com.cntek.iot.design.entity.MbTopoDesign;
import com.cntek.iot.design.service.IModbusService;
import com.cntek.iot.dtu.dto.Random;
import com.cntek.iot.dtu.entity.MbDtuConfig;
import com.cntek.iot.dtu.entity.MbDtuInfo;
import com.cntek.iot.dtu.service.IMbDtuService;
import com.cntek.iot.modbus.dto.MbComm;

/**
 * @ClassName: DtuAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author HeroLizhen
 * @date 2018年12月24日 下午1:56:23
 *
 */
@Controller
@RequestMapping("/dtu")
public class DtuAction {

	public static final String USERFILEPATH = "C:\\tools\\apache\\apache-tomcat-9.0.1\\webapps\\CNTEK-IOT\\userdata\\image\\";
	public static final String USERURLPATH = "http://localhost:8080/CNTEK-IOT/userdata/image/";
	@Autowired
	private IMbDtuService mbDtuService;
	@Autowired
	private IModbusService modbusService;

	/**
	 * 
	 * @mothed:config
	 * @author:HeroLizhen
	 * @create date:2018年12月24日
	 * @param model
	 * @return
	 */
	@RequestMapping("/config")
	public String config(Model model) {
		model.addAttribute("orgId", "111");
		model.addAttribute("userId", "111");
		return "dtu/config";
	}

	@RequestMapping("/getConfigPage")
	public @ResponseBody Map<String, Object> getConfigPage(@RequestParam String userId,
			@RequestParam(defaultValue = "0", required = false) int limit,
			@RequestParam(defaultValue = "0", required = false) int offset) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", this.mbDtuService.selectConfigByUserId(userId));
		return map;
	}

	@RequestMapping("/savConfig")
	public @ResponseBody RetInfoDto savConfig(MbDtuConfig dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbDtuConfig data = this.mbDtuService.insertOrUpdateConfig(dto);
			if (data != null) {
				info.setCode(0);
				info.setData(data);
			} else {
				info.setCode(1);
			}
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping("/delConfig")
	public @ResponseBody RetInfoDto delConfig(MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			int ret = this.mbDtuService.deleteConfigByPks(dto.getIds().split(","));
			if (ret > 0) {
				info.setCode(0);
			} else {
				info.setCode(1);
			}
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping("info")
	public String info(Model model) {
		return "dtu/info";
	}

	@RequestMapping("/getInfoPage")
	public @ResponseBody Map<String, Object> getInfoPage(@RequestParam(defaultValue = "0", required = false) int limit,
			@RequestParam(defaultValue = "0", required = false) int offset) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", this.mbDtuService.selectInfoAll());
		return map;
	}

	@RequestMapping("/savInfo")
	public @ResponseBody RetInfoDto savInfo(MbDtuInfo dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbDtuInfo data = this.mbDtuService.insertOrUpdateInfo(dto);
			if (data != null) {
				info.setCode(0);
				info.setData(data);
			} else {
				info.setCode(1);
			}
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping("/delInfo")
	public @ResponseBody RetInfoDto delInfo(MbComm dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			int ret = this.mbDtuService.deleteInfoByPks(dto.getIds().split(","));
			if (ret > 0) {
				info.setCode(0);
			} else {
				info.setCode(1);
			}
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	@RequestMapping(value = "uploadFile", method = RequestMethod.POST, produces = "text/html;charset=utf-8")
	public void uploadFile(HttpServletResponse response, HttpServletRequest request,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		System.out.println(file.getOriginalFilename());

		String fileName = file.getOriginalFilename();
		String filePath = USERFILEPATH;
		File fileNew = new File(filePath);
		if (!fileNew.exists()) {
			fileNew.mkdirs();
		}
		fileNew = new File(filePath + fileName);
		if (fileNew.exists()) {
			fileNew.delete();
		}
		BufferedOutputStream buff = new BufferedOutputStream(new FileOutputStream(fileNew));
		buff.write(file.getBytes());
		buff.close();

		response.getWriter().write(USERURLPATH + fileName);
		response.setHeader("Access-Control-Allow-Origin", "*");
	}

	@RequestMapping("/validPw")
	public @ResponseBody boolean validPw(@RequestParam(required = true) String dtuSn,
			@RequestParam(required = true) String password) {
		try {
			return this.mbDtuService.validDtuPw(dtuSn, password);
		} catch (Exception e) {
			return false;
		}
	}

	@RequestMapping("/validSn")
	public @ResponseBody boolean validSn(@RequestParam(required = true) String configId,
			@RequestParam(required = true) String dtuSn) {
		try {
			return this.mbDtuService.validDtuSn(configId, dtuSn);

		} catch (Exception e) {
			return false;
		}
	}

	@RequestMapping("/userDtuList")
	public String userDtuList(Model model) {
		model.addAttribute("orgId", "111");
		model.addAttribute("userId", "111");
		return "dtu/user_dtu";
	}

	@RequestMapping("/topoShow")
	public String topoShow(@RequestParam String dtuId, Model model) {
		MbDtuConfig config = this.mbDtuService.selectConfigByPk(dtuId);
		MbTopoDesign topo = this.modbusService.selectMainTopoByPK(config.getRuleId());
		if (topo != null) {
			model.addAttribute("topo", topo.getContent());
			model.addAttribute("dtuId", dtuId);
			return "design/topo_show";
		} else {
			return "design/topo_none";
		}
	}

	@RequestMapping(value = "/randomData")
	public @ResponseBody Object randomData(@RequestBody Random random) {
		System.out.println("total:" + random.total);
		List<HashMap<String, Object>> out = new ArrayList<HashMap<String, Object>>();
		for (int i = 0; i < random.total.size(); i++) {
			HashMap<String, Object> map = random.total.get(i);
			map.put("nowValue", Math.round(Math.random() * 100));
			out.add(map);
		}
		System.out.println(out);
		return out;
	}
}
