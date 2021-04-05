package cn.soul.dao;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import org.springframework.stereotype.Repository;

@Repository

public class HbaseDaoImpl implements HbaseDao {
    @Autowired
    private HbaseDaoUtils hbaseDaoUtils;

    /**
     * 查询职位排名对应职位的排名数据
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @param jobName 查询对应的职位
     * @return 技术词:次数
     */
    @Override
    public Map findJobTopData(String jobName) {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("jobs_hbase"), "row");
        return HbaseUtils.ifFamilyQualifierToMap(readyList, jobName, "f1_job_tag", "f2_technicalwords", "f3_counts");
    }

    /**
     * 查询各职位学历数据
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @param jobName 查询对应的职位
     * @return dataMap 学历:次数
     */
    @Override
    public Map findJobEduData(String jobName) {
        List readyEduList = HbaseUtils.sortArray(hbaseDaoUtils.findData("Educations_hbase"), "row");
        Map dataMap = new HashMap();
        dataMap.put(jobName, HbaseUtils.ifFamilyQualifierToMap(readyEduList, jobName, "f1_job_tag", "f2_job_edu", "f3_counts"));
        return dataMap;
    }

    /**
     * 查询各职位经验数据
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @param jobName 查询对应的职位
     * @return dataMap 经验:次数
     */
    @Override
    public Map findJobExpData(String jobName) {
        List readyExpList = HbaseUtils.sortArray(hbaseDaoUtils.findData("edu_exp_hbase"), "row");
        Map dataMap = new HashMap();
        dataMap.put(jobName, HbaseUtils.ifFamilyQualifierToMap(readyExpList, jobName, "f1_job_tag", "f2_job_exp", "f3_counts"));
        return dataMap;
    }

    /**
     * 查询每个职位中各经验的工资数据
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 查询出各职位中的经验,最大薪资,最低薪资的List集合
     * 再将三者组成一个list集合返回
     *
     * @param jobName 查询对应的职位
     * @return dataList 经验+最大薪资+最小薪资
     */
    @Override
    public List findJobSalaryData(String jobName) {
        List readylist = HbaseUtils.sortArray(hbaseDaoUtils.findData("salary_exp_hbase"), "row");
        List dataList = new ArrayList();
        dataList.add(jobName);
        dataList.add(HbaseUtils.ifFamilyQualifierToList(readylist, jobName, "f1_job_tag", "f2_job_exp"));
        dataList.add(HbaseUtils.ifFamilyQualifierToList(readylist, jobName, "f1_job_tag", "f3_average_1"));
        dataList.add(HbaseUtils.ifFamilyQualifierToList(readylist, jobName, "f1_job_tag", "f4_average_2"));
        return dataList;
    }

    /**
     * 查询职位平均薪资前十中对应的最高薪资
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @return 职位:最高薪资
     */
    @Override
    public Map findJobSalaryTopMaxData() {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("salary_top5"), "row");
        return HbaseUtils.familyQualifierToMap(readyList, "f1_job_tag", "f3_average_2");

    }

    /**
     * 查询职位平均薪资前十中对应的最低薪资
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @return 职位:最低薪资
     */
    @Override
    public Map findJobSalaryTopMinData() {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("salary_top5"), "row");
        return HbaseUtils.familyQualifierToMap(readyList, "f1_job_tag", "f2_average_1");

    }

    /**
     * 查询职位平均薪资前十中对应的职位,最高薪资,最低薪资
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 查询出salary_top5表中的职位,最高薪资,最低薪资的list集合
     * 再将三者组成一个List集合返回
     *
     * @return dataList 职位+最高薪资+最低薪资
     */
    @Override
    public List findJobSalaryTopAvgData() {
        List dataList = new ArrayList();
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("salary_top5"), "row");
        dataList.add(HbaseUtils.allFamilyQualifierToList(readyList, "f1_job_tag"));
        dataList.add(HbaseUtils.allFamilyQualifierToList(readyList, "f2_average_1"));
        dataList.add(HbaseUtils.allFamilyQualifierToList(readyList, "f3_average_2"));
        return dataList;
    }

    /**
     * 查询职位对应的所有地区与出现次数
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @param jobName
     * @return 职位:次数
     */
    @Override
    public Map findJobAddrData(String jobName) {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("addr_hbase"), "row");
        return HbaseUtils.ifFamilyQualifierToMap(readyList, jobName, "f1_job_tag", "f2_name", "f3_counts");
    }

    /**
     * 获取地区坐标
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @return 地区:坐标
     */
    @Override
    public Map findAddrCoordAllData() {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("t_coordinate_hbase"), "row");
        return HbaseUtils.familyQualifierToMap(readyList, "f1_place", "f2_coordinate");
    }

    /**
     * 查询所有职位
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @return 职位
     */
    @Override
    public Set findAllJobData() {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("addr_hbase"), "row");
        Set f1_job_tag = HbaseUtils.OnlyFamilyQualifierToList(readyList, "f1_job_tag");
        return f1_job_tag;
    }

    /**
     * 各公司性质的出现次数数据
     * 通过hbaseDaoUtils.findData读取数据
     * 通过HbaseUtils.sortArray对数据进行排序处理
     * 调用HbaseUtils对应处理方法返回数据集合
     * @return 公司性质:出现次数
     */
    @Override
    public Map findJobCompanyData() {
        List readyList = HbaseUtils.sortArray(hbaseDaoUtils.findData("nature_hbase"), "row");
        return HbaseUtils.familyQualifierToMap(readyList, "f1_natures", "f2_counts");
    }

}
