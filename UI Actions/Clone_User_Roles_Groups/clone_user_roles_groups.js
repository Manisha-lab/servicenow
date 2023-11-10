function continueOK() {
	var gdw = GlideDialogWindow.get();
	var user_tgt = gdw.getPreference('usr');
	var user_ref = gel('user_ref').value;
	var override_existing = gel('override_existing').value;

	var ga = new GlideAjax("CloneUserProfileUtils");
	ga.addParam("sysparm_name", "cloneRolesGroups");
	ga.addParam("sysparm_usr", user_tgt);
	ga.addParam("sysparm_usr_ref", user_ref);
	ga.addParam("sysparm_override_existing", override_existing);
	ga.getXMLAnswer(processResponse);

	function processResponse(answer){
		if(answer === 'true')
			g_form.addInfoMessage("Roles and Groups cloned successfully.");
		else
			g_form.addErrorMessage("Roles and Groups clone failed.");
			
		GlideDialogWindow.get().destroy();
	}
}
function continueCancel() {
	GlideDialogWindow.get().destroy();
}