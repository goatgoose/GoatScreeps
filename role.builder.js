var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

		if (targets.length > 0) {
			if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0]);
			}
		}

	}
};

module.exports = roleBuilder;