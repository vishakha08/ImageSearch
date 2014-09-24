package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import util.DatabaseConnect;


import org.apache.commons.io.FilenameUtils;

import play.libs.Json;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import cn.bran.play.JapidController;

import com.fasterxml.jackson.databind.node.ObjectNode;

public class UploadToServer extends JapidController {

	private static Connection connection = null;
	private static File imageFile = null;
	private static String imgDescription = null;
	private final static String uploadDirectory = "/home/vishakha/eWorkspace/appify/playground/workspace/Image-Upload-Search/public/uploads";

	public static final Result upload(final String title) {
		final MultipartFormData body = request().body().asMultipartFormData();
		final FilePart picture = body.getFile("uploadImage");

		//final Map<String, String[]> formData = body.asFormUrlEncoded();

		final ObjectNode resultStatus = Json.newObject();
		File uploadImageFile = null;
		String uploadmageFilePath = null;
		String uploadImageFileName = null;

		if (picture != null) {
			uploadImageFile = picture.getFile();
			uploadImageFileName = picture.getFilename();
			if (isImageFile(uploadImageFileName) == true) {
				uploadmageFilePath = uploadDirectory + "/" + uploadImageFileName;

				imageFile = createFile(uploadImageFile, uploadImageFileName);
				imgDescription = title;//formData.get("title")[0];//picture.getFilename().toString(); 

				resultStatus.put("status", "Upload Successful");
				resultStatus.put("message", uploadImageFileName);
				if (imageFile != null) {
					connection = DatabaseConnect.connectToDB();
					insertImageToDB(uploadImageFileName, imgDescription);
				}
			} else {
				resultStatus.put("status", "Upload Unsuccessful");
				resultStatus.put("message", "Wrong File Format");
			}
			return ok(resultStatus);
		} else {
			resultStatus.put("status", "Upload Unsuccessful");
			resultStatus.put("message", "No File Found");
			return badRequest(resultStatus);
		}
	}

	private static boolean isImageFile(String file) {
		String fileExtension = FilenameUtils.getExtension(file);
		if ("jpeg".equalsIgnoreCase(fileExtension) || "jpg".equalsIgnoreCase(fileExtension) || "gif".equalsIgnoreCase(fileExtension)
				|| "png".equalsIgnoreCase(fileExtension) || "bmp".equalsIgnoreCase(fileExtension) || "tif".equalsIgnoreCase(fileExtension)) {
			return true;
		} else {
			return false;
		}

	}

	private static File createFile(final File inputFile, final String fileName) {
		File imageFile = new File(uploadDirectory, fileName);

		try {
			Files.copy(new FileInputStream(inputFile), imageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return imageFile;
	}

	

	private static void insertImageToDB(final String responseFilePath, final String responseImageTitle) {

		final String path = responseFilePath;
		final String title = responseImageTitle;
		String query = "insert into Photos(photo_src,photo_title) values('" + path + "','" + title + "')";

		try {
			Statement statement = connection.createStatement();
			statement.executeUpdate(query);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseConnect.CloseDB();
		}
	}
}
