var HARVESTER_COUNT = 2;
var UPGRADER_COUNT = 1;
var BUILDER_COUNT = 1;

var DESIRED_CREEP_COUNTS = {
    harvester: 10,
    upgrader: 0,
    builder: 0
};

var respawnManager = {

    respawning: false,

    run: function() {
        var creepCounts = {
            harvester: 0,
            upgrader: 0,
            builder: 0
        };

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            creepCounts[creep.memory.role] += 1;
        }

        this.respawning = false;

        for (var creepCount in creepCounts) {
            if (creepCounts[creepCount] < DESIRED_CREEP_COUNTS[creepCount]) {
                this.respawning = true;
                Game.spawns['MainSpawn'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: creepCount});
                console.log("creating " + creepCount);
            }
        }
    }

};

module.exports = respawnManager;