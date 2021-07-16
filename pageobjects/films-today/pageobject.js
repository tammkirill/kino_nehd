/**
pageobjects of Films Today
Contains:
1. buttons
2. snippets
3. links
*/

/**
     * Always asking for arrays to avoid dinamic issues (if array is > 1 than tests need to be refactored)
*/

class FilmTodayPO
{
    
    //get Today's carousel snippets
    get todayCarousel () {return $('[class="carousel carousel_desktop today-in-cinema__carousel"]')}

    //get Today's carousel Name
    get headingCarousel () { return $$('[data-tid="e5b8accf"]')}

    //get Array of all Snippets
    get snipetsArray () { return $$('[class="carousel__item carousel__item_desktop today-in-cinema__carousel-item"]')}

    //get Array of all tickets on Snippets
    get snippetsTicketsArray () { return $$('[data-tid="55578b31"]')}

    /// Right versions of: Name, poster, year, rating ///

    //get Name and Year of a film 
    get rightName() {return $('[data-tid="67e47501"]')}

    //get picture of the film
    async getPicture(document) 
    {
        return document.$('[data-tid="d813cf42"]');
    }

    //get child 'a'
    async getChildA(document)
    {
        return document.$('a');
    }

    //get Arrow to scroll
    async getArrow(document) 
    {
        return document.$('[data-tid="e3b85fc5"]');
    }
}

module.exports = new FilmTodayPO();