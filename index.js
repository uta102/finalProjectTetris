var nickName = document.getElementById("nickname1")
function handleEnter(event) {
    if(event.keyCode == 13){
        getInfo()
    }
  }

  
function getInfo() {
    localStorage.setItem('nickName', nickname1.value)
    var storage = localStorage.getItem('nickName');
    if (storage) {
        window.location.replace("./test.html")
    } else {
        document.getElementById('peringatan').innerHTML = 'Isi nickname';
    }
}
        
