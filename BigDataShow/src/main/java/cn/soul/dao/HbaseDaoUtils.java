package cn.soul.dao;

import org.apache.hadoop.hbase.Cell;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class HbaseDaoUtils {
    @Autowired
    private HbaseTemplate hbaseTemplate;

    /**
     * 查询表中所有数据(全表)
     * 传入参数表名,对整表进行查询
     * 在hbaseTemplate.find()方法中,通过对RowMapper进行重写,
     * 将Cell里的数据根据row,以FamilyQuali:Value的形式进行添加,封装成Map集合,返回组成List集合
     *
     * @param tableName 表名
     * @return List<Map<String,Object>> 整表数据
     */
    public List<Map<String, Object>> findData(String tableName) {
        Scan scan = new Scan();
        //默认查询全部数据
        return hbaseTemplate.find(tableName, scan, new RowMapper<Map<String, Object>>() {
            //将Cell数据封装成Map集合
            @Override
            public Map<String, Object> mapRow(Result result, int rowNum) throws Exception {
                List<Cell> ceList = result.listCells();
                Map<String, Object> map = new HashMap<String, Object>();
                String row = "";
                if (ceList != null && ceList.size() > 0) {
                    for (Cell cell : ceList) {
                        //一个数据
                        row = Bytes.toString(cell.getRowArray(), cell.getRowOffset(), cell.getRowLength());
                        String value = Bytes.toString(cell.getValueArray(), cell.getValueOffset(), cell.getValueLength());
                        String family = Bytes.toString(cell.getFamilyArray(), cell.getFamilyOffset(), cell.getFamilyLength());
                        String quali = Bytes.toString(cell.getQualifierArray(), cell.getQualifierOffset(), cell.getQualifierLength());
                        map.put(family + "_" + quali, value);
                    }
                    map.put("row", row);
                }
                return map;
            }
        });
    }

}
