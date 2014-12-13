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
        console.log(splitted.splice(-5).join(" "));
        getImageUrl(splitted.splice(-5).join(" "));
}

$( document ).ready(function() {
    $('#canvas').css("background-image", "url(http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/mr-t.jpeg)");
        var timer = null;
        $('#title').on('input', function(){
                clearTimeout(timer);
                timer = setTimeout(refreshPic, 400);
        });

    var recognition = new webkitSpeechRecognition();
    recognition.lang = "de-DE";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function(event) {
        console.log(event);
        $('#title').val(event.results[event.resultIndex][0].transcript);
        $('#title').trigger('input');
    };

    recognition.start();

});
