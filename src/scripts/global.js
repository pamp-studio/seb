function alternateBodyBackgroundImages(a,b){
    document.body.style.backgroundImage = document.body.style.backgroundImage == a ? b : a;
}

function createAudioPlayerHTML(){
    var id = 'audioPlayer';
    if(document.getElementById(id)==null){
       var container = document.createElement('div');
       var audioElement = document.createElement('audio');
       var infoText = document.createElement('p');
       audioElement.id = id;
       container.id = id+'Container';
       container.id = id+'InfoText';
       container.append(audioElement);
       container.append(infoText);
       document.body.append(container);
    };
}

function playTrackInPlaylist(index,playlist){
    var id = 'audioPlayer';
    if(document.getElementById(id)==null){
        createAudioPlayerHTML();
    }
    var audioElement = document.getElementById(id);
    audioElement.src = playlist[index].src;
    var infoText = document.getElementById(id+'InfoText');
    infoText.innerHTML = playlist[index].title;
}

window.ondblclick =  function(){
    alternateBodyBackgroundImages('url("/bgs/whitestripe.gif")','url("/bgs/whitestripe-animated--1ms.gif")')
}

window.onscroll = function(){
    alternateBodyBackgroundImages('url("/bgs/whitestripe.gif")','url("/bgs/whitestripe-opposite.gif")')
}



