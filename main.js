var creepManager = require('creepManager');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        creepManager.run(creep);
    }
    
};