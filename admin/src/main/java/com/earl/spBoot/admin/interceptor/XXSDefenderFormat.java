package com.earl.spBoot.admin.interceptor;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.beetl.core.Format;

/**
 * beetl模板防止xss攻击实现类
 * Created by earl on 2017/3/25.
 */
public class XXSDefenderFormat implements Format {

    @Override
    public Object format(Object data, String pattern) {
        if(data==null){
            return data;
        }

        if(data instanceof String){
            String js = (String)data;
            String str = StringEscapeUtils.escapeHtml4(js);
            if(StringUtils.isNotEmpty(pattern)){
                int len = Integer.parseInt(pattern);
                if(str.length()>len){
                    str = str.substring(0, len);
                }

            }
            return str;
        }else{
            return data;
        }

    }

    public static void main(String[] args){
        String js =  "中文<script>hi</script><h5></h5>";
        System.out.println(js);
        js = StringEscapeUtils.escapeHtml4(js);
        System.out.println(js);
    }

}
