package cn.soul.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface DataService {

    /**
     * 职位排名前15的技术词与出现次数数据
     *
     * @param jobName 查询的职位
     * @return dataMap
     */
    public Map findJobDataAll(String jobName);

    /**
     * 查询职位学历要求以及经验的所占比数据
     *
     * @param jobName 查询的职位
     * @return dataList
     */
    public List findJobEduExpData(String jobName);

    /**
     * 查询职位各经验的平均工资数据
     *
     * @param jobName 查询的职位
     * @return dataList
     */
    public List findJobSalaryData(String jobName);

    /**
     * 查询平均薪资前十的最高,最低以及平均职位的数据
     *
     * @param id 薪资
     * @return dataMap
     */
    public Map findJobSalaryTopData(String id);

    /**
     * 查询职位各地区与出现次数
     *
     * @return
     */
    public List findJobAddrAllData(String jobName);

    /**
     * 查找对应的地区与坐标
     *
     * @param dataList
     * @return
     */
    public Map findAddrCoordAllData(List<Map> dataList);

    /**
     * 查询所有职位
     *
     * @return
     */
    public Set findAddrJobAllData();

    /**
     * 查询公司性质分布数据
     *
     * @return dataMap
     */
    public Map findJobCompanyData();

}




