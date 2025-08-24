function createScheduler(limit) {
    if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("limit must be a positive integer (> 0)");
  }
  const queue = [];
  const results = [];
  let running = 0;
  let i = 0;

  const listeners = {};

  function on(event, handler) {
    if (!listeners[event])
         listeners[event] = [];
    listeners[event].push(handler);
  }

  function emit(event, args1,args2) {
    if (listeners[event]) {
      for (const handler of listeners[event]) {
        handler(args1,args2);
      }
    }
  }

  function addTask(taskFn) {
    queue.push({ taskFn, index: queue.length });
  }

  function run() {
    return new Promise((resolveAll) => {
      


      function nextTask() {
        while (running < limit && i < queue.length) {
          
            const task=queue[i++]
            const fn=task.taskFn;
            const idx=task.index

          running++;
          emit("taskStart", idx + 1); 

          Promise.resolve()
            .then(fn)
            .then(
              (res) => {
                results[idx] = res;
                emit("taskComplete", idx + 1, res);
              },
              (err) => {
                results[idx] = err;
                emit("taskComplete", idx + 1, err);
              }
            )
            .finally(() => {
              running--;
              if (i < queue.length) {
                nextTask();
              } 
              else if (running === 0) {
                emit("done", results);
            
              }
            });
        }
      }

      nextTask();
    });
  }

  return { addTask, run, on };
}
const scheduler = createScheduler(2);
scheduler.on("taskStart", (id) => console.log(`Task ${id} started`));
scheduler.on("taskComplete", (id, result) => console.log(`Task ${id} finished with`, result));
scheduler.on("done", (results) => console.log("All tasks done:", results));
const fakeTask = (id, time, shouldFail = false) => async () => {
 return new Promise((resolve, reject) => {
 setTimeout(() => {
 if (shouldFail) reject(new Error(`Task ${id} failed`));
 else resolve(`Task ${id} completed`);
 }, time);
 });
};
scheduler.addTask(fakeTask(1, 3000));
scheduler.addTask(fakeTask(2, 2000));
scheduler.addTask(fakeTask(3, 1000, true));
scheduler.addTask(fakeTask(4, 1500));
scheduler.run();