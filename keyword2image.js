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
	if(data.photos && data.photos.photo){
		console.debug(data.photos.photo[0]);
		console.debug(photoObject2ImageUrl(data.photos.photo[0]));
	}
}
getImageUrl("CIE",imagecallback);