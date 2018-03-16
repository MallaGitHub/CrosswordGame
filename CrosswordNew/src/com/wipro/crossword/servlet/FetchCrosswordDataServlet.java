package com.wipro.crossword.servlet;

/*
 * Author : MallaReddy
 * Date of creation: 21-Feb-2018
 */

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.wipro.crossword.service.AdminService;

public class FetchCrosswordDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String fileName = request.getParameter("fileName");
		/*
		 * String[] output = new AdminService()
		 * .fetchCrosswordDataByFileName(fileName);
		 */
		String output = new AdminService()
				.fetchCrosswordDataByFileName(fileName);
		response.setContentType("text/plain");
		response.getWriter().write(output);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

}
