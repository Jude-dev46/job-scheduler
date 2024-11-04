const Scheduler = require("job-scheduler");
// const Scheduler = require("../app");

Scheduler.on("scheduleJob", () => {
  Scheduler.scheduleJob("task", 3000, () =>
    console.log("Good afternoon dear Jude!")
  );
  Scheduler.scheduleJob("meeting", 10000, () =>
    console.log("Meeting is ongoing!")
  );
  Scheduler.scheduleJob("meeting1", 15000, () =>
    console.log("Meeting ending soon!")
  );
});

// Scheduler.emit("scheduleJob");
// Scheduler.runJob("meeting");
// Scheduler.deleteScheduledJob("meeting1");
