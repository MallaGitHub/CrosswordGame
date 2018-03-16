package src.com.wipro.crossword.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {

	static Connection connection = null;

	public static Connection connectDB() {
		try {
			if (connection == null) {
				System.out.println("before");
				Class.forName("oracle.jdbc.driver.OracleDriver");
				connection = DriverManager.getConnection(
						"jdbc:oracle:thin:@localhost:1521:orcl1", "scott",
						"tiger");
				System.out.println("after");
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return connection;
	}
}