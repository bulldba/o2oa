package com.x.processplatform.assemble.surface.factory.element;

import java.util.List;

import com.x.base.core.exception.ExceptionWhen;
import com.x.processplatform.assemble.surface.Business;
import com.x.processplatform.core.entity.element.Invoke;
import com.x.processplatform.core.entity.element.Process;

public class InvokeFactory extends ElementFactory {

	public InvokeFactory(Business abstractBusiness) throws Exception {
		super(abstractBusiness);
	}

	public Invoke pick(String flag) throws Exception {
		return this.pick(flag, ExceptionWhen.none);
	}

	public Invoke pick(String flag, ExceptionWhen exceptionWhen) throws Exception {
		return this.pick(flag, Invoke.class, exceptionWhen, Invoke.FLAGS);
	}

	public List<Invoke> listWithProcess(Process process) throws Exception {
		List<Invoke> list = this.listWithProcess(Invoke.class, process);
		return list;
	}
}