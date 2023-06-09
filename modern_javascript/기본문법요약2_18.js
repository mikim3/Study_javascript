// https://ko.javascript.info/javascript-specials

////////////////////////// 변수
// let
// const – 한 번 값을 할당하면 더는 값을 바꿀 수 없는 상수를 정의할 때 쓰입니다.
// var는 '오래된' 방식이다.  지금은 let을 쓰는걸 더 권장한다.

// var의 특징은
// 1. 블록스코프를 사용하지 않고 함수스코프나 전역스코프다.
// 즉 if문 안에서 선언해도 밖에서 사용되어진다.
// 2. var는 두번 이상 선언할수 있습니다.  var user; var user;는 에러가 아니다.

// 3. 선언하기 전에 사용 가능하다.이를 보고 끌어올려지기(hoisted)라고 부른다.
// var로 선언한 모든 변수는 함수의 최상위로 끌어올려진다.
function sayHi() {
    phrase = "Hello";
    console.log(phrase); // 이게 되네
    var phrase;
  }
sayHi();


// 자바스크립트는 동적 타이핑을 허용하기 때문에, 자료형을 바꿔가며 값을 할당할 수 있습니다.

let x = 5;
x = "John";
console.log(x)

///
// 자바스크립트는 여덟 가지 기본 자료형을 지원합니다.

// 정수와 부동 소수점을 저장하는 데 쓰이는 숫자형
// 아주 큰 숫자를 저장할 수 있는 BigInt형
// 문자열을 저장하는 데 쓰이는 문자형
// 논리값 true/false을 저장하는 데 쓰이는 불린형
// ‘비어있음’, '존재하지 않음’을 나타내는 null 값만을 위한 독립 자료형 null
// 값이 할당되지 않은 상태를 나타내는 undefined 값만을 위한 독립 자료형 undefined
// 복잡한 자료구조를 저장하는 데 쓰이는 객체형과 고유한 식별자를 만들 때 사용되는 심볼형

// (2^53 - 1) ㅂㅗ다 큰  값  혹은  -(2^53 - 1)보다 작은  값은
// '숫자형'으로 표현 불가 그럴때 BigInt형 사용
const bigInt = 1234567890123456789012345678901234567890n;

// 문자형 즉 string 이라 불리는 타입은 있지만 글자형 즉 char형은 없다. 문자형 한글자면 충분하다.

typeof null == "object" // 언어 자체의 오류로 null을 object로 만들어 버렸다.
typeof function(){} == "function" // 함수는 특별하게 취급됩니다.

console.log(typeof undefined)  // "undefined"
console.log(typeof 0) // "number"
console.log(typeof 10n) //"bigint"
console.log(typeof true )// boolean
console.log(typeof "foo") // string
console.log(typeof Symbol("id")) // "symbol"
// Math는 수학 연산을 제공하는 내장 객체이므로 "object"가 출력됩니다.
// Math에 대해선 숫자형 챕터에서 학습하도록 하겠습니다.
// 내장 객체는 객체형이라는 것을 알려주기 위해 이런 예시를 작성해 보았습니다.
console.log(typeof Math) // "object"
// null이 사실 객체는 아니지만 하위 호환성을 유지하기 위해 이런 오류를 수정안함, 즉 그냥 예외로 기억하기
console.log(typeof null) // "object"
console.log(typeof console.log) // "object"


////////////////// 연산자

console.log('1' + 2); // '12'
console.log(1 + '2'); // '12'


//nullish 병합 연산자 (??)

// nullish 병합 연산자 ??는 피연산자 중 실제 값이 정의된 피연산자를 찾는 데 쓰입니다.
// a가 null이나 undefined가 아니면 a ?? b의 평가 결과는 a이고,
// a가 null이나 undefined이면 a ?? b의 평가 결과는 b가 됩니다.

// 바교연산자

// 동등 연산자 ==는 형이 다른 값끼리 비교할 때 피연산자의 자료형을 숫자형으로 바꾼 후 비교를 진행합니다.
// null과 undefined는 자기끼리 비교할 땐 참을 반환하지만 다른 자료형과 비교할 땐 거짓을 반환합니다.

console.log( 0 == false ); // true
console.log( 0 == '' ); // true
console.log( 0 == '2' ); // false

//일치 연산자 ===는 피연산자의 형을 변환하지 않습니다. 형이 다르면 무조건 다르다고 평가합니다.


