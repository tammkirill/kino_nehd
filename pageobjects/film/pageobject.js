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

class FilmPO
{

    //get poster
    get poster() {return $('[data-tid="709cff27"]')}

    //get film name
    get filmTitle() {return $('data-tid="67e47501"')}

    //get genre array
    get filmGenreArr() {return $('[data-tid="d61dc135"]')}

    //get picture of the film
    async getPicture(document) 
    {
        return document.$('[data-tid="6fee64e1"]');
    }
    
}

module.exports = new FilmPO();