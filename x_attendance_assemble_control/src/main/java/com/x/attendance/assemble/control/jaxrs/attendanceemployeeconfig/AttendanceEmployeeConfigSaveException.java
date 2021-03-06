package com.x.attendance.assemble.control.jaxrs.attendanceemployeeconfig;

import com.x.base.core.exception.PromptException;

class AttendanceEmployeeConfigSaveException extends PromptException {

	private static final long serialVersionUID = 1859164370743532895L;

	AttendanceEmployeeConfigSaveException( Throwable e ) {
		super("系统保存人员考勤配置对象信息时发生异常.", e );
	}
}
