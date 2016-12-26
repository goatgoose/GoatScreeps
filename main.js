var creepManager = require('creepManager');
var respawnManager = require('respawnManager');

module.exports.loop = function () {

    // TODO
    // priority queue for energy withdrawal

    respawnManager.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        creepManager.run(creep);
    }
    
};