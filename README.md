# HeyMD

HeyMD is an online markdown note appplication. [Visit it now](https://tsungtingdu.github.io/heymd)!

![Imgur](https://i.imgur.com/CEe3JcG.png)

### test accounts
| role  | name  | email  |  password  |   |
|---|---|---|---|---|
| user | user1 | user1@gmail.com | 12345678 |
| user | user2 | user2@gmail.com | 12345678 |
| user | user3 | user3@gmail.com | 12345678 |


you can sign up your own account as well.

***
## User stories and specs

### Done
* ✅ user can sign up with email
* ✅ user can sign in with email
* ✅ user can create a new post
* ✅ user can edit a post
* ✅ user can delete a post
* ✅ user can see all posts that he/she created, with differnt sorting choices and layouts
* ✅ post can be auto saved when editing
* ✅ user can search posts by keywords

### In progress
* ◽️ user can publish a post and share with non-login user
* ◽️ user can add other user as collaborator with different authority
  * viewer: view only
  * collaborator: view and edit
  * owner: view, edit, and delete
* ◽️ user can edit the post offline, then save it when back to online
* ◽️ multiple users can edit a post at the same time
* ◽️ error handling and error message for users

### Optimization
* 🔸 consolidate variable names in store
* 🔸 create layout for loading spinning instead of component
* 🔸 move layout options' state to store for better management
* 🔸 use styled components only, instead of using SCSS and styled components at the same time
* 🔸 menu bar RWD
* 🔸 speed up the app
* ... and more  

### Future
* ◽️ super admin panel

***

## Tech stack & resources
### Tech stack:
* Backend
  * Node
  * Express
  * mysql
  * swagger `(api doc)`
  * Heroku `(deployment)`
* Frontend
  * React (with React Hook)
  * react-redux
  * redux-saga
  * react-router
  * styled-components
  * for-editor `(markdown editor)`
  * github page `(deployment)`

### Resources:
* Backend
  * [repo](https://github.com/tsungtingdu/hackmd_clone_api_server)
  * [API doc](https://hackmd-clone.herokuapp.com/api-doc/#/)
  * API endpoint: [https://hackmd-clone.herokuapp.com/](https://hackmd-clone.herokuapp.com/)
* Frontend
  * [repo](https://github.com/tsungtingdu/heymd)
  * [live page](https://tsungtingdu.github.io/heymd)

***

## Author
[tsungtingdu](https://github.com/tsungtingdu) (Tim)

Self-taught and trained in software development knowledge and skills, I am passionate about creating changes through technology.

You can find more about me here:
* [Medium](https://medium.com/tds-note)
* [Profile](https://tsungtingdu.github.io/profile)
* [LinkedIn](https://www.linkedin.com/in/tsung-ting-tu/)
* [Teaching Assistant at ALPHA Camp](https://lighthouse.alphacamp.co/users/3247/ta_profile)
