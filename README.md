# ~~Mine~~**Jabberwocky**-Sweeper

![Jabberwocky](https://i.imgur.com/rfWU2iP.jpg)

### A Lewis Carroll themed edition of the classic Minesweeper game.
______________________________________________________________________
## A Brief History
______________________________________________________________________
There are a number of variations to the game, including probably the most well-known being *Microsoft Minesweeper* (Curt Johnson & Robert Donner, c. early 1990s). Other variants over time include *Cube* (Jerimac Ratliff, c. 1960s), *Mined-Out* (Qucksilva, c. 1983), *Yomp* (Virgin Interactive, c. 1983), *Relentless Logic* or *RLogic* (Conway, Hong, and Smith, c. 1985), among others.
______________________________________________________________________
## Why Minesweeper and why Lewis Carroll's Jabberwocky
______________________________________________________________________
As a youth I frequently played Minesweeper on my PC as it was a free game loaded as part of the Microsoft package. Having spent so much time formatively playing I chose this game to piece it together and figure out how a nostalgic favorite works. Similarly, I have personally always been an admirer of Lewis Carroll and John Tenniel's works and wanted to implement a bit of Wonderland flair over the traditional, primarily grey game. I still maintained a primarily greyscale look, save for the red clock and mine counters. I intentionally made these pop out of the trees as the Jabberwocky's eyes would leering from the tulgey wood. In the end of Carroll's piece the King is asking his son if he had slain the Jabberwocky. Thus, I crafted my endgame message to seem as though it were coming on an important bit of parchment with a regal, cursive tone, contrary to the eerie font of the rest of the game, as though the King himself were issuing your endgame fate. I've also worked a few of Carroll's famed creatures from Jabberwocky into the failures you may come across...keep playing and you may see them all!
______________________________________________________________________
## Screenshots
______________________________________________________________________
Game Board:
![Game Board](https://i.imgur.com/ASf4LnV.png)

Gameplay with mine:
![Gameplay with mine](https://i.imgur.com/zeuhnmz.png)

Failure message example:
![Failure message example](https://i.imgur.com/8RbJbJ6.png)
______________________________________________________________________
## Technologies Used
______________________________________________________________________
* HTML
* CSS
* Javascript
______________________________________________________________________
## Getting Started
______________________________________________________________________
The objective of the game is to navigate the board and *carefully* decide where to begin. Once you have made your first choice, which will either have been a single numbered tile or (if you are lucky) an empty space. If you manage to find an empty space, the board will open all surrounding empty spaces until it reaches an "edge" of numbers. The numbers are significant, so pay them close attention: each number represents how many mines surround that number. If the number is a **1**, that means one of the eight tiles surrounding this **1** is a mine. The same logic applies if the number you found is a **4**: there are four mines in the eight tiles surrounding this tile. If you find a tile that you think may be a mine, right-click (or control-click) on that tile to place a flag marker.

Now that you know the rules, [let's play](https://naryxhaxns.github.io/Jabberwocky-Sweeper-Project-1/)!
______________________________________________________________________
## Next Steps
______________________________________________________________________
Starting this project I wanted to be able to give the user the option of choosing a 9x9, 16x16, or 16x30 sized board. One major icebox item would be implementing this capability.