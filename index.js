function handleEnter(event) {
    if(event.keyCode == 13){
        getInfo()
    }
  }

  var nickname = document.getElementById("nickname1")
function getInfo() {
    
    localStorage.setItem('nickname', nickname1.value)

    var storage = localStorage.getItem('username');
    if (storage == nickname) {
        window.location.replace("./test.html")
    } else if (storage == "") {
        document.getElementById('peringatan').innerHTML = 'Isi nickname';
    }
}
        
