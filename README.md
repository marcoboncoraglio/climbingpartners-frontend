# Climbing partners
Application to find climbing partners around you

# TODO

## Frontend

bugs: 
page does not refresh after login or logout

### General
- refactor AppViewProfileCard 

- migrate to react hooks/es6
    - search for every direct call to setState try to replace with useState hook

- migrate to dev-dependencies in frontend

### icons
- icon for brand

### Messages views
- personal messages
- add groups and group chat

### Users
- add img for usr and crop
- implement using something like amazon s3

### Togglemenu
- needs a bit of work, it's hideous

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

### Unit tests
- write unit tests :)

### Bugs
- Default user img not loading, possible failing to load img from google profile

## Backend

### Implement backend
- Get request for all users within a certain range

- It would be nice to move to dynamodb instead of mongodb. Unfortunately I decided to use mongoose and connect passport js directly to mongoose, so it's probably not trivial. Use mongodb from aws for now...
