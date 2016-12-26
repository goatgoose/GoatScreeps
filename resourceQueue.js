
var resourceQueue = {

    run: function(container) {
        if (container.memory.queue == undefined) {
            container.memory.queue = [];
        }

        if (container.memory.queue.length > 0) {
            var nextRequest = container.memory.queue[0];

            var withdrawReturn = Game.getObjectById(nextRequest.creepId).withdraw(container, nextRequest.resource);
            nextRequest.callback(withdrawReturn);

            if (withdrawReturn == OK) {
                container.memory.queue.shift();
            }
        }
    },

    request: function(container, creep, resource, importance, callback) {
        var requestObj = {
            creepId: creep.id,
            resource: resource,
            importance: importance,
            callback: callback
        };

        container.memory.queue.push(requestObj);

        container.memory.queue.sort(function (a, b) {
            if (a.importance < b.importance) {
                return -1;
            } else {
                return 1;
            }
        });
    }
};

module.exports = resourceQueue;