#Easily Clone One User's Groups and Roles to Another User in ServiceNow

ServiceNow administrators often need to create new users and assign them the appropriate roles and group memberships. This can be a time-consuming process, especially if the user needs to be granted access to a large number of groups and roles.

To make this process easier, you can create a UI action to clone the roles and groups of one user to another user. This UI action can be added to the User form, so that it is easily accessible to administrators.

To create this UI Action, I have created an UI Page to use it as a Pop Up and a Script Include to process the request. Follow along to create one for yourself.

##A. Script Include: To create a Client Callable Script Include,

1. Navigate to System Definition > Script Includes.
2. Click New.
3. Enter a name: CloneUserProfileUtils 
4. Set the Client Callable to True.
5. In the Script field, use the following code and Save.
[Script Include](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/CloneUserProfileUtils.js)

![Script Include](https://github.com/anveshmupparaju/servicenow/blob/88108b4b618c56b7c485c96d21d82c20b4518a41/UI%20Actions/Clone_User_Roles_Groups/1.%20Script%20Include.png)

##B. UI Page: To create an UI Page, follow these steps

1. Navigate to System UI > UI Pages.
2. Click New.
3. Enter a name for the UI page: clone_user_roles_groups
4. In the Client Script field & HTML field, enter the following code and Save.

[Client Script](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/clone_user_roles_groups.js)

[HTML](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/clone_user_roles_groups.html)

![UI Page](https://github.com/anveshmupparaju/servicenow/blob/ace497c835b5b30b431d5d85f6a65d8534f9fd64/UI%20Actions/Clone_User_Roles_Groups/2.%20UI%20Page.png)

##C. UI Action: To create a UI action, follow these steps:
1. Navigate to System Definition > UI Actions.
2. Click New.
3. Enter a name: Clone Roles and Groups.
4. Enter an Action name: clone_roles_groups_from_ref_user
5. Set Show Insert: False, Show Update True, Client: True and Form context menu: True and Form link: True
6. In the Condition field, enter: gs.hasRole('admin') && current.active == true
7. In the onClick field, enter: cloneUser()
8. In the Script field, enter the following code and Save.
[Script](https://github.com/anveshmupparaju/servicenow/blob/79d183678054ed8415a527482fe2e25612894093/UI%20Actions/Clone_User_Roles_Groups/Clone_Roles_Groups.js)

![UI Action Part 1](https://github.com/anveshmupparaju/servicenow/blob/ace497c835b5b30b431d5d85f6a65d8534f9fd64/UI%20Actions/Clone_User_Roles_Groups/3.%20UI%20Action%20-%20A.png)
![UI Action Part 2](https://github.com/anveshmupparaju/servicenow/blob/ace497c835b5b30b431d5d85f6a65d8534f9fd64/UI%20Actions/Clone_User_Roles_Groups/3.%20UI%20Action%20-%20A.png)


##Result:

![Form](https://github.com/anveshmupparaju/servicenow/blob/ace497c835b5b30b431d5d85f6a65d8534f9fd64/UI%20Actions/Clone_User_Roles_Groups/4.%20User%20Form.png)

![UI Action Pop-Up](https://github.com/anveshmupparaju/servicenow/blob/ace497c835b5b30b431d5d85f6a65d8534f9fd64/UI%20Actions/Clone_User_Roles_Groups/5.%20Dialog.png)
