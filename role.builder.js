var respawnManager = require('respawnManager');
var roleHarvester = require('role.harvester');

var REPAIR_LOWER_THAN = 80; // %

var roleBuilder = {

    withdraw: function(creep) {
        var spawn = Game.spawns['MainSpawn'];

        if (!respawnManager.respawning) {
            var widthdrawResponse = creep.withdraw(spawn, RESOURCE_ENERGY);

            if (widthdrawResponse == OK) {

            } else if (widthdrawResponse == ERR_NOT_ENOUGH_RESOURCES) {

            } else if (widthdrawResponse == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }

            if (_.sum(creep.carry) == creep.carryCapacity) {
                if (creep.memory.repair == undefined) {
                    creep.memory.mode = "build";
                } else {
                    creep.memory.mode = "repair";
                }
            }
        }
    },

    build: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (targets.length > 0) {
            if (!respawnManager.respawning) {
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
    },

    repair: function(creep) {
        if (creep.memory.repair == undefined) {
            creep.memory.mode = "build";
            return;
        }

        var structure = Game.getObjectById(creep.memory.repair);
        var repairReturn = creep.repair(structure);

        if (repairReturn == OK) {

        } else if (repairReturn == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.mode = "withdraw";
        } else if (repairReturn == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }

        if (structure.hits == structure.hitsMax) {
            creep.memory.repair = undefined;
            creep.memory.mode = "build";
        }
    },

    run: function(creep) {
        if (creep.memory.mode == undefined) {
            creep.memory.mode = "withdraw";
        }

        if (creep.memory.mode == "withdraw") {
            this.withdraw(creep);
        } else if (creep.memory.mode == "build") {
            var damagedStructures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.maxHits * (REPAIR_LOWER_THAN / 100);
                }
            });

            if (damagedStructures.length > 0) {
                creep.memory.repair = damagedStructures[0].id;
                this.repair(creep);
            } else {
                this.build(creep);
            }
        } else if (creep.memory.mode = "repair") {
            this.repair(creep);
        } else {
            creep.memory.mode = "withdraw";
        }
	}

};

module.exports = roleBuilder;