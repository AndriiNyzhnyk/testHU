const dropArea = document.getElementById('drop-area');
let progressBar = document.getElementById('progress-bar');
let filesDone = 0;
let filesToDo = 0;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

dropArea.addEventListener('drop', handleDrop, false);


function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('highlight');

}
function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    initializeProgress(files.length);
    files.forEach(uploadFile);
    files.forEach(previewFile);
}

function uploadFile(file) {
    let url = '/upload';
    let formData = new FormData();

    formData.append('file', file);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then((response) => {
        progressDone();
        return Promise.resolve(response);
    })
    .then((response) => {
        console.log('File uploaded!');
    })
    .catch((error) => {
        console.log('Request failed', error);
    })
}


function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let img = document.createElement('img');
        img.src = reader.result;
        document.getElementById('gallery').appendChild(img)
    };
}

function initializeProgress(numfiles) {
    progressBar.value = 0;
    filesDone = 0;
    filesToDo = numfiles;
}

function progressDone() {
    filesDone++;
    progressBar.value = filesDone / filesToDo * 100;
}