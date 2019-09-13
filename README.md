# Climbing partners
Application to find climbing partners around you

# TODO

### icons
- icon for brand

### Implement backend
- Get request for all users within a certain range
- Eventually reimplement entire backend with node, express and mongoose

### Messages
- personal messages
- add groups and group chat

### Users
- add img for usr and crop somehow?
- implement settings backend (without checking for radius yet)

### Friends
- add friendship pending state as separate database

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

### Posts
- allow users to create posts on the map (visibility in settings) that represent climbing trips where people can join

### Unit tests
- write unit tests :)

### Bugs
- refactor really ugly AppViewProfileCard code :(
- FriendsView, one element over "Your Friends", no element under "Your Friends". Navigate to element over "Your Friends" and go back. Element under "Your Friend" appears ( Adding suspense will probably take care of this bug )

