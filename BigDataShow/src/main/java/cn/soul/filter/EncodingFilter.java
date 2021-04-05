package cn.soul.filter;

import javax.servlet.*;
import java.io.IOException;

/**
 * 全局编码设置
 * 获取encoding,将request,response与响应头设置成UTF-8的编码
 */
public class EncodingFilter implements Filter {
    protected FilterConfig config;
    protected String encoding = null;

    @Override
    public void init(FilterConfig arg0) {
        this.config = arg0;

        /* 从web.xml里读取编码的配置初始值 */
        this.encoding = config.getInitParameter("Encoding");
    }

    /**
     * 具体实现的过滤方法
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain arg2)
            throws IOException, ServletException {
        if (encoding == null) {
            encoding = "UTF-8";
        }
        //进行三种编码设置
        response.setCharacterEncoding(encoding);
        request.setCharacterEncoding(encoding);
        response.setContentType("text/html;charset=" + encoding);
        //放行
        arg2.doFilter(request, response);
    }

    /**
     * 自动调用destroy方法
     */
    @Override
    public void destroy() {
//        encoding = null;
    }

}
