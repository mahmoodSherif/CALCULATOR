const press = "press";
const ele = Array.from(document.getElementsByClassName("key"));
const ansDiv = document.getElementById("ans");
const rd = 10000000;
let start = true;
let decimalDot = false;
let arr = [0];
let digits = 0;


function setAns(){
    ansDiv.innerText = "";
    arr.forEach(op=>{
        if(typeof op == 'number'){
            ansDiv.innerText += Math.round(op*rd)/rd;
        }else{
            ansDiv.innerText += op;
        }
    });
}
function clear(){
    decimalDot = false;
    digits = 0;
    start = true;
    arr = [0];
}
function keyHandle(key){
    key.classList.add(press);
    if(key.innerText == '='){
        if( typeof arr[arr.length -1] != "number" ){
            return;
        }
        decimalDot = false;
        digits = 0;
        let ans = solve(arr);
        arr = [ans];
    }else if(key.innerText == 'clear'){
        clear();
    }else if("*/-+.".indexOf(key.innerText) != -1){
        if(start){
            return;
        }
        if(key.innerText == '.'){
            if(!decimalDot){
                decimalDot = true;
            }
            return;
        }else{
            decimalDot = false;
            digits = 0;
        }
        arr.push(key.innerText);
    }else{
        if(start){
            start = false;
        }
        if( !arr.length || typeof arr[arr.length -1 ] != 'number' ){
            arr.push(parseInt(key.innerText));
        }else{
            if(decimalDot){
                digits++;
                arr[arr.length - 1] = arr[arr.length - 1]  + parseInt(key.innerText)*Math.pow(10 , -1*digits); 
            }else{
                arr[arr.length - 1] = arr[arr.length - 1]*10 + parseInt(key.innerText);
            }
        }
    }
    setAns();
}
const keys = Array.from(document.getElementsByClassName("key"));
keys.forEach(cur=>cur.addEventListener('click' , (e)=>keyHandle(e.target)));
keys.forEach(cur=>cur.addEventListener("transitionend",(e)=>e.target.classList.remove(press)));
window.addEventListener('keydown' , e=>{
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    console.log(key.innerText);
    keyHandle(key);
    // console.log(e.keyCode);
});