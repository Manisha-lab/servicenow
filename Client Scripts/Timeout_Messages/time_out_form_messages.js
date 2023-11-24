function onLoad() {
	g_form.addErrorMessage("This is a test message on form load which will disappear after 5 seconds.");

	// Call clearFormMessages() after 5 seconds
	setTimeout(clearFormMessages, 5000);
}

function clearFormMessages(){
	g_form.clearMessages();
}