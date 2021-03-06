let action = new Creep.Action('recycling');
module.exports = action;
action.isValidAction = () => true;
action.isAddableAction = () => true;
action.isAddableTarget = () => true;
action.newTarget = function(creep){
    let target = null;
    if( creep.room.my && creep.room.structures.spawns.length > 0 ) {
        // return nearest spawn
        target = creep.pos.findClosestByRange(creep.room.structures.spawns);
    } 
    if( target == null ){
        // go to home spawn
        target = Game.spawns[creep.data.motherSpawn];
    }
    return target;
};
action.work = function(creep){
    creep.target.recycleCreep(creep);
};
action.onAssignment = function(creep, target) {
    if( SAY_ASSIGNMENT ) creep.say(ACTION_SAY.RECYCLING, SAY_PUBLIC);
};
