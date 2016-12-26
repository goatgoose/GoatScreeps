var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

		if (targets.length > 0) {
			var buildResponse = creep.build(targets[0]);

			if (buildResponse == OK) {

			} else if (buildResponse == ERR_NOT_ENOUGH_RESOURCES) {
				/*
				var container = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_STORAGE;
					}
				});
				*/

				var container = Game.spawns['MainSpawn']; // temp

				if (container != null) {
					if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						//creep.moveTo(container);
					}
				}

			} else if (buildResponse == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0]);
			}
		}

	}
};

module.exports = roleBuilder;