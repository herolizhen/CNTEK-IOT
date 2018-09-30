package com.cntek.iot.example.dto;

public class User {

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	private long id;
	private String userName;
	private int age;

	public User(long id, String name, int age) {
		super();
		this.id = id;
		this.userName = name;
		this.age = age;

	}

}
