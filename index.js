const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 9000;

// a660b1e2-aade-4875-a2b6-d5ea2a7fd180
// hsshoquz
// balram_job
// rFzGWa52gQ5EHjjq
// Connect to MongoDB Atlas (replace the connection string with your own)
const MONGODB_URI = 'mongodb+srv://balram_job:rFzGWa52gQ5EHjjq@cluster0.ykxdiog.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a job schema
const jobSchema = new mongoose.Schema({
  name: String,
  location: String,
  posted: String,
  status: String,
  applied: Number,
  jobViews: Number,
  daysLeft: Number,
  premium: Boolean,
  dateFormat: String,
});

// Create a job model based on the schema
const Job = mongoose.model('Job', jobSchema);

app.use(bodyParser.json());

// POST endpoint for creating a new job entry
app.post('/api/jobs/create', async (req, res) => {
  const newJobData = req.body;
  try {
    const createdJob = await Job.create(newJobData);
    res.status(201).json(createdJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the job entry' });
  }
});

// GET endpoint to retrieve all job data
app.get('/api/jobs', async (req, res) => {
  try {
    const allJobs = await Job.find();
    res.json(allJobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get job data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
