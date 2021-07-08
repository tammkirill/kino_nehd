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
    //get Today's carousel Name
    get nameCarousel () { return $('data-tid="e5b8accf"')}

    //get Array of all Snippets
    get snipetsArray() { return $$('div.carousel__item.carousel__item_desktop.today-in-cinema__carousel-item')}

    //get Array all links
    get linksToSnipp () { return }
}