// Get GET parameters

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }

    return(false);
}

function getTempURL() { 
    if (getQueryVariable("temp") == false) {
        return("temp.txt");
    } else {
        return("temp" + getQueryVariable("temp") + ".txt");
    }
}

function getLoadURL() {
    if (getQueryVariable("load") == false) {
        return("load.txt");
    } else {
        return("load" + getQueryVariable("temp") + ".txt");
    }
}

