package cn.soul.dao;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface HbaseDao {
    /**
     * 查询对应职位的排名数据(技术词与次数)
     *
     * @param jobName 查询对应的职位
     * @return 技术词:次数
     */
    public Map findJobTopData(String jobName);

    /**
     * 查询各职位学历数据
     *
     * @param jobName 查询对应的职位
     * @return 学历:次数
     */
    public Map findJobEduData(String jobName);

    /**
     * 查询各职位经验数据
     *
     * @param jobName 查询对应的职位
     * @return 经验:次数
     */
    public Map findJobExpData(String jobName);

    /**
     * 查询每个职位中各经验的工资数据
     *
     * @param jobName 查询对应的职位
     * @return 经验+最大薪资+最小薪资
     */
    public List findJobSalaryData(String jobName);

    /**
     * 查询平均薪资前十中对应的最高薪资
     *
     * @return 职位:最高薪资
     */
    public Map findJobSalaryTopMaxData();

    /**
     * 查询平均薪资前十中对应的最低薪资
     *
     * @return 职位:最低薪资
     */
    public Map findJobSalaryTopMinData();

    /**
     * 查询平均薪资前十中对应的平均薪资
     *
     * @return 职位+平均薪资
     */
    public List findJobSalaryTopAvgData();

    /**
     * 查询该职位对应的地区与发布次数
     *
     * @return 地区:次数
     */
    public Map findJobAddrData(String JobName);

    /**
     * 查询所有地区的坐标
     *
     * @return 地区:坐标
     */
    public Map findAddrCoordAllData();

    /**
     * 查询所有职位
     *
     * @return 职位
     */
    public Set findAllJobData();

    /**
     * 各公司性质与次数
     *
     * @return 公司性质:出现次数
     */
    public Map findJobCompanyData();

}
