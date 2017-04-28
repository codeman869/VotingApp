$(document).ready(function() {
    
    window.removePoll = function(id) {
        $.ajax({
           url: `/polls/${id}`,
           type: 'DELETE',
           success: function(data) {
               console.warn(`Poll id: ${id} Deleted`);
               window.location.reload(true);
           }
           /*,
           error: function(err) {
               window.location.reload(true);
           }
            */
        });
    }
    
});