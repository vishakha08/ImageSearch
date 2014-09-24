package controllers;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import play.libs.Json;
import play.mvc.Result;
import util.DatabaseConnect;
import cn.bran.play.JapidController;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Images extends JapidController {

	private static Connection connection = null;

	private static ArrayNode searchImage(String searchText) {
		connection = DatabaseConnect.connectToDB();
		ArrayNode responseAsJson = new ArrayNode(JsonNodeFactory.instance);
		ResultSet rs = null;
		String query = "select * from Photos where photo_title='" + searchText + "'";
		if (connection != null) {
			try {
				Statement statement = connection.createStatement();
				rs = statement.executeQuery(query);

				while (rs.next()) {
					ObjectNode photo = Json.newObject();
					photo.put("photoId", rs.getString("photo_pid"));
					photo.put("photoSrc", rs.getString("photo_src"));
					photo.put("photoTitle", rs.getString("photo_title"));
					responseAsJson.add(photo);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DatabaseConnect.CloseDB();
			}
		}
		return responseAsJson;
	}

	public static Result search(final String q) {
		ArrayNode resNode = searchImage(q);
		return ok(resNode);
	}

	
}
