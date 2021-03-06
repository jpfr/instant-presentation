function setImage(){
        var input = $("#title").val();
        $.ajax({
                url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&imgtype=photo&imgsz=xlarge|xxlarge&safe=active&q=' + input,
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
                        if(data.responseData.results.length>0)
                        	$('#canvas').css("background-image", "url("+data.responseData.results[mini].url +")");
                }});
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}   

function extractSearchString(text){

	var splitted = text.split(" ");
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
	if(wordCombination === ""){
		return text;
	}
	return wordCombination;
}

$( document ).ready(function() {
    $('#canvas').css("background-image", "url(http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/mr-t.jpeg)");
        var timer = null;
        $('#title').on('input', function(){
                clearTimeout(timer);
                timer = setTimeout(setImage, 400);
        });

    var recognition = new webkitSpeechRecognition();
    var lang = getUrlParameter("lang");
    if(lang !== undefined) {
        recognition.lang = lang;
    }
    else{
    	recognition.lang = "de";
    }
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function(event) {
        var res = event.results[event.resultIndex][0].transcript;

        $('#title').val(extractSearchString(res));
        $('#title').trigger('input');
    };
    recognition.start();
});
