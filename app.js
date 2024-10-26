const { EventEmitter } = require("events");

class Scheduler extends EventEmitter {
  constructor() {
    super();
    this.jobs = {};
  }

  scheduleJob(name, interval, task) {
    if (this.jobs[name]) {
      console.log(`Job with name ${name} already exists!`);
      return;
    }

    const job = { name, interval, task };
    job.id = setInterval(() => this.runJob(name), interval);
    this.jobs[name] = job;
    this.emit("jobScheduled", job);
    console.log("Job successfully scheduled!");
  }

  runJob(name) {
    const foundJob = this.jobs[name];
    if (foundJob) {
      try {
        this.emit("jobStarted", foundJob);
        foundJob.task();
        this.emit("jobCompleted", foundJob);
      } catch (error) {
        this.emit("jobFailed", foundJob);
        clearInterval(foundJob.intervalId);
      }
    } else {
      const errorMsg = `Could not find job with ${name}`;
      console.log(errorMsg);
      clearInterval();
      return errorMsg;
    }
  }
}

const newScheduler = new Scheduler();
module.exports = newScheduler;
