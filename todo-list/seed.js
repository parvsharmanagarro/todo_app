var statusENUMS={

    ACTIVE: "ACTIVE",
    COMPLETE:"COMPLETE",
    DELETED:"DELETED"
}
var todos={
    1:{title:"learn js",status: statusENUMS.ACTIVE},
    2:{title:"git tutorial",status:statusENUMS.ACTIVE},
    3:{title:"interactive git",status:statusENUMS.ACTIVE},
}
var next_to_do=4;
module.exports={
    statusENUMS:statusENUMS,
    todos:todos,
    next_todo_id: next_to_do
};