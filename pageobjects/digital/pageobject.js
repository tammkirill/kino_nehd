/**
pageobjects of Films Today
Contains:
1. buttons
2. snippets
3. links
4. pictures
*/

/**
     * Always asking for arrays to avoid dinamic issues (if array is > 1 than tests need to be refactored)
*/

class DigitalPO
{

    //get snippets array
    get snippetsArray() {return $$('[class="item"]')}

}

module.exports = new DigitalPO();