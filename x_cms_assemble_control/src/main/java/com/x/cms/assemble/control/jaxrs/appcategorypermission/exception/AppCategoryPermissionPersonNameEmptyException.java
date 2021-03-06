package com.x.cms.assemble.control.jaxrs.appcategorypermission.exception;

import com.x.base.core.exception.PromptException;

public class AppCategoryPermissionPersonNameEmptyException extends PromptException {

	private static final long serialVersionUID = 1859164370743532895L;

	public AppCategoryPermissionPersonNameEmptyException() {
		super("应用栏目分类权限配置信息用户姓名为空，无法继续查询或者保存数据。" );
	}
}
