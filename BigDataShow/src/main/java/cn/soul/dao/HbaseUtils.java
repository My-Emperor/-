package cn.soul.dao;

import java.util.*;

/**
 * 对所查数据集合的处理类
 */
public class HbaseUtils {

    /**
     * 根据key对应的值进行降序排序
     *
     * 对Collections的sort方法Comparator进行重写,
     * 将KEY_NAME转换成int类型进行比较
     * 相等:返回零,不处理
     * 后面的值大于前面的值: 返回-1, 降序
     * 前面的值小于后面的值: 返回 1, 升序
     * 最后List集合根据key降序排列
     *
     * @param list 数据的集合
     * @param key
     * @return
     */
    public static List sortArray(List<Map<String, Object>> list, String key) {
        Collections.sort(list, new Comparator<Map>() {
            String KEY_NAME = key;

            @Override
            public int compare(Map a, Map b) {
                String aStr = (String) a.get(KEY_NAME);
                String bStr = (String) b.get(KEY_NAME);
                int aInt = Integer.parseInt(aStr);
                int bInt = Integer.parseInt(bStr);
                if (aInt > bInt) {
                    return 1;
                } else if (bInt > aInt) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
        return list;
    }
    /**
     * 返回列值的Key,Value为Map集合
     *
     * 循环List集合,获取每一个Map中与key对应列值的value
     * 即:
     *    获取Map中 key=familyQualifierKey的value值 名为value1
     *    获取Map中 key=familyQualifierValue的value值 名为value2
     *    将value1作为key,将value2作为value添加到Map集合中返回
     *
     * 如: 查询职位平均薪资前十中对应的最高薪资
     *    所需格式:Map<职位,最高薪资>
     *    获取List<Map>里的每一个Map中
     *    将familyQualifierKey="f1_job_tag"(职位), familyQualifierValue="f3_average_2"(最高薪资)作为Key
     *    查询Map中对应Key的Value,再按照所需"key","value"的逻辑将Value添加到dataMap中,
     *    返回Map
     *
     * @param list
     * @param familyQualifierKey 列值key
     * @param familyQualifierValue 列值value
     * @return
     */
    public static Map familyQualifierToMap(List<Map> list, String familyQualifierKey, String familyQualifierValue) {
        Map dataMap = new LinkedHashMap();
        for (int i = 0; i < list.size(); i++) {
            dataMap.put(list.get(i).get(familyQualifierKey), list.get(i).get(familyQualifierValue));
        }
        return dataMap;
    }

    /**
     * 返回List中对应列值的Key,Value为Map集合
     *
     * 循环List集合,判断并获取每一个Map中与key对应列值的value
     * 即:
     *    获取Map中 key=ifFamilyQualifier的value,与传入的jobName进行判断
     *    true:
     *        获取Map中 key=familyQualifierKey的value值 名为value1
     *        获取Map中 key=familyQualifierValue的value值 名为value2
     *        将value1作为key,将value2作为value添加到Map集合中返回
     *
     * 如:查询职位排名对应职位的排名数据
     *    所需格式<技术词,次数>
     *    获取List<Map>里的每一个Map中
     *    判断key=ifFamilyQualifier("f1_job_tag"--职位)的value,判断与jobName是否相同
     *    true:
     *       将familyQualifierKey="f1_job_tag"(技术词), familyQualifierValue="f2_technicalwords"(次数)作为Key
     *       查询Map中对应Key的Value,添加到dataMap中,
     *       返回Map, 即:Map<技术词,次数>
     *
     * @param list
     * @param jobName 判断的名词
     * @param ifFamilyQualifier 判断的列值
     * @param familyQualifierKey  列值key
     * @param familyQualifierValue  列值value
     * @return
     */
    public static Map ifFamilyQualifierToMap(List<Map> list, String jobName, String ifFamilyQualifier, String familyQualifierKey, String familyQualifierValue) {
        Map dataMap = new LinkedHashMap();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get(ifFamilyQualifier).equals(jobName)) {
                dataMap.put(list.get(i).get(familyQualifierKey), list.get(i).get(familyQualifierValue));
            }
        }
        return dataMap;
    }

    /**
     * 返回该列值所有的List集合
     *
     * 循环List集合,
     * 获取每一个数据Map的key=FamilyQualifier的value,
     * 返回List集合,
     *
     * 如:查询最高薪资
     * 循环获取Map中key=FamilyQualifier("f3_average_2")的value添加到List集合,
     * 返回List集合
     *
     *
     * @param list
     * @param FamilyQualifier 列值
     * @return
     */
    public static List allFamilyQualifierToList(List<Map> list, String FamilyQualifier) {
        List dataList = new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            dataList.add(list.get(i).get(FamilyQualifier));
        }
        return dataList;
    }

    /**
     * 返回列值不重复的List集合
     *
     * 循环遍历List集合获取每一个Map,
     * 在Map中获取key=FamilyQualifier的value添加到Set集合中,
     * 返回Set集合,
     * (Set集合中的值不重复)
     *
     * 如:查询所有职位
     *
     *
     * @param list
     * @param FamilyQualifier 列值
     * @return
     */
    public static Set OnlyFamilyQualifierToList(List<Map> list, String FamilyQualifier) {
        Set dataList = new HashSet();
        for (int i = 0; i < list.size(); i++) {
            dataList.add(list.get(i).get(FamilyQualifier));
        }
        return dataList;
    }

    /**
     * 返回对应列值的List集合
     *
     * 循环List集合获取每一个Map,
     * 在Map中获取Key=ifFamilyQualifier的value与参数jobName进行判断
     * true:
     *    获取Map中Key=FamilyQualifier的value添加到List集合中
     * 返回List集合
     *
     * 如:查询各职位最大薪资
     * list循环获取Key=ifFamilyQualifier的value与参数jobName判断职位
     * true:
     *      获取Map中Key=FamilyQualifier的value(最大薪资)添加到List集合中
     *      返回List集合
     *
     *
     *
     * @param list
     * @param jobName           判断的名词
     * @param ifFamilyQualifier 判断的列值
     * @param FamilyQualifier   列值
     * @return
     */
    public static List ifFamilyQualifierToList(List<Map> list, String jobName, String ifFamilyQualifier, String FamilyQualifier) {
        List dataList = new ArrayList();
        for (int i = 0; i < list.size(); i++) {
//            判断集合中与职位对应的技术词与次数的索引
            if (list.get(i).get(ifFamilyQualifier).equals(jobName)) {
                dataList.add(list.get(i).get(FamilyQualifier));
            }
        }
        return dataList;
    }
}
