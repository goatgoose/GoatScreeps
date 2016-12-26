var respawnManager = require('respawnManager');
var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

		if (targets.length > 0) {

            /*
             var container = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
             filter: (structure) => {
             return structure.structureType == STRUCTURE_STORAGE;
             }
             });
             */

            var container = Game.spawns['MainSpawn']; // temp

            if (container != null && !respawnManager.respawning) {
                if (creep.memory.mode == undefined) {
                    creep.memory.mode = "withdraw";
                }

                if (creep.memory.mode == "withdraw") { // withdraw mode
                    var widthdrawResponse = creep.withdraw(container, RESOURCE_ENERGY);

                    if (widthdrawResponse == OK) {

                    } else if (widthdrawResponse == ERR_NOT_ENOUGH_RESOURCES) {

                    } else if (widthdrawResponse == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }

                    if (_.sum(creep.carry) == creep.carryCapacity) {
                        creep.memory.mode = "build";
                    }
                } else { // build mode
                    var buildResponse = creep.build(targets[0]);

                    if (buildResponse == OK) {

                    } else if (buildResponse == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }

                    if (_.sum(creep.carry) == 0) {
                        creep.memory.mode = "withdraw";
                    }
                }
            } else {
                //roleHarvester.run(creep);
            }


		}

	}
};

module.exports = roleBuilder;