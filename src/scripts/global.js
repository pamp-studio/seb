function alternateBodyBackgroundImages(a,b){
    document.body.style.backgroundImage = document.body.style.backgroundImage == a ? b : a;
}

window.ondblclick =  function(){
    alternateBodyBackgroundImages('url("/bgs/whitestripe.gif")','url("/bgs/whitestripe-animated--1ms.gif")')
}

window.onscroll = function(){
    alternateBodyBackgroundImages('url("/bgs/whitestripe.gif")','url("/bgs/whitestripe-opposite.gif")')
}

