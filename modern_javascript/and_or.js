
// javaScript는 논리연산자가 살짝 남다르다.
// 한마디로 말하자면 AND OR 둘다 연산의 마지막 부분에대하여 반환해준다.
// AND는 falsy 값이 나오면 더이상의 연산이 의미가 없음으로 falsy가 나오면 바로 그 값을 반환해준다.
// OR는 truthy 값이 나오면 더이상의 연산이 의미가 없음으로 truthy가 나오면 바로 그 값을 반환해준다.

result = true || console.log("not printed"); // 하나라도
console.log(result);

false || console.log("printed");





