const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"; 
const YOUTUBE_API_KEY = "AIzaSyA6UrBuVh2gcMxldErJRgMEt4TkKLUxxDk"; 


function listenforInput() {
$("#search").submit(event => {
    event.preventDefault();
    var searchTerm = $(".js-searchTerm").val();
    getYoutubeResults(searchTerm);
})
}

// Get data from Youtube based on input
var getYoutubeResults = function(searchTerm) {
    const query = {
        part: "snippet",
        key: YOUTUBE_API_KEY,
        q: searchTerm,       
    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, renderVideos);
}

//render search results
function renderVideos(data) {

    for (i = 0; i < data.items.length; i+=1) {
        // const item = data.items[i];
        const videoSnippet = data.items[i].snippet;
        const videoId = data.items[i].id.videoId;
        const videoTitle = videoSnippet.title;
        const videoDesc = videoSnippet.description;
        const videoThumbnail = videoSnippet.thumbnails.default.url; 
        const videoChannelTitle = videoSnippet.channelTitle; 
        const videoChannelId = videoSnippet.channelId; 
        const newElem = (
            `<div class="col-4">  
            <div class="video">
                <a href="https://www.youtube.com/watch?v=${videoId}">
                    <h3 class="video-title">${videoTitle}</h3>
                    <img class="thumbnail" src="${videoThumbnail}" alt="${videoDesc}">
                    <p class="video-description">${videoDesc}</p>
                </a>
            </div>
            </div>`
        );
        $(".results-display").append(newElem);
  }
}

listenforInput();
