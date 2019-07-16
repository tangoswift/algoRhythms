# algoRhythms

## Team Members

* [Jason Cho](https://github.com/cho-jason)
* [Jorge Acosta](https://github.com/JorgeAcostaDLP)
* [Sidharth Nambiar](https://github.com/SidharthNambiar)
* [Feng Jiang](https://github.com/fjiang91)

## Intro

Coming from Fullstack Academy of Code, pair programming was heavily emphasized to give us two perspectives on a single problem. We believe that this helped us become better programmers which is why we developed **algoRhythms**, a web application to enable two coders to pair program remotely.

## Our Application

### Creating a New Room

After a user creates an account or logs into **algoRhythms**, they are are presented a choice of pairing up with a coding partner in an existing room or creating a new room by selecting a new problem to solve.

In the image below, no existing rooms are available so a new room was created. The user cannot type in the code editor until the room is paired with another coding partner

![Rooms](https://firebasestorage.googleapis.com/v0/b/algorhythms1904.appspot.com/o/ReadMe%20Images%2Frooms.gif?alt=media&token=1a7421b9-ced6-48a0-8457-5d1a4bb1f697)

### Pairing Up

To be paired up in an existing room, simply click on an existing room. Now that the room is paired up, the users will be presented with a start button to begin solving the problem

![Pairing Up](https://firebasestorage.googleapis.com/v0/b/algorhythms1904.appspot.com/o/ReadMe%20Images%2Fpairing.gif?alt=media&token=ac1f7e08-3858-4278-ab0e-15366ddc84f5)

### Starting Video Conference

To start a video conference, simply click "Click to Start Video Chat"

![Video Conference](https://firebasestorage.googleapis.com/v0/b/algorhythms1904.appspot.com/o/ReadMe%20Images%2Fvideo.gif?alt=media&token=0b6d16c0-2094-426a-a03d-8b660fed53a6)

### Solving a Problem Together

To begin solving the problem, click the start button above and a timer will begin, starting at 5 minutes.

One user (the person that created the room) will start out as the navigator and can only instruct the driver what to type as he/she will be unable to type in the code editor until the timer expires.

Another user (the person that joined the room) will start out as the driver and will be responsible for typing in the code as instructed by the navigator until the timer reaches zero.

Once the timer reaches zero, the roles are reversed and the timer is reset.

### Running Tests

Once the coding pair are happy with their solutions, they can click run to see if they pass all the tests. If all tests pass, the timer will stop and state that the problem is solved.

If all the tests do not pass, the user can continue to try solving the problem until all tests pass.

### Viewing Previously Solved Problems

To view previously solved or attempted problems, click on "My Stats" to view the list of problems attempted. You can view their status and enter the room again by clicking on the Room Id.
