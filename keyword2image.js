
function getImageUrl(keyword,callback){
	var apiKey = "eb256520904bd8ee05b1116f2ed5da99";
	var param  = "text";
	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&sort=relevance&api_key=' + apiKey + '&'+param+'=' + keyword,
    	callback);
}
function photoObject2ImageUrl(photo){
	return "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
}
function imagecallback(data){
	if(data.photos && data.photos.photo && data.photos.photo.length>0){
		console.debug(data.photos.photo[0]);
		console.debug(photoObject2ImageUrl(data.photos.photo[0]));
		$('#canvas').css("background-image", "url("+photoObject2ImageUrl(data.photos.photo[0])+")");
	}
}
function refreshPic(){
	var input = $("#text_input").val();
	var splitted = input.split(" ");
	var lastWord = splitted[splitted.length-1];
	getImageUrl(lastWord,imagecallback);
}
$( document ).ready(function() {
	var lastchangetime = 0;
	var timer = null;
	$('#text_input').on('input', function(){
		clearTimeout(timer);
		timer = setTimeout(refreshPic, 400);
	});

});