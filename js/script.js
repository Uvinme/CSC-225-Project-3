jQuery(document).ready(function ($){
    function createBookListItem(Book) {
        var $li = $('<li>'); //<li></li>
        $li.addClass('list-group-item hover-invert cursor-pointer'); //<li class="list-group-item"></li>
        $li.html(Book.title); //<li class="list-group-item">{TEXT}</li>
        $li.data('BookId', Book.id);
        return $li;
    } 

    $('#Book-list').html('Loading ...');
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
                    console.log(response.data.cover);
                    var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                    $('#cover').html($img);

                }
            );
            
        });
        
    });
    console.log('hello!');

}); 