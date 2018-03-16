package com.wipro.crossword.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.wipro.crossword.bean.CrosswordBean;
import com.wipro.crossword.service.AdminService;

public class DisplayAllServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("displaying....");
		List<String> crosswordFileNameLists = new ArrayList<String>();
		AdminService admin = new AdminService();
		String stream = "java";
		crosswordFileNameLists = admin.fetchCrosswordFileNamesByStream(stream);
		CrosswordBean crosswordBean = admin
				.fetchCrosswordCreationDetails("CW_TM_1");

		HttpSession session = request.getSession();
		session.setAttribute("crossList", crosswordFileNameLists);
		session.setAttribute("details", crosswordBean);

		RequestDispatcher rd = request
				.getRequestDispatcher("/ViewCrossword.jsp");
		rd.forward(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

}
