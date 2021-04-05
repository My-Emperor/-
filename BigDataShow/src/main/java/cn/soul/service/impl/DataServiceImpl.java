package cn.soul.service.impl;

import cn.soul.dao.HbaseDaoImpl;
import cn.soul.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DataServiceImpl implements DataService {
    @Autowired
    private HbaseDaoImpl hbaseDaoimpl;

    /**
     * 第一维度
     * 职位排名前15的技术词与出现次数数据
     *
     * @param jobName
     * @return 技术词:次数
     */
    @Override
    public Map findJobDataAll(String jobName) {
        return hbaseDaoimpl.findJobTopData(jobName);
    }

    /**
     * 第二维度
     * 查询职位学历要求以及经验的所占比数据
     *
     * 分别获取各职位学历数据与各职位经验数据的Map组成一个List集合返回
     *
     * @param jobName
     * @return dataList 学历+次数:经验+次数
     */
    @Override
    public List findJobEduExpData(String jobName) {
        List dataList = new ArrayList();
        Map eduMap = hbaseDaoimpl.findJobEduData(jobName);
        Map expMap = hbaseDaoimpl.findJobExpData(jobName);
        dataList.add(eduMap);
        dataList.add(expMap);
        return dataList;

    }

    /**
     * 第三维度
     * 查询职位各经验的平均工资数据
     *
     * @param jobName
     * @return 经验+最大薪资+最小薪资
     */
    @Override
    public List findJobSalaryData(String jobName) {
        return hbaseDaoimpl.findJobSalaryData(jobName);
    }

    /**
     * 第三维度
     * 查询平均薪资前十的最高,最低以及平均职位的数据
     *
     * 判断参数id返回对应薪资
     * 当id为平均薪资时,通过循环,
     * 获取List中的每个list<String>
     * 在将max与min进行计算获得平均薪资
     * 将职位job与平均薪资添加到Map中
     * 最后返回Map集合,
     *
     * @param id 薪资
     * @return 职位:薪资
     */
    @Override
    public Map findJobSalaryTopData(String id) {
        if (id.equals("最高薪资")) {
            return hbaseDaoimpl.findJobSalaryTopMaxData();
        }
        if (id.equals("最低薪资")) {
            return hbaseDaoimpl.findJobSalaryTopMinData();
        }
        if (id.equals("平均薪资")) {
            List<List<String>> readyList = hbaseDaoimpl.findJobSalaryTopAvgData();
            Map dataMap = new LinkedHashMap();
            for (int i = 0; i < readyList.size(); i++) {
                String job = readyList.get(0).get(i);
                Integer min = Integer.parseInt(readyList.get(1).get(i));
                Integer max = Integer.parseInt(readyList.get(2).get(i));
                dataMap.put(job, (min + max) / 2);
            }
            return dataMap;
        }
        return null;
    }

    /**
     * 第四维度
     * 查询职位
     *
     * 根据前端所需格式List<Map<Map,Map>>
     * 即 [{{"name","北京市"},{"value","123"}},{{"name","成都市"},{"value","321"}},......]
     * 通过迭代器,me.getKey()取出key自身的值,me.getValue取出value自身的值
     * 分别添加到Map中,再将两者添加到List集合
     * 最后返回List集合
     *
     * @param jobName
     * @return 职位地区+次数
     */
    @Override
    public List findJobAddrAllData(String jobName) {
        Map readyMap = hbaseDaoimpl.findJobAddrData(jobName);
        System.out.println("readyMap++++++++++++"+readyMap);
        List dataList = new ArrayList();
        Set<Map.Entry<String, String>> entrySet = readyMap.entrySet();
        // 将关系集合entryset进行迭代，存放到迭代器中
        Iterator<Map.Entry<String, String>> it2 = entrySet.iterator();
        while (it2.hasNext()) {
            Map.Entry<String, String> me = it2.next();
            Map map = new LinkedHashMap();
            map.put("name", me.getKey());
            map.put("value", me.getValue());
            dataList.add(map);
        }
//        System.out.println("第四维度："+dataList);
        return dataList;
    }

    /**
     * 第四维度
     * 获取地区坐标
     *
     * 通过迭代器取出集合key和value自身的值
     * 与从数据库读取的地图坐标数据coordData进行判断
     * 若两集合中都有相同城市名,则将城市名与坐标添加到Map集合中,continue跳到下一循环
     * 最后返回Map集合
     *
     * @param dataList 职位与次数
     * @return 地区:坐标
     */
    @Override
    public Map findAddrCoordAllData(List<Map> dataList) {
        Map coordData = hbaseDaoimpl.findAddrCoordAllData();
        Map dataMap = new LinkedHashMap();
        Set<Map.Entry<String, String>> entrySet = coordData.entrySet();
        // 将关系集合entryset进行迭代，存放到迭代器中
        Iterator<Map.Entry<String, String>> it2 = entrySet.iterator();
        while (it2.hasNext()) {
            Map.Entry<String, String> me = it2.next();
            String key = me.getKey();
            String value = me.getValue();
            //判断地区
            for (int i = 0; i < dataList.size(); i++) {
                if (key.equals(dataList.get(i).get("name"))) {
                    dataMap.put(key, value);
                    continue;
                }
            }
        }
//        System.out.println("第四维度："+dataMap);

        return dataMap;
    }

    /**
     * 第四维度
     * 查询所有职位
     *
     * @return 职位
     */
    @Override
    public Set findAddrJobAllData() {
        return hbaseDaoimpl.findAllJobData();
    }

    /**
     * 第五维度
     * 查询公司性质分布数据
     *
     * @return 公司性质:出现次数
     */
    @Override
    public Map findJobCompanyData() {
        return hbaseDaoimpl.findJobCompanyData();
    }
}