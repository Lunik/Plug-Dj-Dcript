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

function getHighResolutionThumbmail(videoid)
{
	var quality = ['maxresdefault','hqdefault','mqdefault'];
	var img = new Image();
	var i;
	for(i=0;i<quality.length;i++){
		img.src = "https://i.ytimg.com/vi/"+videoid+"/"+quality[i]+".jpg";

		if(img.width > 120)
			return img.src;
	}	

	return "https://i.ytimg.com/vi/"+videoid+"/0.jpg";
}

function addThumbmailChat(title,url){
	url = getHighResolutionThumbmail(url);
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
					'<a href="'+url+'" target="_blank">'+
						'<img src="'+url+'" width="90%" />'+
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

function addThumbmailVideo(url){
	url = getHighResolutionThumbmail(url);
	$('.video-thumbmail').attr("src",url);
}

function init(){
	changeMode("video");
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
	var info = getVideoInfo();
	addThumbmailVideo(info.url);
}