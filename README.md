# Climbing partners
Application to find climbing partners around you

# TODO

## Frontend

### General
- refactor out database logic from stores to services to which stores hold a reference to
- refactor AppViewProfileCard 
- migrate to react suspense
    - https://www.youtube.com/watch?v=SCQgE4mTnjU&list=LLE6fjBTUKY1ovpgW8szLOcQ&index=7&t=0s

- migrate to react hooks
    - search for every direct call to setState try to replace with useState hook

- migrate to dev-dependencies in frontend

### icons
- icon for brand

### Messages views
- personal messages
- add groups and group chat

### Users
- add img for usr and crop
    - add img: https://www.youtube.com/watch?v=XeiOnkEI7XI&list=LLE6fjBTUKY1ovpgW8szLOcQ&index=3&t=404s 
    - crop: https://github.com/DominicTobias/react-image-crop 

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
