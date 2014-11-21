

var all_zalgo = zalgo_up.concat(zalgo_mid).concat(zalgo_down);

// hi every1 my name is katy nd as u can see i am quite random! *holds up spork*
function randomChoice(list) {
    // ... I can't believe I have to implement this.
    return list[Math.floor(Math.random() * list.length)];
}
function randInt (min, max) {
    return Math.floor((Math.random() * max)) + min;
}

function zalgoChar(char, zalgosPerChar) {
    var result = char;
    zalgosPerChar = zalgosPerChar == undefined ? 1 : zalgosPerChar;

    randomZalgos = randInt(0, zalgosPerChar + 1);
    for (var _ = 0; _ < randomZalgos; _++) {
        var zalgoChar = randomChoice(all_zalgo);
        result += zalgoChar;
    }
    return result;
}

function strikethroughChar(char) {
      return char + '\u0336';
}
function gagBoysChar(char) {
    return char.toUpperCase() + " ";
}

function smallCapsChar(char) {
    if (char in smallCapsMap) {
        return smallCapsMap[char];
    }
    return char;
}

function HECOMES(text, zalgosPerChar) {
    var corruptedText = "";
    $.each(text.split(''), function() {
        corruptedText += zalgoChar(this, zalgosPerChar);
    });
    return corruptedText;
}


function strikethrough(text) {
    var struck = '';
    $.each(text.split(''), function() {
        struck += strikethroughChar(this);
    });
    return struck;
}
function gagBoys(text) {

    var boys = "";
    $.each(text.split(''), function() {
        boys += gagBoysChar(this);
    });

    return boys + "B O Y S";
}

function flipChar(char) {
    if (char in flipMap) {
        return flipMap[char];
    }
    else {
        return char;
    }
}


function fullWidthChar(char) {
    var fullWidthMap = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}";
    var offset = 65281;

    var index = fullWidthMap.indexOf(char)
    if (index !== -1) {
        // YEP
       return String.fromCharCode(offset + index);
    }
    else {
        return char;
    }
}
