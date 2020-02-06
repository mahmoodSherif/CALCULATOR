const inf = "inf";
function add(a , b){
    return a + b;
}
function sub(a , b){
    return a - b;
}
function mul(a , b){
    return a * b;
}
function div(a , b){
    if(b == 0){
        return inf;
    }
    return a / b;
}
function op(a , b , o){
    switch(o){
        case '+':
            return add(a , b);
        case '-':
            return sub(a , b);
        case '*':
            return mul(a , b);
        case '/':
            return div(a , b);
    }
}
function pri(x){
    if(x == '+' || x == '-'){
        return 1;
    }
    if(x == '*' || x == '/'){
        return 2;
    }
}
function solve(s){
    let opSt = [];
    let numSt = [];
    for(let i = 0;i<s.length;i++){
        if(typeof s[i] == 'number'){
            numSt.push(s[i]);
        }else{
            let cur = s[i];
            while(opSt.length && pri(opSt[opSt.length - 1]) >= pri(s[i])){
                let s = numSt.pop();
                let f = numSt.pop();
                let res = op(f , s , opSt[opSt.length - 1]);
                numSt.push(res);
                opSt.pop();
            }
            opSt.push(s[i]);
        }
    }
    while(opSt.length){
        let s = numSt.pop();
        let f = numSt.pop();
        let res = op(f , s , opSt[opSt.length - 1]);
        numSt.push(res);
        opSt.pop();
    }
    return numSt[0];
}