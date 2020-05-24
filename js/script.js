jQuery(document).ready(function ($){
    //Loading Notification
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function(){
    setTimeout(removeLoader, 2000); //wait for page load 
    });
    function removeLoader(){
    $( "#loadingDiv" ).fadeOut(500, function() {
      // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
    });  
    }
    function createBookListItem(Book) {       
        var $li = $('<li>'); //<li></li>
        $li.addClass('list-group-item hover-invert cursor-pointer'); //<li class="list-group-item"></li>
        $li.html(Book.title); //<li class="list-group-item">{TEXT}</li>
        $li.data('BookId', Book.id);
        return $li;
    } 
    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function (response){
        response.data.forEach(function (Book) {
            $('#Book-list').prepend(createBookListItem(Book));
        });     
        $('.list-group-item').on('click', function(){
            $('.list-group-item').removeClass('active');
            var BookId = $(this).data('BookId');
            $(this).addClass('active');
            $('#cover').html('Loading ...');
            axios.get('http://csc225.mockable.io/books/' + BookId).then(
                function(response){
                    var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                    $('#cover').html($img);
                    var $author = ('By ' + response.data.author);
                    $('#author').html($author);
                    var $country = ('Country - ' + response.data.country);
                    $('#country').html($country);        
                    var $language = ('Language - ' + response.data.language);
                    $('#language').html($language);                               
                    var url = response.data.link;                
                    document.getElementById("link").setAttribute("href",url);
                    console.log(url);
                    var $pages = ('No of Pages - ' + response.data.pages);
                    $('#pages').html($pages);
                    var $title = response.data.title;
                    $('#title').html($title);  
                    var $year = ('Year - ' + response.data.year);
                    $('#year').html($year);                                                                                    
                }
            );           
        });       
    });       
}); 