function getImageUrl(keyword){
	$.ajax({
		url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&imgtype=photo&imgsz=xlarge|xxlarge&safe=active&q=' + keyword,
		dataType: 'jsonp',
		success: function(data) { console.log(data.responseData);
			// find 16:9 images
			var mini = 0;
			var mindiff = 999999999.9;
			for (var i = 0; i < data.responseData.results.length; i++) {
				var diff = Math.pow(((16.0/9.0) - (data.responseData.results[i].width / data.responseData.results[i].height)),2);
				if(diff < mindiff) {
					mindiff = diff;
					mini = i;
				}
			}
			$('#canvas').css("background-image", "url("+data.responseData.results[mini].url +")");
		}});
}

function refreshPic(){
	var input = $("#title").val();
	var splitted = input.split(" ");
	var firstChar = "";
	var counter = 0;
	var wordCombination = "";
	var lastWord = "";
	for(var i = splitted.length-1; i>=0;i--){
		lastWord = splitted[i];
		firstChar = lastWord.charAt(0);
		if(firstChar === firstChar.toUpperCase()){
			wordCombination = wordCombination + " " + lastWord;
			counter++;
			if(counter == 2){
				break;	
			}
		}
	}	
	if(wordCombination !== ""){
		getImageUrl(wordCombination);
	}

}
$( document ).ready(function() {
    $('#canvas').css("background-image", "url(http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/mr-t.jpeg)");  
	var timer = null;
	$('#title').on('input', function(){
		clearTimeout(timer);
		timer = setTimeout(refreshPic, 400);
	});
});
