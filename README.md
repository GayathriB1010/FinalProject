# FinalProject


# Project Title

Managefluent. This project is created with React in the front end and Express js for the 
server side development and Mongodb for the data.

# Project Description

Managefluent is a Project and task management app. There are two kind of users for this app. Admin and user.
Only admin can create a Project or delete a Project. Admin can assign projects to the user.
Users can create tasks and assign it to them or other team members. Tasks can be assigned to only the users who are assigned to the project.
Team members can edit or delete the tasks. Initially the task status is to-do. It can be moved to in progress or done.

# Landing Page

[![Pic1.png](https://i.postimg.cc/mgKtKXdb/Pic1.png)](https://postimg.cc/pmYWFZb7)

Landing Page has a small description about the project, Sign up button and sign in if the user already has an account

# Sign up Page

[![Pic2.png](https://i.postimg.cc/8P9pCFL4/Pic2.png)](https://postimg.cc/svPd6g6G)

New user who is signing up will have user account previlages , not admin

# Sign In Page

[![Pic3.png](https://i.postimg.cc/qRvVw08g/Pic3.png)](https://postimg.cc/3yVcrsfH)

All the username and password are stored in Mongodb. Once the user tries to sign in , password is validated 
against the username and checked if the user is an admin or not.

If the user has admin previlages,

They will have a Create a new project button.

[![Pic4.png](https://i.postimg.cc/hjBbRPCP/Pic4.png)](https://postimg.cc/p9snDxbg)

When clicked on the create project button, along with the project name and description,
admin has an option to add different users to the project.

[![Pic5.png](https://i.postimg.cc/gjBZjYKh/Pic5.png)](https://postimg.cc/ctwH5G21)

Project is created

[![Pic6.png](https://i.postimg.cc/NMXsmQYT/Pic6.png)](https://postimg.cc/k6nPd32X)

Since the signed in user is an admin, there is an option to delete the project

[![Pic7.png](https://i.postimg.cc/0NTx8hmN/Pic7.png)](https://postimg.cc/TyJB07t8)

There is add to task button, when a task is add, it has 3 buttons. To edit, update and delete

[![Pic8.png](https://i.postimg.cc/BvYpHGNq/Pic8.png)](https://postimg.cc/67ZCxgDS)

To edit a task, click on the edit button. A pop up appears to add the test description and 
can choose members to assign to the task. Only the users who are assigned to the project 
appears in the dropdown to choose the users from.

[![Pic9.png](https://i.postimg.cc/9MHMxDL1/Pic9.png)](https://postimg.cc/FfGNzH5J)

There is an option to add attachment from google drive to the task.

When the task is assigned to people and edit is saved, the name of users, the attachment etc
will be displayed in the task.

[![Pic10.png](https://i.postimg.cc/NfZw8WJk/Pic10.png)](https://postimg.cc/3dj6YbHk)

To change the progress of the task, click on the Edit progress button,

[![Pic11.png](https://i.postimg.cc/VvSVdN8Q/Pic11.png)](https://postimg.cc/D4TgNn0B)

Task can be moved to in progress or done

[![Pic12.png](https://i.postimg.cc/fRM1vD7X/Pic12.png)](https://postimg.cc/D8YCvVMy)

Task can be deleted

Signing as a regular user, they won' have option to create a project or delete the project
assigned to them

[![Pic13.png](https://i.postimg.cc/Fz90BWTP/Pic13.png)](https://postimg.cc/47SKK5kt)



