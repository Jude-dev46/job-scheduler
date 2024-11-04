const Scheduler = require("job-scheduler");
// const Scheduler = require("../app");

Scheduler.on("scheduleJob", () => {
  Scheduler.scheduleJob("task", 3000, () =>
    console.log("Good afternoon dear Jude!")
  );
});

// Scheduler.emit("scheduleJob");
// Scheduler.runJob("meeting");
// Scheduler.deleteScheduledJob("meeting1");
