const press = "press";
const ele = Array.from(document.getElementsByClassName("key"));
const ansDiv = document.getElementById("ans");
let st = "0";
let start = true;
let arr = [0];
function setAns(){
    ansDiv.innerText = st;
}
function keyHandle(key){
    key.classList.add(press);
    if(key.innerText == '='){
        let ans = solve(arr);
        arr = [ans];
        st = String(ans);
    }else if("*/-+".indexOf(key.innerText) != -1){
        if(start){
            return;
        }
        st += " " + key.innerText + " ";
        arr.push(key.innerText);
    }else{
        if(start){
            st = "";
            start = false;
        }
        if( !arr.length || typeof arr[arr.length -1 ] != 'number' ){
            arr.push(parseInt(key.innerText));
        }else{
            arr[arr.length - 1] = arr[arr.length - 1]*10 + parseInt(key.innerText);
        }
        st += key.innerText;
    }
    setAns();
}
const keys = Array.from(document.getElementsByClassName("key"));
keys.forEach(cur=>cur.addEventListener('click' , (e)=>keyHandle(e.target)));
keys.forEach(cur=>cur.addEventListener("transitionend",(e)=>e.target.classList.remove(press)));