const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnect from server');
});

socket.on('newMessage', function(message){
    console.log('New message: ', message);
    var e = document.createElement('li');
    var node = document.createTextNode(`${message.from} ${message.createdAt}`);
    e.appendChild(node);
    document.querySelector('ul').appendChild(e);

    var e = document.createElement('li');
    var node = document.createTextNode(message.text);
    e.appendChild(node);
    document.querySelector('ul').appendChild(e);

    
    var div = document.querySelector('div');
    window.scrollTo(0, div.scrollHeight);
});

function sendMessage(){
    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('input').value,
        createdAt: new Date().getTime()
    });

}




