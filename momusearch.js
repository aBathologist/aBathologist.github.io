function searchTerm() {
    return document.getElementById("search_field").value;
};

var google = {
    searchUrl: function() {
        return "https://www.google.com/#q=" + searchTerm() + "&safe=off" } 
};
var wikipedia = {
    searchUrl: function() {
        return "http://www.wikipedia.org/search-redirect.php?family=wikipedia&search=" + searchTerm() + "&language=en&go=Go"}
};
var youtube = {
    searchUrl: function() {
        return "http://www.youtube.com/results?search_query=" + searchTerm() }
};

// siteName is a variable corresponding to one of the search site objects 
function searchSite(siteName) {
    location.href = siteName.searchUrl()
};



