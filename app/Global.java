import java.lang.reflect.Method;
import java.util.Map;
import java.util.Map.Entry;

import play.Application;
import play.Logger;
import play.Play;
import play.libs.F;
import play.libs.F.Promise;
import play.mvc.Action;
import play.mvc.Http.Request;
import play.mvc.Http.RequestHeader;
import play.mvc.Results;
import play.mvc.SimpleResult;
import cn.bran.play.GlobalSettingsWithJapid;
import cn.bran.play.JapidController;

public class Global extends GlobalSettingsWithJapid {

	@Override
	public void onStartJapid() {
		addImport("japidviews._layouts.*");
		addImport("japidviews._tags.*");
		setKeepJavaFiles(false);
	}

	@Override
	public Action<?> onRequest(Request request, Method actionMethod) {
		Logger.info("NEW REQUEST : " + logRequest(request));
		return super.onRequest(request, actionMethod);
	}

	private String logRequest(RequestHeader request) {
		final StringBuilder sb = new StringBuilder();
		sb.append("==================").append("\n");
		sb.append("host : ").append(request.host()).append("\n");
		sb.append("method : ").append(request.method()).append("\n");
		sb.append("path : ").append(request.path()).append("\n");
		sb.append("remoteAddress : ").append(request.remoteAddress()).append("\n");
		sb.append("uri : ").append(request.uri()).append("\n");
		sb.append("\nheaders : ").append("\n");
		for (final Entry<String, String[]> header : request.headers().entrySet()) {
			sb.append(header.getKey()).append(" : ").append("\t");
			for (final String headerValue : header.getValue()) {
				sb.append(headerValue).append("\n");
			}
		}

		sb.append("\nquery parameters : ").append("\n");
		for (final Entry<String, String[]> queryString : request.queryString().entrySet()) {
			sb.append(queryString.getKey()).append(" : ").append("\t");
			for (final String queryParameterValue : queryString.getValue()) {
				sb.append(queryParameterValue).append("\n");
			}
		}

		if (request instanceof Request) {
			Request r = (Request) request;
			if (r.body() != null) {
				final Map<String, String[]> parameters = r.body().asFormUrlEncoded();
				if (parameters != null) {
					for (Map.Entry<String, String[]> entry : parameters.entrySet()) {
						sb.append(entry.getKey()).append(" : ").append("\t");
						for (final String queryParameterValue : entry.getValue()) {
							sb.append(queryParameterValue).append("\n");
						}
					}
				}
			}
		}

		sb.append("==================");
		return sb.toString();
	}

	@Override
	public void onStart(Application app) {
		Logger.info("Application Startup");
		super.onStart(app);
	}

	@Override
	public void onStop(Application app) {
		Logger.info("Application Shutdown");
		super.onStop(app);
	}

	@Override
	public Promise<SimpleResult> onError(RequestHeader req, Throwable t) {
		Logger.error("APPLICATION ERROR : " + logRequest(req), t);
		if (Play.application().isProd()) {
			return F.Promise.pure((SimpleResult)Results.internalServerError(JapidController.renderJapidWith("error500.html")));
		} else {
			return super.onError(req, t);
		}
	}

	@Override
	public Promise<SimpleResult> onBadRequest(RequestHeader req, String arg1) {
		Logger.error("BAD REQUEST : " + logRequest(req));
		if (Play.application().isProd()) {
			return F.Promise.pure((SimpleResult)Results.badRequest(JapidController.renderJapidWith("error400.html")));
		} else {
			return super.onBadRequest(req, arg1);
		}
	}

	@Override
	public Promise<SimpleResult> onHandlerNotFound(RequestHeader req) {
		Logger.error("HANDLER NOT FOUND : " + logRequest(req));
		if (Play.application().isProd() || Play.application().isDev()) {
			return F.Promise.pure((SimpleResult)Results.notFound(JapidController.renderJapidWith("error404.html")));
		} else {
			return super.onHandlerNotFound(req);
		}
	}

}