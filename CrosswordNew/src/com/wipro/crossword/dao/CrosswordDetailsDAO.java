package com.wipro.crossword.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import src.com.wipro.crossword.util.DBUtil;

import com.wipro.crossword.bean.CrosswordBean;

public class CrosswordDetailsDAO {

	public CrosswordBean fetchCrosswordDetailsByFileName(String file) {
		CrosswordBean crosswordBean = new CrosswordBean();

		if (file != null && file.length() > 0) {
			Connection connection = DBUtil.connectDB();
			String query = "select * from crossword_details_tbl where filename='"
					+ file + "'";
			Statement stmt;
			try {
				stmt = connection.createStatement();
				ResultSet rs = stmt.executeQuery(query);
				if (rs.next()) {
					crosswordBean.setPuzzleID(rs.getString(1));
					crosswordBean.setUserID(rs.getString(2));
					crosswordBean.setUserName(rs.getString(3));
					crosswordBean.setFileName(rs.getString(4));
					crosswordBean.setStream(rs.getString(5));
					crosswordBean.setPath(rs.getString(6));
					Date createdOn = rs.getDate(7);
					crosswordBean.setCreatedOn(createdOn);
				} else {
					crosswordBean = null;
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			crosswordBean = null;
		}
		return crosswordBean;
	}
}
