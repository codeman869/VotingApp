$(document).ready(
    function() {
        window.checkUsername = checkusername;
        window.validateForm = validateForm;
        //console.log('Page loaded!');
    }    
    
);

function checkusername() {
    var username = $('#username').val();
    
    if(username === '') return;
    
    $.post('/users/exists', {username: username }, function(data){
        //console.log(data);
        
        if(data.username) {
        
            $('#usr-alert').css('display', 'block').text("Username is already taken!");
        
            //$('#usr-alert')
            
        } else {
            $('#usr-alert').css('display', 'none');
        }
        
    });
}

function clearPasswordAlerts() {
    $('#passwd-alert').css('display', 'none');
}

function validateForm() {
    
    var passwd = $('#password').val();
    var passwd_conf = $('#password_conf').val();
    
    
    
    if(passwd !== passwd_conf) {
        $('#passwd-alert').text("Passwords don't match!").css('display', 'block');
        
        return false;
        
    }
    
    return true;
    
}