function getImageUrl(keyword){
	                $.ajax({
                    url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgsz=xlarge|xxlarge|huge&safe=active&q=' + keyword,
                    dataType: 'jsonp',
                    success: function(data) { console.log(data.responseData);
						$('#canvas').css("background-image", "url("+data.responseData.results[0].url +")");
                    }});
}

function refreshPic(){
	var input = $("#title").val();
	var splitted = input.split(" ");
	var lastWord = splitted[splitted.length-1];
	var firstChar = "";
	for(var i = splitted.length-1; i>=0;i--){
		lastWord = splitted[i];
		firstChar = lastWord.charAt(0);
		if(firstChar === firstChar.toUpperCase()){
			console.debug(lastWord);
			getImageUrl(lastWord);
			break;
		}
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
