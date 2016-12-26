var roleHarvester = {

    /** @param {Creep} creep **/
    harvest: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);

        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },

    /** @param {Creep} creep **/
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

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            this.harvest(creep);
        } else {
            this.dropOff(creep);
        }
	}
};

module.exports = roleHarvester;