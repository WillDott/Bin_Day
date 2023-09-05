# Bin Day

A very simple bin day notification solution.

Using a AWS SNS queue, lambda, event bridge schedule and 30ish lines of code provides a SMS notifcation of the current bin week.

Uses the following schedule: 
- Odd week = Refuse
- Even week = Recycling 
