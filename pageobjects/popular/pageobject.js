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

    //get snippets array
    get snippetArr() {return $$('[data-tid="af76fbb3"]')}

    //get snippet's pictures
    get snippetsPictures() {return $$('[data-tid="d813cf42"]')}

    //get button forward to list pages
    get buttonForward() {return $('[data-tid="6e4f0353"]')}

    //get snippets link
    async getLink(document)
    {
        return document.$('[data-tid="6cf86878"]');
    }

    async getArrayChildA()
    {
        return document.$$('a');
    }



}

module.exports = new PopularPO();