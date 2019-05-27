const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20); //dengan scale untuk menentuka skala context (skala si potongan tetris)

function buatPotonganTetris(str) {
    if ( str === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (str === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (str === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (str === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (str === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (str === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (str === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

const colors=[
    null,
    './image/red.png',
    './image/purple.png',
    './image/blue.png',
    './image/lightBlue.png',
    './image/green.png',
    './image/yellow.png',
    './image/orange.png'
];

//membuat const arena dan obj player bisa bertabrakan / stuck
function batasPapanGame(arena, player) {
    const m = player.matrix
    const o = player.pos
    for (let baris = 0; baris < m.length; baris++){
        for (let kolom = 0; kolom < m[baris].length; kolom++) {
            if (m [baris][kolom] !== 0 &&
               (arena [baris + o.baris] && 
                arena [baris + o.baris][kolom + o.kolom]) !== 0) {
                return true
            }
        }
    }
    return false
}

//create matrix di dalam array agar potongan tetris / matrix berhenti
function buatMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}

const arena = buatMatrix(12,20) //jumlah array pada arena 12 kolom 20 baris

//papan game area yang akan berisi game tetris
function draw(){
    context.fillStyle = 'rgb(0, 0, 0)'; //properti canvas fillstyle mengisi papan game dengan warna
    context.fillRect(0, 0, canvas.width, canvas.height); //dengan  fillrect mengatur posisi fill papan game dan mengatur lebar tingginya
    
    updateScore();
    drawMatrix(arena, {kolom:0, baris:0});
    drawMatrix(player.matrix, player.pos) //posisi tetris pieces 
}

//posisi tetris pieces
function drawMatrix(matrix, offset) {
    matrix.forEach (function(row, baris) {
        row.forEach(function (value, kolom){
            if (value !== 0){
                // context.fillStyle = colors[value]; //warna tetris pieces 
                // context.fillRect(kolom + offset.kolom, //untuk papan gamenya
                //                  baris + offset.baris,
                //                  1, 1); //lebar dan tinggi potongan tetris
                let imgTag=document.createElement("IMG");
					imgTag.src=colors[value];
					context.drawImage(imgTag , kolom + offset.kolom , baris + offset.baris , 1 , 1);
            }
        });
    });
}

//merge posisi baris dan kolom arena dan player
function merge(arena, player) {
    player.matrix.forEach(function (row, baris) {
        row.forEach(function (value, kolom) {
            if (value !== 0){
                arena [baris + player.pos.baris][kolom + player.pos.kolom] = value;
            }
        })
    })
}

function playerDrop() {
    player.pos.baris++  //baris untuk player posisi di tambah 
    if (batasPapanGame(arena, player)) { 
        player.pos.baris--; 
        merge(arena, player)
        sapuArena ();
        playerRiset ();
        updateScore ();
    }
    time = 0 //bila sudah mencapai lebih dari dropInterval time di reset kembali
}

//membuat matrix berjalan
let dropInterval = 60;
let time = 0;
function update(){
    time++
    // console.log(time)
    if (time > dropInterval) {
      playerDrop();
    }
    draw();
}

//menghilangkan bug rotasi kanan kiri atas bawah
function playerRotasi(dir) {
    const pos = player.pos.kolom;
    let offset = 1;
    rotasi(player.matrix, dir)
    while (batasPapanGame(arena, player)) {
        player.pos.kolom += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotasi(player.matrix, -dir);
            player.pos.kolom = pos;
            return;
        }
    }
}

//rotasi matrix atau potongan tetris
function rotasi(matrix, dir) {
    for (let baris = 0; baris < matrix.length; baris++) {
        for (let kolom = 0; kolom < baris; kolom++) {
            [ matrix[kolom][baris],
              matrix[baris][kolom],
            ] = [ matrix[baris][kolom],
                  matrix[kolom][baris],
                ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse()
    }
}

//reset potongan tetris untuk merandom matrix tetris yang keluar
function playerRiset() {
    const pieces = 'ILJOTSZ'
    player.matrix = buatPotonganTetris (pieces [pieces.length * Math.random() | 0])
    player.pos.baris = 0;
    player.pos.kolom = (arena[0].length / 2 | 0) -
                       (player.matrix[0].length / 2 | 0)
    if (batasPapanGame(arena, player)){
        arena.forEach(row => row.fill(0))
        player.score = 0;
        gameRun=false;
    }
}

//fungsi menyapu index yanga da di dalam array
function sapuArena() {
    let rowcount = 1;
    game : for (let baris = arena.length - 1; baris > 0; baris--) {
        for (let kolom = 0; kolom < arena[baris].length; kolom++) {
           if (arena[baris][kolom] === 0){
               continue game;
            }
        }
    const row = arena.splice(baris, 1)[0].fill(0)
    arena.unshift(row)
    ++baris;
    player.score += rowcount * 10;
    rowcount *= 2;
    }
}

const player = {
    pos: {kolom:5, baris:0},
    matrix: null,
    score : 0,
}

function playerMove(arah) {
    player.pos.kolom += arah
    if(batasPapanGame(arena, player))
    player.pos.kolom -= arah
}

//menggunakan event keydown untuk menentukan keycode untuk menggerakan kekanan dan kiri si potongan tetris
document.addEventListener('keydown', control);
function control(event) {
    if (event.keyCode == 37){
        playerMove(-1)
    } else if (event.keyCode == 39){
        playerMove(+1)
    } else if (event.keyCode == 40){
        if(gameRun){
            playerDrop();
        }
    } else if (event.keyCode == 38){
        playerRotasi (+1)
    }
}

function updateScore(){
    context.font="bold 1px Techno";
    context.fillStyle="#ffffff";
    context.textAlign="left";
    context.textBaseline="top";
    context.fillText("Score:"+ player.score, 0.2,0);
    if(player.score < 50){
        dropInterval = 60;
    } else if (player.score >= 51 && player.score <= 100){
        dropInterval = 50;
    } else if (player.score >= 101 && player.score <= 150){
        dropInterval = 40;
    } else if (player.score >= 151 && player.score <= 200){
        dropInterval = 30;
    } else if (player.score >= 201 && player.score <= 250){
        dropInterval = 20;
    } else if (player.score > 251){
        dropInterval = 10;
    }
};

let gameLoop;
let gamerun = false;
playerRiset()
update()
gameOver()

function gameOver() {
	clearInterval(gameLoop);
	context.font="2px Techno";
	context.fillStyle="#ffffff";
	context.textAlign="center";
	context.textBaseline="middle";
	context.fillText("Game Over",(canvas.width/20)/2,(canvas.width/20)/2);
	document.getElementById("start_game").disabled=false;
}

document.getElementById("start_game").onclick=function(){
    gameRun=true;
    playerRiset();
    gameLoop=setInterval(function(){
        if(gameRun){
            update();
        }
        else{
            gameOver();
        }
    },10);
    this.disabled=true;
};

var storage = localStorage.getItem('nickName');
document.getElementById('namanick').innerHTML = 'Selamat Datang ' +storage;