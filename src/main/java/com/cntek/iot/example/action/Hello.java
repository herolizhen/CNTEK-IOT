package com.cntek.iot.example.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cntek.iot.example.dto.User;
import com.cntek.iot.example.servcie.IUserService;

@Controller
@RequestMapping("/fuck")
public class Hello {

	@Autowired
	private IUserService userService;

	@RequestMapping("/zyl")
	public String hello(Model model) {
		User user = userService.getUserById(1);
		model.addAttribute("greeting", user.getUserName() + "Fuck Spring ZYL");
		return "fuck";
	}

	@RequestMapping("/wl")
	public String xx(Model model) {
		model.addAttribute("greeting", "Fuck xx Spring MVC");
		return "xx";
	}

}