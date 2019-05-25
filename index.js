var nickname = document.getElementById("nickname1")
function infoLogin() {
	localStorage.setItem('nickname', nickname1.value)

	var storeName = localStorage.getItem("nickname");
    if(storeName) {
        window.location.replace("./test.html")
    } else {
        document.getElementById('peringatan').innerHTML = 'Isi nickName';
	}
}

function handleEnter(event) {
    if(event.keyCode == 13){
        infoLogin ();
    }
}