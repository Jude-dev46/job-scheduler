const Scheduler = require("../app");

Scheduler.once("scheduleJob", () => {
  Scheduler.scheduleJob("Message", 1000, () =>
    console.log("Good morning dear Jude!")
  );
});
Scheduler.once("scheduleMeeting", () => {
  Scheduler.scheduleJob("Message", 1000, () =>
    console.log("We have a meeting by 4pm!")
  );
  Scheduler.scheduleJob("Message", 1000, () =>
    console.log("Kindly join us promptly!")
  );
});

Scheduler.emit("scheduleJob");
Scheduler.emit("scheduleMeeting");
