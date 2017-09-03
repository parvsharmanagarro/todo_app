TODO_APP
==============
Description:
--------------
The Project is a todo list which uses a live object to store todo items. 
The todo items or activity can have 3 states : active,completed or deleted.
With the frontend created using html and css we can easily add new todos or change the state of an existing todo.
Ajax helps us do all these without refreshing or relocating the web page.

**Features Built:**
*Frontend:*
- Different sections to show todos according to their status
- Add a todo item with active status
- Completing or activating a todo with the help of checkbox
- deleting a todo with cross icon
- Hiding or Showing the list of completed and deleted todos
*API Endpoints:* 
- Get api/todos: returns todo object with all items
- DELETE api/todos/:id : sets the status of a todo with given id to delete
- PUT api/todos/:id : modifies title or status
- POST api/todos : adds a new todo with active status
- PUT api/todos/active/:id: sets the status of todo to active
- PUT api/todos/complete/:id :sets the status of todo to complete
- GET api/todos/active: gets all active todos
- GET api/todos/complete: gets all completed todos
- GET api/todos/deleted: gets all deleted todos
Known issues:
"Hide complete items" or "Hide Delete items" button show and work as it is even if there are no completed or deleted items. 
This could be fixed if we are allowed to display some other message during empty state.
Prerequisites:
Nodejs installed on the system with modules installed as given in dependencies in package.json
Running:
on the node terminal in the todo_list directory,
run $node index.js
Tests:
--------------
1. add a todo_item with the use of textbox, it should display in active todos.
2. delete a todo_item by clicking on cross icon, it should now display on deleted todos region.
3. complete or activate a todo_item by use of checkbox.

Built With:
--------------
- Nodejs-environment
- Express Framework-framework used
- AJAX-to make requests.
- Html,CSS- for webpage design
s
Author:
--------------
Parv Sharma

Acknowledgement: 
--------------
Ankit Malik for most of the work.
