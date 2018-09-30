package com.cntek.iot.example.servcie.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cntek.iot.example.dao.UserDao;
import com.cntek.iot.example.dto.User;
import com.cntek.iot.example.servcie.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource
	private UserDao userDao;

	public User getUserById(int userId) {
		// TODO Auto-generated method stub
		return this.userDao.findById(userId);
	}

}
