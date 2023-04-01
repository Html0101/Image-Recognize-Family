Webcam.set({
    width:350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("webcam");
Webcam.attach('#webcam');

function imagetake(){
    Webcam.snap(function(data_uri) {
        document.getElementById("image_holder").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iP9xYsmgP/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function imageidentify(){
    img = document.getElementById('image_holder');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("name").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}