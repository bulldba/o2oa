package com.x.organization.assemble.control.jaxrs.person;

import java.util.Objects;

import com.x.base.core.exception.PromptException;

 class InvalidMailException extends PromptException {

	private static final long serialVersionUID = 4622760821556680073L;

	 InvalidMailException(String mail) {
		super("邮件地址错误:不符合格式要求:" + Objects.toString(mail) + ".");
	}
}
