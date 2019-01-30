
/**   
* @Title: BatchInsert.java 
* @Package com.lfemcp 
* @Description: TODO(用一句话描述该文件做什么) 
* @author herolizhen
* @date 2019年1月3日 下午4:33:58 
* @version V1.0   
*/

package com.lfemcp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import com.lfemcp.util.JdbcUtil;

/**
 * @ClassName: BatchInsert
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author HeroLizhen
 * @date 2019年1月3日 下午4:33:58
 * 
 */
public class DbOperate {
	public static boolean insertBatch(String table, List<String[]> list) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		String sql = "insert into " + table + " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		try {
			conn = JdbcUtil.getConnection();
			ps = conn.prepareStatement(sql);

			// 优化插入第一步 设置手动提交
			conn.setAutoCommit(false);

			int len = list.size();
			for (int i = 0; i < len; i++) {
				ps.setString(1, list.get(i)[0]);
				for (int j = 1; j < 17; j++) {
					if (list.get(i)[j].length() < 1) {
						ps.setInt(j + 1, 0);
					} else {
						ps.setString(j + 1, list.get(i)[j]);
					}
				}
				ps.addBatch();
			}

			ps.executeBatch();

			conn.commit();
			ps.clearBatch();
		} catch (Exception e) {
			System.out.println("insertBatch:" + e.getMessage());
			return false; // 出错才报false
		} finally {
			JdbcUtil.close(conn, ps, rs);
		}
		return true;
	}

	public static boolean delete(String table, String star,String end) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		String sql = "delete from " + table + "  where cjsj > str_to_date('" + star + "', '%Y-%m-%d %H:%i') and   cjsj <= str_to_date('" + end + "', '%Y-%m-%d %H:%i')";

		try {
			conn = JdbcUtil.getConnection();
			ps = conn.prepareStatement(sql);
			conn.setAutoCommit(false);
			ps.execute(sql);
			conn.commit();
			ps.clearBatch();
		} catch (Exception e) {
			System.out.println("delete:" + e.getMessage());
			return false; // 出错才报false
		} finally {
			JdbcUtil.close(conn, ps, rs);
		}
		return true;
	}
}
