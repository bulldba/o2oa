package com.x.okr.assemble.control.jaxrs.okrtask;

import com.x.base.core.exception.PromptException;

class TaskDeleteException extends PromptException {

	private static final long serialVersionUID = 1859164370743532895L;

	TaskDeleteException( Throwable e, String id ) {
		super("系统根据ID删除指定的待办信息时发生异常!ID:" + id, e );
	}
}
