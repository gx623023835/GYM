package com.gy.pj.sys.dao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.gy.pj.sys.entity.SysAccount;
@Mapper
public interface SysAccountDao {
	int getRowCount(@Param("name") String name);
	int insertObject(SysAccount entity);
	int updateObject(SysAccount entity);
	int findObjectByAccount(String account);
	int login(String account,String pass);
}
