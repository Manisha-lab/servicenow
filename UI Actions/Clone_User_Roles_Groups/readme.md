
ServiceNow administrators often need to create new users and assign them the appropriate roles and group memberships. This can be a time-consuming process, especially if the user needs to be granted access to a large number of groups and roles.

To make this process easier, you can create a UI action to clone the roles and groups of one user to another user. This UI action can be added to the User form, so that it is easily accessible to administrators.

To create this UI Action, I have created an UI Page to use it as a Pop Up and a Script Include to process the request. Follow along to create one for yourself.

A. Script Include: To create a Client Callable Script Include,

1. Navigate to System Definition > Script Includes.
2. Click New.
3. Enter a name: CloneUserProfileUtils 
4. Set the Client Callable to True.
5. In the Script field, use the following code and Save.
[Script Include](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/CloneUserProfileUtils.js)


B. UI Page: To create an UI Page, follow these steps

1. Navigate to System UI > UI Pages.
2. Click New.
3. Enter a name for the UI page: clone_user_roles_groups
4. In the Client Script field & HTML field, enter the following code and Save.

[Client Script](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/clone_user_roles_groups.js)

[HTML](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/clone_user_roles_groups.html)

C. UI Action: To create a UI action, follow these steps:
1. Navigate to System Definition > UI Actions.
2. Click New.
3. Enter a name: Clone Roles and Groups.
4. Enter an Action name: clone_roles_groups_from_ref_user
5. Set Show Insert: False, Show Update True, Client: True and Form context menu: True and Form link: True
6. In the Condition field, enter: gs.hasRole('admin') && current.active == true
7. In the onClick field, enter: cloneUser()
8. In the Script field, enter the following code and Save.
[Script](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/Clone_Roles_Groups.js)