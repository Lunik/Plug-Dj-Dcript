API.on(API.ADVANCE, function(data){
	addThumbmailChat(data.media.title,data.media.cid);
});

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

