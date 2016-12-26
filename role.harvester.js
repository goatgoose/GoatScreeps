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

        if (targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

        // TODO wait at storage unit until free space available to drop off everything
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        //noinspection JSUnnecessarySemicolon,JSUnnecessarySemicolon,JSUnnecessarySemicolon
        if(creep.carry.energy < creep.carryCapacity) {
            this.harvest(creep);
        } else {
            this.dropOff(creep);
        }
	}
};

module.exports = roleHarvester;