var roleHarvester = {

    harvest: function(creep) {
        var source = Game.getObjectById(creep.memory.source);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    },

    dropOff: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });

        // TODO role.distributer that takes energy from storage unity and distributes it everywhere

        if (targets.length > 0) {
            var target = targets[0];

            var transferReturn = creep.transfer(target, RESOURCE_ENERGY);

            if (transferReturn == OK) {

            } else if (transferReturn == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

        // TODO wait at storage unit until free space available to drop off everything
    },

    run: function(creep) {
        if (creep.memory.source == undefined) {
            var sources = creep.room.find(FIND_SOURCES);
            if (sources.length > 0) {
                creep.memory.source = sources[Math.floor(Math.random() * (sources.length))].id;
            }
        }

        if(creep.carry.energy < creep.carryCapacity) {
            this.harvest(creep);
        } else {
            this.dropOff(creep);
        }
	}
};

module.exports = roleHarvester;