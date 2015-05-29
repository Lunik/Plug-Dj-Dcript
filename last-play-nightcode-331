$nextMediaSpan = $('#your-next-media span');
$nextMedia = $('#your-next-media');

initNextMedia();

$nextMediaSpan.bind('DOMNodeInserted', function(){ 
	var id = API.getNextMedia().media.cid;

	updateNextMediaLink(id);
});

function initNextMedia(){
	//decalage du titre
	$nextMediaSpan.css("left","80px"); 

	//Ajout du lien
	$nextMedia.append('<a id="next-media-stats-link"></a>');
	$nextMediaStatsLink = $('#next-media-stats-link');
	$nextMediaStatsLink.attr('href','#');
	$nextMediaStatsLink.attr('target','_blank');
	var id = API.getNextMedia().media.cid;
	updateNextMediaLink(id);

	//Ajout du bouton
	$nextMediaStatsLink.append('<i id="next-media-stats"></i>');
	$nextMediaStats = $('#next-media-stats');
	//Ajout de l'icone
	$nextMediaStats.attr('class', 'icon icon-import-big');
	$nextMediaStats.css('left','40px');
}

function updateNextMediaLink(id){
	$nextMediaStatsLink = $('#next-media-stats-link');
	$nextMediaStatsLink.attr('href','http://www.umcookies.com/song.php?id='+id);
};