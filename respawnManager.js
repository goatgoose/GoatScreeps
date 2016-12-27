
var DESIRED_CREEP_COUNTS = {
    upgrader: 1,
    harvester: 15,
    builder: 5,
    fixer: 1
};

var respawnManager = {

    respawning: false,

    run: function() {

        // sorted by priority
        var creepCounts = {
            upgrader: 0,
            harvester: 0,
            builder: 0,
            fixer: 0
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
                break;
            }
        }
    }

};

module.exports = respawnManager;