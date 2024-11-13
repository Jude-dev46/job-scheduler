# Job Scheduler

A lightweight Node.js job scheduling package to create, run, and manage recurring jobs using intervals. It allows you to schedule tasks, track their statuses, and stop them as needed, all while maintaining state with persistent storage.

## Features

- Schedule tasks with specific intervals
- Persist job state to a JSON file
- Restore jobs upon initialization
- Start, stop, and manage job intervals easily

## Installation

```bash
npm install job-scheduler
```

## Usage

### Basic Setup

```javascript
const Scheduler = require("job-scheduler");

// Initialize scheduler instance
const scheduler = new Scheduler();

// Schedule a new job
scheduler.scheduleJob("greet", 5000, () => console.log("Hello, world!"));

// Run a specific job
scheduler.runJob("greet");

// Stop a running job
scheduler.stopJob("greet");
```

### Scheduling a Job

To schedule a job, use the `scheduleJob` method. Specify a name, interval in milliseconds, and the task (a function) to execute.

```javascript
scheduler.scheduleJob("jobName", interval, () => {
  console.log("Job is running...");
});
```

### Running a Job

The `runJob` method allows you to run a specific job based on its name. Jobs will execute at the specified interval and will persist between sessions.

```javascript
scheduler.runJob("jobName");
```

### Stopping a Job

Use `stopJob` to stop a running job by name. This will clear the interval and update the job status in the persistent JSON file.

```javascript
scheduler.stopJob("jobName");
```

## API Reference

### `scheduleJob(name: string, interval: number, task: Function)`

Schedules a new job.

- `name`: The unique name of the job.
- `interval`: The time in milliseconds between each execution of the task.
- `task`: The function to be executed at each interval.

### `runJob(name: string)`

Runs a job by name if it exists in the schedule.

- `name`: The name of the job to run.

### `stopJob(name: string)`

Stops a running job by clearing its interval and updating its status.

- `name`: The name of the job to stop.

## Persistent Storage

Jobs are saved in a JSON file (`jobs.json`) within the package directory, enabling job restoration upon re-initialization.

## License

This project is licensed under the MIT License.

---
