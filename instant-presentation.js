function getImageUrl(keyword,callback){
	var apiKey = "eb256520904bd8ee05b1116f2ed5da99";
	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&content_type=1&sort=relevance&api_key=' + apiKey + '&text=' + keyword,
    	callback);
}
function photoObject2ImageUrl(photo){
	return "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_b.jpg";
}

function imagecallback(data){
	if(data.photos && data.photos.photo && data.photos.photo.length>0){
		console.debug(data.photos.photo[0]);
		console.debug(photoObject2ImageUrl(data.photos.photo[0]));
		$('#canvas').css("background-image", "url("+photoObject2ImageUrl(data.photos.photo[0])+")");
	}
}

function refreshPic(){
	var input = $("#title").val();
	var splitted = input.split(" ");
	var lastWord = splitted[splitted.length-1];
	if(lastWord.length >= 4){
		getImageUrl(lastWord,imagecallback);
	}
}
$( document ).ready(function() {
    $('#canvas').css("background-image", "url(http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/mr-t.jpeg)");  
	var lastchangetime = 0;
	var timer = null;
	$('#title').on('input', function(){
		clearTimeout(timer);
	    console.debug("ready");
		timer = setTimeout(refreshPic, 400);
	});

});
