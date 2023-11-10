function cloneUser() {
	var dialogClass = GlideDialogWindow;
	var dialog = new dialogClass("clone_user_roles_groups");
	dialog.setTitle("Clone Roles & Groups");
	dialog.setPreference("usr",g_form.getUniqueValue());
    dialog.setWidth(800);
	dialog.render();	
}