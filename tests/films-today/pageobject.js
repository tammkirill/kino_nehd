/**
pageobjects of Films Today
Contains:
1. buttons
2. snippets
3. links
*/
const FilmTodayCommands = require('./commands/commands-films-today.js');

class FilmTodayPO extends FilmTodayCommands
{
    //get Today's carousel
    get Carousel () { return }

    //get Array of all Snippets
    get SnipetsArray() { return $$('div.carousel__item.carousel__item_desktop.today-in-cinema__carousel-item')}

    //get Array all links
    get LinksToSnipp () { return }
}