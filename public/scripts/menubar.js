$(document).ready(function() {
    
    $('#logout').on('click', function() {
        
        $.ajax({
                url: '/logout',
                type: 'DELETE',
                success: function(data){
                    console.log('Delete request sent!');
                    window.location.href = '/';
                }
            
        });
    });
    
});