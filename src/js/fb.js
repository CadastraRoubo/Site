/**
 * Created by Turox on 7/10/2017.
 */
console.log('FB api');
var id;
var accessToken;
var btnlogin;

function userConnected(){
    FB.api('/me', function(response){
        document.getElementById("login").innerHTML = response.name;
    });
    
}

function statusChangedCallback(response) {
    /**/
    //console.log(response.authResponse)
    if(response.status == 'connected'){
        accessToken = response.authResponse.accessToken;
        id = response.authResponse.userID;
        btnlogin.onclick = function () {console.log("logado");};
        userConnected();
    }
    else if(response.status == 'not_authorized'){
        accessToken = -1;
        id = -1;
        alert("Faça login no ícone de usuário.");
    }
    else{
        accessToken = -1;
        id = -1;
        alert("Entre no Facebook para usar o site.");
    }
}

window.fbAsyncInit = function () {
    FB.init({
        appId: 113508735925978,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.9'
    });
    FB.getLoginStatus(function (response) {
        statusChangedCallback(response);
    });
    FB.AppEvents.logPageView();
    btnlogin = document.getElementById('login')
    btnlogin.onclick = function () {
        console.log('Login clicked');
        FB.login(function (response) {
            statusChangedCallback(response);
        }, {scope: 'public_profile'});
        
    };
    
};

(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));