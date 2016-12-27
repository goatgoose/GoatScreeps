var roleHarvester = {

    harvest: function(creep) {
        var source = Game.getObjectById(creep.memory.source);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

        if (_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.mode = "give";
        }
    },

    dropOff: function(creep) {

        // TODO role.distributer that takes energy from storage unity and distributes it everywhere

        var spawn = Game.spawns['MainSpawn'];

        var transferReturn = creep.transfer(spawn, RESOURCE_ENERGY);

        if (transferReturn == OK) {

        } else if (transferReturn == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }

        if (_.sum(creep.carry) == 0) {
            creep.memory.mode = "harvest";
        }
    },

    run: function(creep) {
        if (creep.memory.source == undefined) {
            var sources = creep.room.find(FIND_SOURCES);
            if (sources.length > 0) {
                creep.memory.source = sources[Math.floor(Math.random() * (sources.length))].id;
            }
        }
        if (creep.memory.mode == undefined) {
            creep.memory.mode = "harvest";
        }

        if(creep.memory.mode == "harvest") {
            this.harvest(creep);
        } else if (creep.memory.mode == "give") {
            this.dropOff(creep);
        } else {
            creep.memory.mode = "harvest";
        }
	}
};

module.exports = roleHarvester;