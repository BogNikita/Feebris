# Feebris Take Home Exercise

Thank you for taking the time to do our technical test. The purpose of this test is to challenge your development skills. We expect you to demonstrate your ability to develop, test and deliver robust code.

The exercise is designed with several tasks of increasing difficulty. Please don't worry if you don't reach completion of all the tasks within the time allotted. We use the same exercise for all seniorities of developers.

Please don't publish your solution as a public repository, but submit your code as a zip via Google Drive or any file sharing service and email us the link.

### Description

The Feebris product helps carers perform medical checkups of elderly patients that reside in care homes. We would like you to design a basic React Native mobile app for navigating our patients and analysing their Feebris checkups.

### Terminology

- Care home: A facility where several elderly residents live together. These institutions have staff who perform various types of assistance and care.
- Patient: An elderly resident of a Care Home.
- Checkup: A record of health measurements and readings taken for a Patient.
- GP Practice: The office or location of a general practitioner doctor. Most Patients will be assigned to a particular GP, sometimes multiple GP's.
- [Pulse Oximeter](https://en.wikipedia.org/wiki/Pulse_oximetry): A medical device used to determine blood oxygen levels in a Patient.
- [SPO2](<https://en.wikipedia.org/wiki/Oxygen_saturation_(medicine)>): Peripheral blood oxygen saturation. A pulse oximeter will produce a SPO2 readings (many per second).

### Tasks

1. In the first screen of the app render a list of Care Homes. This will be the Care Homes view (see `care-homes-screen.png`, yours might look different or with different data though!).

1. Add another view to display the patients inside each care home. This will be the Patients view.

1. Adjust the Patients view such that next to each patient is a list of which GP practices are assigned to that patient.

1. Add another view to display the patient's name and a list of their checkups, link to this from the Patients view. This will be the Checkups view.

1. Adjust the Checkups view. Next to each checkup display the mean (average) of the SPO2 value of the latest pulse oximeter measurement. Do not display this if checkup has no pulse oximeter measurements.

1. Adjust the checkups view to include an additional normalized SPO2 average. The rules for normalising are: for any parts of the graph with SPO2 value less than 80 or greater than 100 (i.e. outside normal range), replace those with an average of the nearest preceding 5 seconds of values that are not outside-normal-range. If this occurs at the start of the signal, use the overall signal average of values not outside-normal range.

> Note: The TIMESTAMP key in the pulse oximeter measurements is the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC

### Files

Patients and related entities are provided in the `data/` directory. These files are also available from the following public endpoint: https://feebris-technical-exercise.s3.eu-west-2.amazonaws.com/. Please treat these as API endpoints for the purpose of this exercise, of course a more realistic situation would have the data provided by a real API.

For later tasks there are pulse oximeter signal captures in the `data/pulseox/` directory both in csv and json format, and also available in https://feebris-technical-exercise.s3.eu-west-2.amazonaws.com/pulseox/.

### What we are looking for

- Code quality
- Good testing practice
- Completion of tasks

### Task requirements

- You can choose to test/run the exercise in Android or iOS, you don't need to do both
- Feel free to use whatever frameworks / libraries / packages you like
- Please avoid including artifacts from your local build in your final zip file (eg: node_modules)
- Please send instructions on how to run your solution
