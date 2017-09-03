var express=require("express");
var app=express();
var  todo_db=require("./seed.js");
var bodyparser=require("body-parser");
app.use("/",bodyparser.urlencoded({ extended: false }));
app.use("/",express.static(__dirname+"/public"));
//console.log(todo_db);


app.listen(4000);
app.get("/api/todos",function(req,res)
{
    res.json(todo_db.todos);
});
app.delete("/api/todos/:id",function(req,res)
{
   var id_del=req.params.id;
   var todo=todo_db.todos[id_del];
   if(!todo)
   {
       res.status(400).json({error:"todo doesnt exist"});
   }
   else
   {
       todo.status=todo_db.statusENUMS.DELETED;
       res.json(todo_db.todos);
   }
});//to add a new item
app.post("/api/todos",function(req,res)
{
var todo=req.body.todo_title;
if(!todo || todo=="" || todo.trim()=="")
{
    res.status(400).json({error:"title cant be empty"});
}
else
{
    var new_todo_object={
        title: req.body.todo_title,
        status: todo_db.statusENUMS.ACTIVE
    }
    todo_db.todos[todo_db.next_todo_id]=new_todo_object;
    todo_db.next_todo_id++;
    res.json(todo_db.todos);
}
});//to show all active todos
app.get("/api/todos/active",function(req,res)
{
   var todo_obj=todo_db.todos;
   var active={};
   for(var i in todo_obj)
   {
       if(todo_obj[i].status==todo_db.statusENUMS.ACTIVE)
           active[i]=todo_obj[i];
   }
  res.json(active);
});// to show all deleted todos
app.get("/api/todos/deleted",function(req,res)
{
    var todo_obj=todo_db.todos;
    var deleted={};
    for(var i in todo_obj)
    {
        if(todo_obj[i].status==todo_db.statusENUMS.DELETED)
            deleted[i]=todo_obj[i];
    }
    res.json(deleted);
});// to show all complete todos
app.get("/api/todos/complete",function(req,res)
{
    var todo_obj=todo_db.todos;
    var complete={};
    for(var i in todo_obj)
    {
        if(todo_obj[i].status==todo_db.statusENUMS.COMPLETE)
            complete[i]=todo_obj[i];
    }
    res.json(complete);
});//to change status to complete
app.put("/api/todos/complete/:id",function(req,res)
{
    var mod_id=req.params.id;
    var todo=todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"todo doesnt exist,cant modify it"});
    }
    else
    {todo.status=todo_db.statusENUMS.COMPLETE;
    res.json(todo_db.todos);
    }
});//to change status of an item to active
app.put("/api/todos/active/:id",function(req,res)
{
    var mod_id=req.params.id;
    var todo=todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"todo doesnt exist,cant modify it"});
    }
    else
    {todo.status=todo_db.statusENUMS.ACTIVE;
        res.json(todo_db.todos);
    }
});// updating or modifying todos
app.put("/api/todos/:id",function(req,res)
{
 var mod_id=req.params.id;
    var todo=todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"todo doesnt exist,cant modify it"});
    }
    else
    {var todo_title=req.body.todo_title;
      if(todo_title && todo_title!="" && todo_title.trim()!="")
      {
         todo.title=todo_title;
      }
      var todo_status=req.body.todo_status;
      if(todo_status && (todo_status==todo_db.statusENUMS.ACTIVE || todo_status==todo_db.statusENUMS.COMPLETE))
      {
          todo.status=todo_status;
      }
      res.json(todo_db.todos);
    }

});
