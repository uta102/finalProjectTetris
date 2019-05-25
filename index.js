function handleEnter(event) {
    if(event.keyCode == 13){
        var nickName = document.getElementById("nickname1")
        getInfo()
    }
  }

  var nickName = document.getElementById("nickname1")
function getInfo() {
    localStorage.setItem('nickName', nickname1.value)

    var storage = localStorage.getItem('nickName');
    if (storage) {
        window.location.replace("./test.html")
    } else {
        document.getElementById('peringatan').innerHTML = 'Isi nickname';
    }
}
        
