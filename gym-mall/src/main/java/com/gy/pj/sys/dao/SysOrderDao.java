package com.gy.pj.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.gy.pj.sys.entity.SysOrder;

@Mapper
public interface SysOrderDao {
	int insertObject(SysOrder entity);
	List<SysOrder> findObjectByClassName(String userName);
	List<SysOrder> findPageObjects(String className,Integer startIndex,Integer pageSize);
	int getRowCount(String className);
}
