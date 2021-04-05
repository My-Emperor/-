package cn.soul.controller;

import cn.soul.service.impl.DataServiceImpl;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Controller
public class DataController {
    @Autowired
    private DataServiceImpl dataServiceImpl;

    /**
     * 主维度:
     * 查找职位排名前15的技术词与出现次数
     *
     * @param id       查询对应的职位
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryJobTopData", method = {RequestMethod.POST, RequestMethod.GET})
    public void findJobTopData(String id, HttpServletResponse response) throws Exception {
//        System.setProperty("hadoop.home.dir", "F:\\hadoop-common-2.2.0-bin-master");
        id = URLDecoder.decode(id, "UTF-8");
        Map data = dataServiceImpl.findJobDataAll(id);
        response.getWriter().write(JSON.toJSON(data).toString());
    }


    /**
     * 第二维度:
     * 查询职位学历要求以及经验的所占比
     *
     * @param id       查询对应的职位
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryJobEduExpData", method = {RequestMethod.POST, RequestMethod.GET})
    public void findJobEduExpData(String id, HttpServletResponse response) throws Exception {
        id = URLDecoder.decode(id, "UTF-8");
//        System.setProperty("hadoop.home.dir", "F:\\hadoop-common-2.2.0-bin-master");
        List data = dataServiceImpl.findJobEduExpData(id);
        response.getWriter().write(JSON.toJSON(data).toString());
    }

    /**
     * 第三维度:
     * 查询职位各经验的平均工资与平均薪资前十的职位
     *
     * 判断参数id为薪资还是职位,响应对应JSON数据
     *
     *
     * @param id       传入需要查询的薪资或职位
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryJobSalaryData", method = {RequestMethod.POST, RequestMethod.GET})
    public void findJobSalaryData(String id, HttpServletResponse response) throws Exception {
        id = URLDecoder.decode(id, "UTF-8");
//        System.setProperty("hadoop.home.dir", "F:\\hadoop-common-2.2.0-bin-master");
        if (id.contains("薪资")) {
            Map data = dataServiceImpl.findJobSalaryTopData(id);
            response.getWriter().write(JSON.toJSON(data).toString());
        } else { // 查询职位
            List data = dataServiceImpl.findJobSalaryData(id);
            response.getWriter().write(JSON.toJSON(data).toString());
        }
    }

    /**
     * 第四维度:
     * 一. 查询每个职位的技术词和出现次数与对应的地区城市与坐标
     *
     * @param id       传入职位
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryJobAddrCoordData", method = {RequestMethod.POST, RequestMethod.GET})
    public void findJobAddrCoordData(String id, HttpServletResponse response) throws Exception {
//        System.setProperty("hadoop.home.dir", "F:\\hadoop-common-2.2.0-bin-master");
        id = URLDecoder.decode(id, "UTF-8");
//        System.out.println("地图职位分布id:----");
//        System.out.println("----queryJobAddrCoordData:"+id);
        List addrData = dataServiceImpl.findJobAddrAllData(id);
//        System.out.println("addrData 地区数据:----");
//        System.out.println(addrData);
        Map coordData = dataServiceImpl.findAddrCoordAllData(addrData);
        response.getWriter().write(JSON.toJSON(addrData).toString());
        response.getWriter().write(JSON.toJSON(coordData).toString());
    }

    /**
     * 第四维度:
     * 二.查询所有的职位
     *
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryAddrJobAllData", method = {RequestMethod.POST, RequestMethod.GET})
    public void findAddrJobAllData(HttpServletResponse response) throws Exception {
//        System.setProperty("hadoop.home.dir", "F:\\hadoop-common-2.2.0-bin-master");
        Set data = dataServiceImpl.findAddrJobAllData();
        response.getWriter().write(JSON.toJSON(data).toString());
    }

    /**
     * 第五维度:
     * 公司性质分布
     *
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryJobCompanyData", method = {RequestMethod.POST, RequestMethod.GET})
    public void findJobCompanyData(HttpServletResponse response) throws Exception {
//        System.setProperty("hadoop.home.dir", "F:\\hadoop-common-2.2.0-bin-master");
        Map data = dataServiceImpl.findJobCompanyData();
        response.getWriter().write(JSON.toJSON(data).toString());
    }
}
