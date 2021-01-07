# Structure

## Client

I will make moves here and make sure they are legal, just like in  single player. I will need to rewrite the whole tictactoe, to be able to use it in multiplayer. X always start. The player who joins is set to O and the creator is set to X. 

When I make a move and send it to server myTurn equals false. I wait until I recieve an Array of squares (new updated board) and set current position to this new Array. When that is done myTurn = true;

## Server
### First goal
Dont validate that the move is legal to start with. That can easily be thrown in as a 'middleware' inbetween recieve squares and send squares and turn to next player.

### A turn
I will recieve an array of squares from player one here and validate that it is a legal move  before sending it over to the other player. This is to stop people from cheating with dev tools. If invalid, make it player ones
