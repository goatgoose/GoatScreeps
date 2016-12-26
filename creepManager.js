var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var creepManager = {

    /** param {Creep} creep { **/
    run: function(creep) {
        if (creep.ticksToLive < 400) {
            creep.memory.renewing = true;
        }

        if (creep.memory.renewing) {
            var spawn = Game.spawns['MainSpawn'];
            if (spawn.renewCreep(creep) != OK) {
                creep.moveTo(spawn);
            }

            if (creep.ticksToLive > 1940) {
                creep.memory.renewing = false;
            }

            // TODO reapply boosts
            // TODO renew at base if not enough time left to do task
        } else {

            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }

};

module.exports = creepManager;