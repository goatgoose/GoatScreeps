var HARVESTER_COUNT = 2;
var UPGRADER_COUNT = 1;
var BUILDER_COUNT = 1;

var DESIRED_CREEP_COUNTS = {
    harvester: 10,
    upgrader: 1,
    builder: 2
};

var respawnManager = {

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

        for (var creepCount in creepCounts) {
            if (creepCounts[creepCount] < DESIRED_CREEP_COUNTS[creepCount]) {
                Game.spawns['MainSpawn'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: creepCount});
                console.log("creating " + creepCount);
            }
        }
    }

};

module.exports = respawnManager;