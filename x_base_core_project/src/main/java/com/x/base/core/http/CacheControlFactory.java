package com.x.base.core.http;

import javax.ws.rs.core.CacheControl;

public class CacheControlFactory {
	public static CacheControl getDefault() {
		CacheControl cc = new CacheControl();
		cc.setNoCache(true);
		return cc;
	}
}
