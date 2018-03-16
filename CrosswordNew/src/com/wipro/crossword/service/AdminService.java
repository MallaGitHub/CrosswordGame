package com.wipro.crossword.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import com.wipro.crossword.bean.CrosswordBean;
import com.wipro.crossword.dao.CrosswordDetailsDAO;

public class AdminService {

	public boolean isExists(String fileName) {
		// System.out.println("isExists");
		boolean status = false;
		/*
		 * String strPath = "E:\\java\\" + fileName + ".dat"; File strFile = new
		 * File(strPath);
		 */

		File file = new File("E:/crossword/java/");
		File[] files = file.listFiles();
		for (File f : files) {
			if (f.getName().equals(fileName + ".dat")) {
				status = true;
				break;
			}
		}
		System.out.println("Is file present:" + status);
		return status;
	}

	public String saveCrossword(String content) {
		String status = "Fail";
		String a[] = content.split("\\*");
		System.out.println("filename:" + a[0]);
		// File creation
		String strPath = "E:/crossword/java/" + a[0] + ".dat";
		File strFile = new File(strPath);
		try {
			boolean fileCreated = strFile.createNewFile();
			Writer objWriter = new BufferedWriter(new FileWriter(strFile));
			objWriter.write(a[1] + "*" + a[2] + "*" + a[3] + "*" + a[4]);
			objWriter.flush();
			objWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		status = "Success";
		return status;
	}

	public String updateCrossword(String content) {
		String status = "";
		String a[] = content.split("\\*");
		System.out.println("filename:" + a[0]);
		// File creation
		String strPath = "E:/crossword/java/" + a[0] + ".dat";
		File strFile = new File(strPath);
		try {
			boolean fileCreated = strFile.createNewFile();
			Writer objWriter = new BufferedWriter(new FileWriter(strFile));
			objWriter.write(a[1] + "*" + a[2] + "*" + a[3] + "*" + a[4]);
			objWriter.flush();
			objWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		status = "Success";
		return status;
	}

	public List<String> fetchCrosswordFileNamesByStream(String stream) {
		List<String> crosswordList = new ArrayList<String>();
		String path = "";
		final String JAVA = "java";
		final String GIS = "gis";
		final String DOT_NET = "dotNet";
		final String TESTING = "testing";
		final String CPP = "cpp";
		if (JAVA.equalsIgnoreCase(stream)) {
			path = "E:/crossword/java/";
		} else if (GIS.equalsIgnoreCase(stream)) {
			path = "E:/crossword/gis/";
		} else if (DOT_NET.equalsIgnoreCase(stream)) {
			path = "E:/crossword/dotNet/";
		} else if (TESTING.equalsIgnoreCase(stream)) {
			path = "E:/crossword/testing/";
		} else if (CPP.equalsIgnoreCase(stream)) {
			path = "E:/crossword/cpp/";
		}
		File file = new File(path);
		File[] files = file.listFiles();
		String[] fileName = new String[2];
		for (File f : files) {
			fileName = f.getName().split("\\.");
			crosswordList.add(fileName[0]);
		}
		for (Iterator iterator = crosswordList.iterator(); iterator.hasNext();) {
			String string = (String) iterator.next();
		}
		return crosswordList;
	}

	public CrosswordBean fetchCrosswordCreationDetails(String file) {
		CrosswordBean crosswordBean = new CrosswordBean();
		CrosswordDetailsDAO crossword = new CrosswordDetailsDAO();
		crosswordBean = crossword.fetchCrosswordDetailsByFileName(file);
		return crosswordBean;
	}

	public String fetchCrosswordDataByFileName(String fileName) {
		/*
		 * column 1: Grid size, column 2: Answers, column 3: Hint numbers,
		 * column 4: Across Questions, column 5: Down Questions
		 */
		/*
		 * final int COLUMNS = 5; String[] output = new String[COLUMNS];String
		 * hints = ""; String answers = ""; String acrossQuestions = ""; String
		 * downQuestions = ""; int gridSize = 0;
		 */

		String data = "";
		String FILENAME = "E:/crossword/java/" + fileName + ".dat";

		BufferedReader br = null;
		FileReader fr = null;
		try {
			fr = new FileReader(FILENAME);
			br = new BufferedReader(fr);
			String sCurrentLine = "";
			while ((sCurrentLine = br.readLine()) != null) {
				data = data + sCurrentLine;
			}
			/*
			 * String dataSplitted[] = data.split("\\*"); String temp[] =
			 * dataSplitted[0].split("_"); gridSize = Integer.parseInt(temp[0]);
			 * answers = temp[1]; hints = dataSplitted[1]; acrossQuestions =
			 * dataSplitted[2]; downQuestions = dataSplitted[3]; output[0] = new
			 * Integer(gridSize).toString(); output[1] = answers; output[2] =
			 * hints; output[3] = acrossQuestions; output[4] = downQuestions;
			 */
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null) {
					br.close();
				}
				if (fr != null) {
					fr.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return data;
	}

	public boolean passwordForDeletion(String pwd) {
		boolean status = false;
		Date d = new Date();
		int month = d.getMonth();
		month++;
		String actualPwd = d.getHours() + "" + d.getDate() + d.getMinutes()
				+ month;
		System.out.println("act:" + actualPwd);
		System.out.println("pwd:" + pwd);
		if (actualPwd.equals(pwd)) {
			System.out.println("pwd is correct");
			status = true;
		} else {
			System.out.println("pwd is not correct");
		}
		return status;
	}

	public String fileDelete(String fileName, String pwd) {
		String status = "Fail";
		String path = "E:/crossword/java/" + fileName + ".dat";
		if (passwordForDeletion(pwd)) {
			File file = new File(path);
			file.delete();
			status = "Success";
		}
		return status;
	}

	public static void main(String[] args) {
		String stat = new AdminService().fileDelete("aabbcc", "1227132");
		System.out.println(stat);
	}
}