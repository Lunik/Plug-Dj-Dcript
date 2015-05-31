var MODE;

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
	switch (MODE){
		case "chat":
			addThumbmailChat(title,url);
			break;
		case "video":
			addThumbmailVideo(url);
			break;
		default:
			addThumbmailChat(title,url);
			break;
	}
}

function addThumbmailChat(title,url){
	$chat = $('#chat-messages');
	$chat.append(''+
		'<div class="cm rsshit message rs-log-green">'+
			'<div class="badge-box">'+
				'<i class="icon icon-drag-media"></i>'+
			'</div>'+
			'<center>'+
				'<br>'+
				'<div class="title">'+title+'</div>'+
				'<br>'+
				'<div class="image">'+
					'<a href="https://i.ytimg.com/vi/'+url+'/maxresdefault.jpg" target="_blank">'+
						'<img src="https://i.ytimg.com/vi/'+url+'/maxresdefault.jpg" width="90%" />'+
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

function initVideoMode(){
	$('#playback').append('<img class="video-thumbmail">');
	$('.video-thumbmail').css("width","100%");
	$('.video-thumbmail').css("height","100%");
	hideVideo();
	var info = getVideoInfo();
	addThumbmailVideo(info.url);
}

function initChatMode(){
	$('.video-thumbmail').remove();
	unhideVideo();
	var info = getVideoInfo();
	addThumbmailChat(info.title,info.url);
}

function addThumbmailVideo(url){
	$('.video-thumbmail').attr("src","https://i.ytimg.com/vi/"+url+"/maxresdefault.jpg");
}

function getVideoInfo(){
	var data = API.getMedia();

	return {
		"title": data.media.title,
		"url": data.media.cid
	}
}