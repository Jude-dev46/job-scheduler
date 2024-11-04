const { EventEmitter } = require("events");
const fs = require("fs");
const path = require("path");

class Scheduler extends EventEmitter {
  constructor() {
    super();
    this.error = "";
    this.jobsFilePath = path.join(__dirname, "jobs.json");
    this.jobs = this.#loadJobsFromFile();
  }

  #generateRandomId() {
    const randomNo = Math.floor(Math.random() * 9000000);
    return randomNo;
  }

  //Save job to the file
  #saveJobsToFile() {
    const jobsToSave = this.jobs.map((job) => ({
      name: job.name,
      interval: job.interval,
      intervalId: job.intervalId,
      status: job.status,
      task: job.task.toString(),
    }));

    fs.writeFileSync(this.jobsFilePath, JSON.stringify(jobsToSave, null, 2));
  }

  //Load job from file with interval
  #loadJobsFromFile() {
    if (fs.existsSync(this.jobsFilePath)) {
      const jobsData = JSON.parse(fs.readFileSync(this.jobsFilePath, "utf-8"));
      return jobsData.map((job) => ({
        ...job,
        task: eval(`(${job.task})`),
      }));
    }
    return [];
  }

  //Delete a scheduled job
  deleteScheduledJob(name) {
    const availableJobs = this.#loadJobsFromFile();
    const foundJob = availableJobs.find((job) => job.name === name);
    if (!foundJob) {
      this.error = `Job with name ${name} does not exists!`;
      console.log(this.error);
      return this.error;
    }

    //filter job, removing the specified job
    const filteredJob = availableJobs.filter(
      (job) => job.name !== foundJob.name
    );
    fs.writeFileSync(this.jobsFilePath, JSON.stringify(filteredJob, null, 2));
    const result = `Job with ${name} deleted!`;

    return result;
  }

  // Schedule job to run at specified interval
  scheduleJob(name, interval, task) {
    const availableJobs = this.#loadJobsFromFile();
    const foundJob = availableJobs.find((job) => job.name === name);
    if (foundJob) {
      this.error = `Job with name ${name} already exists!`;
      console.log(this.error);
      return this.error;
    }

    // Create and push new job to the array
    const job = { name, interval, task, status: "waiting" };
    this.jobs.push(job);

    this.#saveJobsToFile();
    this.emit("jobScheduled", job);
    console.log("Job successfully scheduled!");
  }

  // Run job with specified name
  runJob(name) {
    const foundJob = this.jobs.find((job) => job.name === name);

    if (foundJob) {
      try {
        // Set the interval and ensure the correct `this` context
        const intervalId = setInterval(() => {
          foundJob.task();
        }, foundJob.interval);

        foundJob.intervalId = intervalId.toString();

        // Immediately update status and save
        foundJob.status = "running";
        this.#saveJobsToFile();

        this.emit("jobStarted", foundJob);
      } catch (error) {
        this.emit("jobFailed", foundJob);
        clearInterval(foundJob.intervalId);
      }
    } else {
      console.log(`Could not find job with name ${name}`);
    }
  }

  // stopJob(name) {
  //   const foundJob = this.jobs.find((job) => job.name === name);

  //   if (foundJob && foundJob.status === "running" && foundJob.intervalId) {
  //     console.log(foundJob.intervalId);
  //     const intervalId = JSON.parse(foundJob.intervalId);
  //     console.log(intervalId);
  //     clearInterval(foundJob.intervalId); // Clear the interval
  //     foundJob.status = "stopped"; // Update status
  //     delete foundJob.intervalId; // Remove intervalId
  //     this.saveJobsToFile(); // Save the updated job status

  //     console.log(`Job ${name} stopped successfully.`);
  //   } else {
  //     console.log(`No running job found with name ${name}.`);
  //   }
  // }
}

const newScheduler = new Scheduler();
module.exports = newScheduler;
