package com.x.processplatform.assemble.surface.factory.element;

import java.util.List;

import com.x.base.core.exception.ExceptionWhen;
import com.x.processplatform.assemble.surface.Business;
import com.x.processplatform.core.entity.element.Delay;
import com.x.processplatform.core.entity.element.Process;

public class DelayFactory extends ElementFactory {

	public DelayFactory(Business abstractBusiness) throws Exception {
		super(abstractBusiness);
	}

	public Delay pick(String flag) throws Exception {
		return this.pick(flag, ExceptionWhen.none);
	}

	public Delay pick(String flag, ExceptionWhen exceptionWhen) throws Exception {
		return this.pick(flag, Delay.class, exceptionWhen, Delay.FLAGS);
	}

	public List<Delay> listWithProcess(Process process) throws Exception {
		List<Delay> list = this.listWithProcess(Delay.class, process);
		return list;
	}
}