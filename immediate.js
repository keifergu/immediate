(function(global) {
    var realTimeout = global.setTimeout;

    function TaskQueue() {
        this.queue = {
            micro: [],
            macro: [],
        };
        this._timeoutid = undefined;
    }

    Object.assign(TaskQueue.prototype, {
        runner: function() {
            console.log('i am run');
            var micro = this.queue.micro;
            var macro = this.queutae.macro;
            if (micro.length > 0) micro.shift().call(null);
            else if (macro.length > 0) macro.shift().call(null);
            else return;
            return this.runner();
        },
        run: function(task, priority) {
            console.log(this);
            this.queue[priority].push(task);
            if (this._timeoutid) return;
            else this._timeoutid = realTimeout(this.runnner, 0);
        },
        setTimeout: function(task) {
            return this.run(task, 'macro');
        },
        immediate: function(task) {
            return this.run(task, 'micro');
        }
    })

    var taskQueue = new TaskQueue();
    global.setTimeout = function(task) {
        return taskQueue.setTimeout(task);
    }
    global.immediate = function(task) {
        return taskQueue.immediate(task);
    }
})(window)