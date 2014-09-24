package util;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import play.db.DB;

public class DatabaseConnect {

	public static DataSource dataSource = null;
	public static Connection connection = null;

	public static Connection connectToDB() {
		dataSource = DB.getDataSource();
		connection = DB.getConnection();
		return connection;
	}

	public static void CloseDB() {
		if (connection != null) {
			try {
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
