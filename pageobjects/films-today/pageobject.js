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
    get snippetName() {return $('[data-tid="67e47501"]')}

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
    async getArrowRight(document) 
    {
        return document.$('[class="circle-arrow-button circle-arrow-button_theme_compact circle-arrow-button_direction_right circle-arrow-button_animation_slide circle-arrow-button_color_white carousel__button carousel__button_direction_right carousel__button_always-show today-in-cinema__carousel-button circle-arrow-button-light__slider-button circle-arrow-button-light__slider-button_direction_right"]');
    }

    //get Span to get a name of the film
    async getName(document)
    {
        return document.$('[class="film-poster-snippet-partial-component__title film-poster-snippet-partial-component__title_theme_default today-in-cinema-carousel-item__snippet-title"]');
    }

    //get Year and Genre of the film
    async getYearGenre(document)
    {
        return document.$('[class="film-poster-snippet-partial-component__caption film-poster-snippet-partial-component__caption_theme_default"]')
    }

    //get icon with rating
    async getRating(document)
    {
        return document.$('[data-tid="83f4f39d"]');
    }

    //get small icon of the ticket
    async getSmallTicket(document)
    {
        return document.$('[data-tid="55578b31"]');
    }

    //get big icon of the ticket
    async getBigTicket(document)
    {
        return document.$('[class="nameplate__icon-wrapper"]');
    }

}

module.exports = new FilmTodayPO();