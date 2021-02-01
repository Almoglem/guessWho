var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage('tree');
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('The Rock');
        gQuestsTree.no = createQuest('Oprah');
        _saveTreeToStorage();
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gPrevQuest[res];
}

function addGuess(newGuessTxt, newQuestTxt, lastRes) {
    //// replace last question with the new question
    /// yes: new guess, no: last guess
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    gPrevQuest[lastRes].no = gCurrQuest;
    _saveTreeToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _saveTreeToStorage() {
    saveToStorage('tree', gQuestsTree);
}

