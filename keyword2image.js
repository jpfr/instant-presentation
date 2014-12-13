
function getImageUrl(keyword,callback){
	var apiKey = "eb256520904bd8ee05b1116f2ed5da99";
	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=' + apiKey + '&text=' + keyword,
    	callback);
}
function photoObject2ImageUrl(photo){
	return "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
}
function imagecallback(data){
	console.debug(data.photos);
	if(data.photos && data.photos.photo && data.photos.photo.length>0){
		console.debug(data.photos.photo[0]);
		console.debug(photoObject2ImageUrl(data.photos.photo[0]));
		$('#canvas').css("background-image", "url("+photoObject2ImageUrl(data.photos.photo[0])+")");
	}
}
$( document ).ready(function() {
	var lasttime = 0;
	$('#text_input').on('input', function(){
		var current = new Date();
		var diff = (current - lasttime)/ 1000; // in second
		if(diff > 1){
			lasttime = new Date();
			var input = $("#text_input").val();
			var splitted = input.split(" ");
			var lastWord = splitted[splitted.length-1];
			getImageUrl(input,imagecallback);
		}
	});
});