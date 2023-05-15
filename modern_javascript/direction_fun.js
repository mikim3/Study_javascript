let sum = (a,b) => a + b

/*

let sum = function(a,b) {
    return a + b;
};

*/

let double = (a) => a * 2

console.log("double == " + double(3) + double(4))


// 인자 없어도 됨
let sayHi = () => console.log("ㅇㅏㄴ녀ㅇ하세요");

sayHi();




let age = 17;
// let age = prompt("나이를 알려주세요.");

let welcome = (age < 18) ?
    () => console.log('안녕'):
    () => console.log('안녕하세요');

welcome();


///본문이 여러줄인 화살표 함수 ({})

let sum2 = (a,b) => {
    result = a + b;
    return result;
}
console.log(sum2(1,13))
// console.log(sum2(1 + 13)) // NaN오타

