const path = require('path')
const fs = require('fs');

document.addEventListener("DOMContentLoaded", function () {
    const btnLoadFile = document.getElementById('btn-load-file');

    btnLoadFile.addEventListener('click', function (event) {
        console.log(__dirname);

        fs.readFile(path.join(__dirname, 'TODO.txt'), function (err, data) {
            if (err) {
                return console.error(err);
            }
            document.getElementById('file-content').innerText = data.toString();
        });
    });
});