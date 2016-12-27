var roleBuilder = require('role.builder');
var respawnManager = require('respawnManager');

var roleFixer = {

    withdraw: function (creep) {
        var spawn = Game.spawns['MainSpawn'];

        if (!respawnManager.respawning) {
            var widthdrawResponse = creep.withdraw(spawn, RESOURCE_ENERGY);

            if (widthdrawResponse == OK) {

            } else if (widthdrawResponse == ERR_NOT_ENOUGH_RESOURCES) {

            } else if (widthdrawResponse == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }

            if (_.sum(creep.carry) == creep.carryCapacity) {
                creep.memory.mode = "repair";
            }
        }
    },

    repair: function(creep) {
        var damagedStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            }
        });

        if (damagedStructures.length > 0) {

            var structure = damagedStructures[0];
            var repairReturn = creep.repair(structure);

            if (repairReturn == OK) {

            } else if (repairReturn == ERR_NOT_ENOUGH_RESOURCES) {

            } else if (repairReturn == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }

        if (_.sum(creep.carry) == 0) {
            creep.memory.mode = "withdraw";
        }
    },

    run: function(creep) {
        if (creep.memory.mode == undefined) {
            creep.memory.mode = "repair";
        }

        if (creep.memory.mode == "withdraw") {
            this.withdraw(creep);
        } else if (creep.memory.mode == "repair") {
            this.repair(creep);
        } else {
            creep.memory.mode = "repair";
        }
    }

};

module.exports = roleFixer;