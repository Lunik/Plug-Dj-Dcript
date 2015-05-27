// ==UserScript==
// @name           RCSLoader
// @description    Autorun RCS on plug.dj
// @author         Origin
// @include        https://plug.dj/*
// @exclude        https://plug.dj/_/*
// @exclude        https://plug.dj/@/*
// @exclude        https://plug.dj/ba
// @exclude        https://plug.dj/plot
// @exclude        https://plug.dj/press
// @exclude        https://plug.dj/partners
// @exclude        https://plug.dj/team
// @exclude        https://plug.dj/about
// @exclude        https://plug.dj/jobs
// @exclude        https://plug.dj/purchase
// @version        1.6
// @grant          none
// ==/UserScript==

(function() {
    
    var loaded = false;
    
    var a = {
        b: function() {
            if (typeof API !== 'undefined' && API.enabled) {
            	this.c();
            }
            else if (!loaded) {
                setTimeout(function() { a.b(); }, 1000);
            }
        },
        c: function() {
            loaded = true;
            $.getScript('https://rawgit.com/Lunik/Plug-Dj-Dcript/master/walpaperDJ.js');
            $.getScript('https://rawgit.com/Lunik/Plug-Dj-Dcript/master/notifDJ.js');

            $chat = $('#chat-messages');
            $chat.append(''+
                '<div class="cm rsshit message rs-log-green">'+
                    '<div class="badge-box">'+
                        '<i class="icon icon-star-white"></i>'+
                    '</div>'+
                    '<div class="msg">'+
                        '<div class="from">False_Lunik Plugin</div>'+
                        '<div class="text">False_Lunik Plugin activé</div>'+
                    '</div>'+
                '</div>'+
            '');
            $chat.scrollTop($chat.get(0).scrollHeight);
        }
    };
    a.b();
})();