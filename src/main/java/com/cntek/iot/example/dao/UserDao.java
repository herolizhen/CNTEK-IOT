package com.cntek.iot.example.dao;

import java.util.List;

import com.cntek.iot.example.dto.User;

public interface UserDao {
	void save(User user);

	boolean update(User user);

	boolean delete(int id);

	User findById(int id);

	List<User> findAll();
}
