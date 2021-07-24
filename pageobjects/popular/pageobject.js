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

class PopularPO
{
    //get header first level
    get header1() {return $('h1')}

}

module.exports = new PopularPO();