song = "";
status = "";
objects = [];

function preload(){
    song = loadSound('best_alarm.mp3');
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
        
        for (i = 0; i < objects.lenght; i++)
        {
            document.getElementById("status").innerHTML = " Status: Objetos detectados";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         //tinha um fecha chaves aqui, mas estava no lugar errado
        
            if(objects[i].label == "person")
            {
                document.getElementById("numberOfObjects").innerHTML = "Bebê encontrado";
                console.log("stop");
                song.stop();
            }
            else
            {
                document.getElementById("numberOfObjects").innerHTML = "Bebê não  encontrado";
                console.log("play");
                song.play();
            }
        } //faltou esse fecha chaves no código (esse é para finalizar o for)
        
        if(objects.lenght == 0)
        {
            document.getElementById("numberOfObjects").innerHTML = "Bebê não encontrado"
            console.log("play");
            song.play();
        }
    } //faltou esse fecha chaves no código (esse é para finalizar o primeiro if
}
    
function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results){
    if (error) {
        console.log(error)
    }
    console.log(results);
    objects = results;
}

