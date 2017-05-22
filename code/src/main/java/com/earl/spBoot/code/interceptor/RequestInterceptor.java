package com.earl.spBoot.code.interceptor;

import com.earl.spBoot.code.config.PathYml;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 请求拦截器
 */
public class RequestInterceptor extends HandlerInterceptorAdapter {


	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String  projectPath = PathYml.getRootPath() + PathYml.getContextPath();
		request.setAttribute("projectPath",projectPath );
		return super.preHandle(request, response, handler);
	}


}
