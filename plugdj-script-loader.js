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
            $.getScript('#');
        }
    };
    a.b();
})();