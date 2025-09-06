⚡ Custom Event Scheduler (Concurrency Control)
🚀 Project Setup

Clone/download the project files.

Open main.js in your editor.

Run with Node.js:

node main.js


This will execute the demo with sample tasks.

✨ Features Implemented

Concurrency Control
Scheduler runs only a limited number of tasks concurrently, controlled by limit
.

Task Queue
addTask(taskFn) queues async functions, preserving their insertion order
.

Run Execution
run() starts processing tasks, launching at most limit tasks at once until the queue finishes
.

Event System

taskStart: emitted when a task begins.

taskComplete: emitted when a task finishes (success or failure).

done: emitted when all tasks complete
.

Error Handling
Failures are caught, logged, and included in the final results array without breaking execution
.

Demo with Fake Tasks
Includes simulated tasks using setTimeout, demonstrating concurrency, success, and error cases
.

🛠️ Decisions Made

Styling Choice
Since this is a backend/logic-heavy task, no UI styling was added. Focus was placed on clarity of code and output in the console.

Component Structure

createScheduler(limit): Core factory function returning { addTask, run, on }.

on(event, handler) and emit(event, ...args): Simple custom event emitter system.

main.js: Demo setup with test tasks and event listeners
.

Implementation Decisions

Used Promise.resolve().then(fn) to normalize task execution whether taskFn is async or sync.

Results array indexed by task order ensures final output preserves submission order.

Chose plain JavaScript (no frameworks) for transparency and learning value.

👉 This project demonstrates asynchronous programming, concurrency management, closures, custom event handling, and error management in vanilla JavaScript.
