package com.wipro.crossword.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wipro.crossword.service.AdminService;

public class DeleteCrosswordServlet extends HttpServlet {

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String content = request.getParameter("fileName");
		String[] arr = content.split(",");
		String fileName = arr[0];
		String pwd = arr[1];
		AdminService service = new AdminService();
		String status = service.fileDelete(fileName, pwd);
		/* String status = "Success"; */
		if (status.equals("Success")) {
			status = "Crossword deleted successfully";
		} else {
			status = "Password not correct";
		}
		response.setContentType("text/plain");
		response.getWriter().write(status);
	}

}
