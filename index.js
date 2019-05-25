var objAkun = [
    {
        username:"putra",
        password: "1234"
    },
    {
        username: "riki",
        password: "2345"
    }
]

function handleEnter(event) {
    if(event.keyCode == 13){
        getInfo()
    }
  }

function getInfo() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    
    for (let i = 0; i < objAkun.length; i++) {
        if(username == objAkun[i].username && password == objAkun[i].password) {
            window.location.replace("./tetris.html")
        } else{
            if (username == '' && password == '') {
            document.getElementById('peringatan').innerHTML = 'Isi Username & Password!!';
            } else {
            document.getElementById('peringatan').innerHTML = 'Username & Password Salah!!';
            }
        }
        
    }
}
        
