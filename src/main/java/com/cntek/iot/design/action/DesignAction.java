package com.cntek.iot.design.action;

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
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cntek.iot.comm.dto.CommPara;
import com.cntek.iot.comm.dto.RetInfoDto;
import com.cntek.iot.design.entity.MbMaster;
import com.cntek.iot.design.entity.MbMetadataDefine;
import com.cntek.iot.design.entity.MbTopoDesign;
import com.cntek.iot.design.service.IDesignService;
import com.cntek.iot.dtu.dto.Random;
import com.cntek.iot.pow.entity.PowUser;
import com.mysql.cj.util.StringUtils;

@Controller
@RequestMapping("/design")
public class DesignAction {
	@Value("${cfg.sys.userfile.filePath}")
	private String USERFILEPATH;
	@Value("${cfg.sys.userfile.urlPath}")
	private String USERURLPATH;

	
	@Autowired
	private IDesignService designService;

	@RequestMapping("/master")
	public String masterList(Model model,HttpSession session) {
		PowUser user = (PowUser)session.getAttribute("usersession");
		model.addAttribute("orgId", user.getOrgId());
		model.addAttribute("userId", user.getUsername());
		return "design/modbus_master";
	}

	@RequestMapping("/getMasterPage")
	public @ResponseBody Map<String, Object> getMasterPage(@RequestParam String userId,
			@RequestParam(defaultValue = "0", required = false) int limit,
			@RequestParam(defaultValue = "0", required = false) int offset) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", designService.selectMbMasterByUserId(userId));
		return map;
	}

	@RequestMapping("/delMaster")
	public @ResponseBody RetInfoDto delMaster(CommPara dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			int ret = this.designService.deleteMbMasterByPks(dto.getIds().split(","));
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

	@RequestMapping("/savMaster")
	public @ResponseBody RetInfoDto savMaster(MbMaster dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbMaster data = this.designService.insertOrUpdateMaster(dto);
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

	@RequestMapping("/getMetadataDefinePage")
	public @ResponseBody Map<String, Object> getMetadataDefinePage(@RequestParam String masterId,
			@RequestParam(defaultValue = "0", required = false) int limit,
			@RequestParam(defaultValue = "0", required = false) int offset) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", designService.selectMbMetadataDefineByMasterId(masterId));
		return map;
	}

	@RequestMapping("/savMetadataDefine")
	public @ResponseBody RetInfoDto savMetadataDefine(MbMetadataDefine dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbMetadataDefine data = this.designService.insertOrUpdateMetadataDefine(dto);
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

	@RequestMapping("/delMetadataDefine")
	public @ResponseBody RetInfoDto delMetadataDefine(CommPara dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			int ret = this.designService.deleteMbMetadataDefineByPks(dto.getIds().split(","));
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

	@RequestMapping("/getTopoDesignPage")
	public @ResponseBody Map<String, Object> getTopoDesignPage(@RequestParam String masterId,
			@RequestParam(defaultValue = "0", required = false) int limit,
			@RequestParam(defaultValue = "0", required = false) int offset) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", designService.selectMbTopoDesignByMasterId(masterId));
		return map;
	}

	@RequestMapping("/savTopoDesign")
	public @ResponseBody RetInfoDto savTopoDesign(MbTopoDesign dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbTopoDesign data = this.designService.insertOrUpdateTopoDesign(dto);
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

	@RequestMapping("/delTopoDesign")
	public @ResponseBody RetInfoDto delTopoDesign(CommPara dto) {
		RetInfoDto info = new RetInfoDto();
		try {
			int ret = this.designService.deleteMbTopoDesignByPks(dto.getIds().split(","));
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

	@RequestMapping("/topoDesign")
	public String topoDesign(@RequestParam String id, Model model) {
		MbTopoDesign topo = this.designService.selectMbTopoDesignByPk(id);
		model.addAttribute("topo", topo.getContent());
		model.addAttribute("topoId", topo.getId());
		model.addAttribute("masterId", topo.getMasterId());
		return "design/topo_design";
	}

	@RequestMapping(value = "/topoSave")
	public @ResponseBody RetInfoDto topoSave(@RequestBody String design, @RequestParam String topoId) {
		RetInfoDto info = new RetInfoDto();
		try {
			MbTopoDesign topo = this.designService.selectMbTopoDesignByPk(topoId);
			topo.setContent(design);
			topo = this.designService.insertOrUpdateTopoDesign(topo);
			if (topo != null) {
				info.setCode(0);
				info.setData(topo);
			} else {
				info.setCode(1);
			}
		} catch (Exception e) {
			info.setMessage(e.getMessage());
			info.setCode(-1);
		}
		return info;
	}

	/**
	 * @mothed:getMetadataDefine
	 * @author:HeroLizhen
	 * @create date:2019年1月7日
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getMetadataDefine")
	public @ResponseBody Object getMetadataDefine(@RequestParam String masterId, HttpServletRequest request) {
		String dataName = request.getParameter("dataName");
		if (StringUtils.isNullOrEmpty(dataName)) {
			return this.designService.selectMbMetadataDefineByMasterId(masterId);
		} else {
			return this.designService.selectMbMetadataDefineByMasterIdAndDataName(masterId, dataName);
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
	
	
	
	
	@RequestMapping(value = "subFile", method = RequestMethod.POST, produces = "text/html;charset=utf-8")
	public void subFile(HttpServletResponse response, HttpServletRequest request,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

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
		response.getWriter().write( fileName);
		response.setHeader("Access-Control-Allow-Origin", "*");
	}

}
