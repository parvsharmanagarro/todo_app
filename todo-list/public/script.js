const RESPONSE_DONE=4;
const STATUS_OK=200;
var hide_obj={                                          //this object is used to define "hide complete" and "hide delete" features
    1:{div:"completed_todos",
    hide:false,
    eventhandler:"hideShowComplete",
    button_div:"hide_complete",
    message:"completed tasks"},
    2:{div:"deleted_todos",
        hide:false,
        eventhandler:"hideShowDelete",
    button_div:"hide_deleted",
    message:"deleted tasks"}
};
window.onload=getTodosAJAX();
//function to append elements on dom
function append(id,todo_json)
{var todos=JSON.parse(todo_json);
    var parent=document.getElementById(id);
    parent.innerHTML="";
    if(parent)
    {
        Object.keys(todos).forEach(
            function(key)
            {
                var todo_element=createTodoElement(key,todos[key]);
                parent.appendChild(todo_element);
            }
        )
    }
}
//creates elements to be appended
function createTodoElement(id,todo_object)
{
    var todo_element=document.createElement("div");
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","todoStatus"+todo_object.status);
    var text=document.createTextNode(todo_object.title);
    if(todo_object.status=='ACTIVE')
    {
        var complete_check=document.createElement("INPUT");
        complete_check.setAttribute("type","checkbox")
        complete_check.setAttribute("onclick","completeTodoAJAX("+id+")");
        complete_check.setAttribute("class", "check");
        todo_element.appendChild(complete_check);

    }
    if(todo_object.status=='COMPLETE')
    {
        var active_check=document.createElement("INPUT");
        active_check.setAttribute("type","checkbox");
        //complete_button.innerText="Mark as complete";
        active_check.checked=true;
        active_check.setAttribute("onclick","activeTodoAJAX("+id+")");
        active_check.setAttribute("class", "check");
        todo_element.appendChild(active_check);

    }
    todo_element.appendChild(text);
    if(todo_object.status=='ACTIVE' ||todo_object.status=='COMPLETE')
    {
        var delete_button=document.createElement("button");
        var cross=document.createTextNode('\u274c');
        //delete_button.innerText="Mark as delete";
        delete_button.appendChild(cross);
        delete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class","center");
        todo_element.appendChild(delete_button);

    }
    return todo_element;
}
//to change a todostatus from complete to active
function activeTodoAJAX(id)
{
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/active/"+id,true);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {console.log(xhr.responseText);
                getTodosAJAX();
                //append('completed_todos',xhr.responseText);
            }
        }

    }
    xhr.send(data);
}
//to change status from active to complete
function completeTodoAJAX(id)
{
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="todo_status=COMPLETE";
    xhr.onreadystatechange=function () {
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {console.log(xhr.responseText);
            getTodosAJAX();
                //append('completed_todos',xhr.responseText);
            }
        }

    }
    xhr.send(data);
}
//to change status to delete
function deleteTodoAJAX(id)
{
    var xhr=new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id,true);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {
               console.log(xhr.responseText);
                //append('deleted_todos', xhr.responseText);
                getTodosAJAX();
            }
        }

    }
    xhr.send(data=null);
}
//to show deleted todos
function showDeletedTodosAJAX()
{ var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos/deleted",true);
    xhr.onreadystatechange=function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                console.log("aaa"+xhr.responseText);
                append('deleted_todos', xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
//to show completed todos on their respective area
function showCompletedTodosAJAX()
{ var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos/complete",true);
    xhr.onreadystatechange=function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                console.log(xhr.responseText);
                append('completed_todos', xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
//to show active todos on the active region
function showActiveTodosAJAX()
{var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos/active",true);
    xhr.onreadystatechange=function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                console.log(xhr.responseText);
                append('active_todos', xhr.responseText);
            }
        }
    }
    xhr.send(data=null);

}
//event handler for hide/show complete
function hideShowComplete() {
    hide_obj[1].hide = !hide_obj[1].hide;
    if (hide_obj[1].hide) {
        document.getElementById(hide_obj[1].div).innerHTML = "";
        document.getElementById("b1").innerHTML="show "+hide_obj[1].message;
    }
    else {
        showCompletedTodosAJAX();
        document.getElementById("b1").innerHTML="hide "+hide_obj[1].message;
    }
}
//event handler for hide/show delete
function hideShowDelete()
{
    hide_obj[2].hide=!hide_obj[2].hide;
    if(hide_obj[2].hide) {
        document.getElementById(hide_obj[2].div).innerHTML = "";
        document.getElementById("b2").innerHTML="show "+hide_obj[2].message;
    }
    else {
        showDeletedTodosAJAX();
        document.getElementById("b2").innerHTML="hide "+hide_obj[2].message;
    }
}
//to create and show the hide/show buttons
function showMisc()
{
    for(var i in hide_obj)
    {
        var b_div=document.getElementById(hide_obj[i].button_div);
        b_div.innerHTML="";
        var hide_show=document.createElement("a");
        if(!hide_obj[i].hide)
            hide_show.innerHTML="hide "+hide_obj[i].message;
        console.log(hide_obj[i].div+" "+hide_obj[i].eventhandler);
        hide_show.setAttribute("onclick",hide_obj[i].eventhandler+"()");
        hide_show.setAttribute("id","b"+i);
        b_div.appendChild(hide_show);
    }
}//function which is invoked on load
function getTodosAJAX()
{               showMisc();
                showActiveTodosAJAX();
                showCompletedTodosAJAX();
                showDeletedTodosAJAX();

}
//to add an item with active status
function addTodoAJAX()
{
    var title=document.getElementById("new_todo").value;
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/todos", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="todo_title="+encodeURI(title);
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==RESPONSE_DONE){
            if(xhr.status==STATUS_OK)
            {console.log(xhr.responseText);
                showActiveTodosAJAX();
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}