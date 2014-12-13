function setText() {
    if(!($("#title").is(":focus"))) {
        $('#hidden_input').select();
        var text = $('#hidden_input').val();
        if(text == '') {
            $('#title').val("Sprich Freund und tritt ein");
        } else {
            $('#title').val(text);
        }
    }
}

$( document ).ready(function() {
    $('#canvas').css("background-image", "url(http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/mr-t.jpeg)");  
    setText();
    setInterval(setText, 2000);
});
