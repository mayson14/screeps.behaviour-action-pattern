var mod = {

    getTargetId: function(target){ 
        if(target.name) return target.name;
        return target.id;
    },

    getTargetById: function(id){
        var obj = Game.getObjectById(id);
        if( !obj ) obj = Game.spawns[id];
        return obj;
    },

    isValidTarget: function(target){
        return (target && target.energy && target.energy < target.energyCapacity);
    }, 

    newTarget: function(creep, state){ 
        var target = creep.findClosestByPath(FIND_MY_SPAWNS, {
            filter: function(object){ 
                return object.energy < object.energyCapacity; 
            }
        });

        if( !target ){
            target = creep.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity);
                }
            });
        }

        return target;
    }, 

    step: function(creep, target){    
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }, 

    error: {
        noTarget: function(creep, state){
            if(state.debug) console.log( creep.name + ' > "Can\'t store this energy."');
        }
    }
}


module.exports = mod;