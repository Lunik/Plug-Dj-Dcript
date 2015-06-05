var MODE;
var THUMBMAIL = {
	'src': ' ',
	'width': 0
};

API.on(API.ADVANCE, function(data){
	changeThumbmail(data.media.title,data.media.cid);
});

initWDJ();

function getVideoInfo(){
	var data = API.getMedia();

	return {
		"title": data.title,
		"url": data.cid
	}
}

function changeMode(mode){
	MODE = mode;
	if(mode == "video"){
		initVideoMode();
	} else {
		initChatMode();
	}
}

function hideVideo(){
	$('#playback-container').css('display','none');
}

function unhideVideo(){
	$('#playback-container').css('display','');
}

function changeThumbmail(title,url){
	THUMBMAIL.src = ' ';
	THUMBMAIL.width = 0;
	getHighResolutionThumbnail(url);
	switch (MODE){
		case "chat":
			setTimeout(function(){
				addThumbmailChat(title);
			},5000);
			break;
		case "video":
			addThumbmailVideo();
			break;
		default:
			setTimeout(function(){
				addThumbmailChat(title);
			},5000);
			break;
	}
}

function getHighResolutionThumbnail(videoid){
	var quality = ['maxresdefault','hqdefault','mqdefault','sddefault','0'];
	var img;

	var i;
	for(i=0;i<quality.length;i++){
		img = new Image();
		img.src = "https://i.ytimg.com/vi/"+videoid+"/"+quality[i]+".jpg";

		img.onload = function (){
			if(this.width > THUMBMAIL.width){
				THUMBMAIL.width = this.width;
				THUMBMAIL.src = this.src;
				if(MODE == 'video')
					addThumbmailVideo();
			}
		};
	}
}

function addThumbmailChat(title){
	$chat = $('#chat-messages');
	$chat.append(''+
		'<div class="cm rsshit message rs-log-green" id="chat-thumbmail">'+
			'<div class="badge-box">'+
				'<i class="icon icon-drag-media"></i>'+
			'</div>'+
			'<center>'+
				'<br>'+
				'<div class="title">'+title+'</div>'+
				'<br>'+
				'<div class="image">'+
					'<a href="'+THUMBMAIL.src+'" target="_blank">'+
						'<img src="'+THUMBMAIL.src+'" width="90%" />'+
					'</a>'+
				'</div>'+
			'<center>'+
		'</div>'+
		'');

	setTimeout(function(){
		$chat = $('#chat-messages');
		$chat.scrollTop($chat.get(0).scrollHeight);
	},500);
}

function addThumbmailVideo(){
	$('.video-thumbmail').attr("src",THUMBMAIL.src);
}

function initWDJ(){
	initWLButton();
	changeMode("video");
	var info = getVideoInfo();
	getHighResolutionThumbnail(info.url);
}

function initChatMode(){
	changeWLButton();
	$('.video-thumbmail').remove();
	unhideVideo();
}

function initVideoMode(){
	initChatMode();
	changeWLButton();
	$('#playback').append('<img class="video-thumbmail">');
	$('.video-thumbmail').css("width","100%");
	$('.video-thumbmail').css("height","100%");
	hideVideo();
	addThumbmailVideo();
}

function initWLButton(){
	$('#playback').append('<div id="WL-button">');
	$button = $('#WL-button');

	$button
		.width(110)
		.height(40)
		.css('position','fixed')
		.css('z-index','100')
		.css('left',($('#playback').width() - $button.width() + 10))
		.css('top',($('.app-header').height() + $('#playback-controls').height()))
		.css('border-bottom-left-radius','5px')
		.css('border-top-left-radius','5px')
		.html('')
		.append('<p class="WL-mode">Mode '+MODE+'</p>')
		.css('text-align','center')
		.css('vertical-align','middle')
		.css('cursor','pointer')
		.css("background-color", "#009900")
		.hover(function(){
    		$(this)
    			.css("background-color", "#00BB00")
    			.css('left',($('#playback').width() - $button.width()));
    	}, function(){
    		$(this)
    			.css("background-color", "#009900")
    			.css('left',($('#playback').width() - $button.width() + 10));
    	})
    	.on('click',function(){
    		if(MODE == 'chat')
    			changeMode('video');
    		else
    			changeMode('chat');
    	});

    	$('.WL-mode')
		.css('margin-top',$button.height()/4.5)
		.css('margin-right','10px')
		.css('font-weight','bold');

	changeWLButton();
}

function changeWLButton(){
	$('.WL-mode').html('').append('Mode '+MODE);

}