# Climbing partners
Application to find climbing partners around you

# TODO
Look into deploy on aws: frontend S3 buckets, backend AWS-Cli and AWS-SAM, chat https://github.com/aws-samples/simple-websockets-chat-app

## Frontend

Optional: move api requests to actions, store should be the place where we get data, not execute operations 

### General
- refactor AppViewProfileCard / add way to change name

- migrate to dev-dependencies in frontend

- use react router between local login and register to avoid page reloading

### icons
- icon for brand

### Messages views
- personal messages
- add groups and group chat

### Users
- add img for usr and crop
- implement using something like amazon s3

### Settings
- implement privacy store that handles visibility
- Add privacy field in locations database
    - to handle whether a user can be seen

### Find Partners View
- view that shows icons of climbers in your area as listview
    - like friendsview, just for climbers around you

### Map
- change functionality to be more of a visualization tool
    - create circles around areas with many climbers with caption x number of climbers in this circle
    - allow the display of posts

### Posts/Events
- allow users to create posts on the map (visibility in settings) that represent climbing trips where people can join

## Backend

### Implement backend
- Get request for all users within a certain range

