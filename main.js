img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detexting Objects";


}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.lenght; i++){
            document.getElementById("status").innerHTML = " Status: Objeto detectado";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: "+ objetcs.lenght;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
    /*
    fill("red");
    text("Dog", 45, 75);
    noFill();
    stroke("red");
    rect(30, 60, 450, 350);
    fill("red");
    text("Cat", 320, 120);
    noFill();
    stroke("red");
    rect(300, 90, 270, 320);
    */
}
function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.log(error)
        objects = results;
    }
    console.log(results);
}

