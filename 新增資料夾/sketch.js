let jsondata;
let btns=[]
// 預載入
function preload(){
//   下載json資料
  jsondata=loadJSON('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-11-02&minmagnitude=5');
}
// 初始
function setup() {
  createCanvas(400, 400,WEBGL);
  // console.log(jsondata.features);
  
  jsondata.features.forEach((v)=>{
//     每次都要運算
    let lat = v.geometry.coordinates[0];
    let lng = v.geometry.coordinates[1];
    let mag = v.properties.mag;
    // noStroke()
    fill(255,0,0,30);
    circle( map(lat,-180,180,-width/2,width/2),
            map(lng,-90,90,-height/2,height/2),
            mag*mag);
    btns.push(new btn( map(lat,-180,180,-width/2,width/2),
                        map(lng,-90,90,-height/2,height/2),
                      mag*mag
                     ))
//     儲存起來以後直接使用    
    // let loc={
    //   lat: map(lat,-180,180,0,width),
    //   lng: map(lng,-90,90,0,height),
    //   mag: mag*mag
    // }
    // cs.push(loc);
  })
  // console.log(cs);
}
// 重複
function draw() {
  background(220);
  btns.forEach((b)=>{
    b.display();
  })
  console.log(mouseX)
}
class btn{
  constructor(x=0,y=0,s=20){
    this.x=x
    this.y=y
    this.s=s
  }
  display(){
    push();
     translate(this.x,this.y)
    //3D畫面與2D滑鼠座標的共同應用
     if (dist(mouseX-width/2,mouseY-height/2,this.x,this.y)<this.s/2){
     
       fill(255,0,0,150)
       this.a+=0.1
     }else{
       fill(0,255,0,150)
     }
      rotate(this.a)
     box(this.s)
    pop();
  }
}
