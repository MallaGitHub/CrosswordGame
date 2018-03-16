package com.wipro.crossword.bean;

import java.util.Date;

public class CrosswordBean {
	private String puzzleID;
	private String userID;
	private String userName;
	private String fileName;
	private String stream;
	private String path;
	private Date createdOn;

	public String getPuzzleID() {
		return puzzleID;
	}

	public void setPuzzleID(String puzzleID) {
		this.puzzleID = puzzleID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getStream() {
		return stream;
	}

	public void setStream(String stream) {
		this.stream = stream;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

}
