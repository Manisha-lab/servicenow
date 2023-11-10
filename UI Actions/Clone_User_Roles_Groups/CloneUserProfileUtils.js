var CloneUserProfileUtils = Class.create();
CloneUserProfileUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    cloneRolesGroups: function() {
        var usr = this.getParameter("sysparm_usr");
        var usr_ref = this.getParameter("sysparm_usr_ref");
        var override_existing = this.getParameter("sysparm_override_existing") + "";

        if (override_existing === 'true' && !gs.nil(usr)) {
            var clr_roles = this.clearRoles(usr);
            if (!clr_roles)
                return "false";
            var clr_grps = this.clearGroups(usr);
            if (!clr_grps)
                return "false";
        }

        if (!gs.nil(usr) && !gs.nil(usr_ref)) {
            var cpy_grps = this.copyGroups(usr, usr_ref);
            if (!cpy_grps)
                return "false";
			var cpy_roles = this.copyRoles(usr, usr_ref);
            if (!cpy_roles)
                return "false";
        }

        return "true";
    },

    clearRoles: function(usr) {
        try {
            var roleGr = new GlideRecord("sys_user_has_role");
            roleGr.addQuery("user", usr);
            roleGr.addQuery("inherited", false);
            roleGr.query();
            roleGr.deleteMultiple();
        } catch (ex) {
			gs.info("Role remove Error: " + ex);
            return false;
        }
        return true;

    },

    clearGroups: function(usr) {
        try {
            var grpGr = new GlideRecord("sys_user_grmember");
            grpGr.addQuery("user", usr);
            grpGr.query();
            gs.info("Grp RC: " + grpGr.getRowCount());
            grpGr.deleteMultiple();
        } catch (ex) {
			gs.info("Group remove Error: " + ex);
            return false;
        }
        return true;

    },

    copyRoles: function(usr, usr_ref) {
        try {
            var roleGr = new GlideRecord("sys_user_has_role");
            roleGr.addQuery("user", usr_ref);
            roleGr.addQuery("inherited", false);
            roleGr.query();
            while (roleGr._next()) {
                var tgtRoleGr = new GlideRecord("sys_user_has_role");
                tgtRoleGr.addQuery("user", usr);
                tgtRoleGr.addQuery("role", roleGr.getValue("role"));
                tgtRoleGr.query();
				
                if (!tgtRoleGr.hasNext()) {
                    tgtRoleGr.initialize();
                    tgtRoleGr.setValue("user", usr);
                    tgtRoleGr.setValue("role", roleGr.getValue("role"));
                    tgtRoleGr.insert();
                }
            }
        } catch (ex) {
			gs.info("Role copy Error: " + ex);
            return false;
        }
        return true;
    },

    copyGroups: function(usr, usr_ref) {
        try {
            var grpGr = new GlideRecord("sys_user_grmember");
            grpGr.addQuery("user", usr_ref);
            grpGr.query();
            while (grpGr._next()) {
                var tgtGrpGr = new GlideRecord("sys_user_grmember");
                tgtGrpGr.addQuery("user", usr);
                tgtGrpGr.addQuery("group", grpGr.getValue("group"));
                tgtGrpGr.query();

                if (!tgtGrpGr.hasNext()) {
                    tgtGrpGr.initialize();
                    tgtGrpGr.setValue("user", usr);
                    tgtGrpGr.setValue("group", grpGr.getValue("group"));
                    tgtGrpGr.insert();
                }
            }
        } catch (ex) {
			gs.info("Group copy Error: " + ex);
            return false;
        }
        return true;
    },

    type: 'CloneUserProfileUtils'
});