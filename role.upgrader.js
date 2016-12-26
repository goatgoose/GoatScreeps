var roleHarvester = require('role.harvester');
var respawnManager = require('respawnManager');

var KEEP_FROM_DOWNGRADING = false;

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = Game.spawns['MainSpawn'];
        var controller = creep.room.controller;

        if (((KEEP_FROM_DOWNGRADING && creep.room.controller.ticksToDowngrade < 2000) || (!KEEP_FROM_DOWNGRADING) && !respawnManager.respawning)) {
            var upgradeResponse = creep.upgradeController(controller);

            if(upgradeResponse == OK) {

            } else if (upgradeResponse == ERR_NOT_ENOUGH_RESOURCES) {
                if (creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            } else if (upgradeResponse == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            roleHarvester.run(creep);
        }



	}
};

module.exports = roleUpgrader;