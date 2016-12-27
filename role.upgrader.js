var roleHarvester = require('role.harvester');
var respawnManager = require('respawnManager');

var roleUpgrader = {

    withdraw: function(creep) {
        var spawn = Game.spawns['MainSpawn'];

        if (!respawnManager.respawning) {
            var widthdrawResponse = creep.withdraw(spawn, RESOURCE_ENERGY);

            if (widthdrawResponse == OK) {

            } else if (widthdrawResponse == ERR_NOT_ENOUGH_RESOURCES) {

            } else if (widthdrawResponse == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }

            if (_.sum(creep.carry) > 0) {
                creep.memory.mode = "upgrade";
            }
        } else {
            creep.moveTo(spawn);
        }
    },

    upgrade: function(creep) {
        var controller = creep.room.controller;
        var upgradeResponse = creep.upgradeController(controller);

        if(upgradeResponse == OK) {

        } else if (upgradeResponse == ERR_NOT_ENOUGH_RESOURCES) {

        } else if (upgradeResponse == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }

        if (_.sum(creep.carry) == 0) {
            creep.memory.mode = "withdraw";
        }
    },

    run: function(creep) {
        if (creep.memory.mode == undefined) {
            creep.memory.mode = "withdraw";
        }

        if (creep.memory.mode == "withdraw") {
            this.withdraw(creep);
        } else if (creep.memory.mode == "upgrade") {
            this.upgrade(creep);
        } else {
            creep.memory.mode = "upgrade";
        }
	}

};

module.exports = roleUpgrader;