var MODE;
var THUMBMAIL = {
	'src': ' ',
	'width': 0
};

API.on(API.ADVANCE, function(data){
	changeThumbmail(data.media.title,data.media.cid);
});

API.on(API.CHAT_COMMAND, function(data){
	data = data.split(" ");
	var cmd = data[0];
	var param = data[1];
	if(cmd == "/mode"){
		changeMode(param);
	}
});

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
	getHighResolutionThumbmail(url);
	switch (MODE){
		case "chat":
			setTimeout(function(){
				addThumbmailChat(title);
			},1000);
			break;
		case "video":
			setTimeout(function(){
				addThumbmailVideo();
			},1000);
			break;
		default:
			setTimeout(function(){
				addThumbmailChat(title);
			},1000);
			break;
	}
}

function getHighResolutionThumbmail(videoid)
{
	var quality = ['maxresdefault','hqdefault','mqdefault','0'];
	var img;

	var i;
	for(i=0;i<quality.length;i++){
		img = new Image();
		img.src = "https://i.ytimg.com/vi/"+videoid+"/"+quality[i]+".jpg";

		img.onload = function (){
			if(this.width > THUMBMAIL.width){
				THUMBMAIL.width = this.width;
				THUMBMAIL.src = this.src;
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

function init(){
	var info = getVideoInfo();
	getHighResolutionThumbmail(info.url);
	setTimeout(function(){
		changeMode("video");
	},1000); 
	$('#room').append()
}

function initChatMode(){
	$('.video-thumbmail').remove();
	unhideVideo();
}

function initVideoMode(){
	initChatMode();
	$('#playback').append('<img class="video-thumbmail">');
	$('.video-thumbmail').css("width","100%");
	$('.video-thumbmail').css("height","100%");
	hideVideo();
}