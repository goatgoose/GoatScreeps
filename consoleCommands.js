
var consoleCommands = {

    creepCount: function() {

        var creepCounts = {};

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creepCounts[creep.memory.role] == undefined) {
                creepCounts[creep.memory.role] = 0;
            }

            creepCounts[creep.memory.role] += 1;
        }

        for (var creepCount in creepCounts) {
            console.log(creepCount + ": " + creepCounts[creepCount]);
        }

        return 0;

    }

};

module.exports = consoleCommands;