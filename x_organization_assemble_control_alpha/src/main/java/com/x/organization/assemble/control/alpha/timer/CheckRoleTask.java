package com.x.organization.assemble.control.alpha.timer;

import java.util.TimerTask;

import org.apache.commons.lang3.StringUtils;

import com.x.base.core.container.EntityManagerContainer;
import com.x.base.core.container.factory.EntityManagerContainerFactory;
import com.x.base.core.entity.annotation.CheckPersistType;
import com.x.base.core.logger.Logger;
import com.x.base.core.logger.LoggerFactory;
import com.x.base.core.role.RoleDefinition;
import com.x.organization.assemble.control.alpha.Business;
import com.x.organization.assemble.control.alpha.ThisApplication;
import com.x.organization.core.entity.Role;

public class CheckRoleTask extends TimerTask {
	/* 检查默认角色是否存在 */

	private static Logger logger = LoggerFactory.getLogger(CheckRoleTask.class);

	public void run() {
		try {
			logger.info("{} 开始检查默认角色.", ThisApplication.context().path());
			try (EntityManagerContainer emc = EntityManagerContainerFactory.instance().create()) {
				Business business = new Business(emc);
				this.checkDefaultRole(business, RoleDefinition.CompanyCreator);
				this.checkDefaultRole(business, RoleDefinition.GroupCreator);
				this.checkDefaultRole(business, RoleDefinition.PersonManager);
				this.checkDefaultRole(business, RoleDefinition.ProcessPlatformCreator);
				this.checkDefaultRole(business, RoleDefinition.ProcessPlatformManager);
				this.checkDefaultRole(business, RoleDefinition.PortalManager);
				this.checkDefaultRole(business, RoleDefinition.Manager);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void checkDefaultRole(Business business, String name) throws Exception {
		String id = business.role().getWithName(name);
		if (StringUtils.isEmpty(id)) {
			Role role = new Role();
			role.setName(name);
			business.entityManagerContainer().beginTransaction(Role.class);
			business.entityManagerContainer().persist(role, CheckPersistType.all);
			business.entityManagerContainer().commit();
		}
	}
}