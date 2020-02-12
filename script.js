var i = 0;

document.getElementsByClassName('klik').addEventListener('click', function(){
    console.log(this);
})

console.log(subjects[0])

function next(){
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('stellingPage').style.display = 'block'
}

function goBack(){
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('stellingPage').style.display = 'none'
}

