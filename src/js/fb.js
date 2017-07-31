/**
 * Created by Turox on 7/10/2017.
 */
console.log('FB api');
var id;
var accessToken;
var btnlogin;

function fbLogoutUser() {
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                document.location.reload();
            });
        }
    });
}

function userConnected(){
    FB.api('/me', function(response){
        document.getElementById("login").innerHTML = response.name;
        document.getElementById("sair").onclick = function () { fbLogoutUser(); };
        document.getElementById("sair").style.display = "inherit";
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
        alert("Faça login no ícone de usuário.");
    }
    else{
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
    FB.AppEvents.logPageView();
    btnlogin = document.getElementById('login')
    btnlogin.onclick = function () {
        console.log('Login clicked');
        FB.login(function (response) {
            statusChangedCallback(response);
        }, {scope: 'public_profile'});
        
    };
    FB.getLoginStatus(function (response) {
        statusChangedCallback(response);
    });
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