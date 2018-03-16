package com.wipro.crossword.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wipro.crossword.service.AdminService;

public class CheckFileServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Checking Filename");
		String fileName = request.getParameter("fileName");
		System.out.println("Name is ::" + fileName);
		String status = "";
		// String a[] = fileName.split("\\*");
		AdminService service = new AdminService();
		boolean fileExists = service.isExists(fileName);
		// boolean fileExists = false;
		if (fileExists) {
			status = "Invalid";
		} else {
			status = "Valid";
		}

		response.setContentType("text/plain");
		response.getWriter().write(status);
	}
}