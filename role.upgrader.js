
var KEEP_FROM_DOWNGRADING = true;

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = Game.spawns['MainSpawn'];
        var controller = creep.room.controller;

        var upgradeResponse = creep.upgradeController(controller);

        if(upgradeResponse == OK) {

        } else if (upgradeResponse == ERR_NOT_ENOUGH_RESOURCES) {
            if ((KEEP_FROM_DOWNGRADING && creep.room.controller.ticksToDowngrade < 1000) || !KEEP_FROM_DOWNGRADING) {
                if (creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            }
        } else if (upgradeResponse == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }

	}
};

module.exports = roleUpgrader;