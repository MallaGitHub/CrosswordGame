package com.wipro.crossword.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wipro.crossword.service.AdminService;

public class UpdateQuestionsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String content = request.getParameter("fileName");
		AdminService service = new AdminService();
		String status = service.saveCrossword(content);
	}
}
