document.getElementById('lockForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Para prevenir o recarregamento da página
    var lockTimeStart = document.getElementById('lockTimeStart').value;
    var lockTimeEnd = document.getElementById('lockTimeEnd').value;
    sendLockTimes(lockTimeStart, lockTimeEnd);
});

function sendLockTimes(lockTimeStart, lockTimeEnd) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://endereco-do-seu-arduino/lockTimes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Requisição bem-sucedida
            document.getElementById('status').style.backgroundColor = 'green';
            document.getElementById('status').innerText = 'Horários enviados com sucesso !!';
        } else {
            // Requisição falhou
            document.getElementById('status').style.backgroundColor = 'red';
            document.getElementById('status').innerText = 'Erro, requisição não enviada com sucesso.';
        }
    };

    xhr.onerror = function() {
        // Erro de conexão
        document.getElementById('status').style.backgroundColor = 'red';
        document.getElementById('status').innerText = 'Erro de conexão.';
    };

    xhr.send(JSON.stringify({ lockTimeStart: lockTimeStart, lockTimeEnd: lockTimeEnd }));
}
