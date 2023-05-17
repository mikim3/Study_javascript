//


// 객체는 중괄호 {...}를 이용해 만들 수 있다.  중괄호 안에는 '키(key) : 값(value' 쌍으로 구성된
// 프로퍼티를 여러 개  넣을수 있는데, 키

// 키에는 문자형, 값 에는 모든 자료형 가능


let user = new Object(); // '객체 생성자' 문법
let user2 = {};


let user3 = {     // 객체
    name: "John",  // 키: "name",  값: "John"
    age: 30        // 키: "age", 값: 30
};


let user4 = {
    name: "John",
    age: 30,
    "likes birds": true  // 복수의 단어는 따옴표로 묶어야 합니다.
};

// 이런 쉼표를 ‘trailing(길게 늘어지는)’ 혹은 ‘hanging(매달리는)’ 쉼표라고 부릅니다.
//  이렇게 끝에 쉼표를 붙이면 모든 프로퍼티가 유사한 형태를 보이기 때문에 프로퍼티를 추가, 삭제, 이동하는 게 쉬워집니다.
let user5 = {
    name: "John",
    age: 30, // 끝에 쉼표
  }


const user6 = {
    name: "John"
};

// 오류가 날 것 같지만 아니다. const user의 값을 바꾸면 오류지만 user의 내용을 바꾸는 것은 허용한다.
user6.name = "Pete"; // 오류아님

console.log(user6.name); // Pete

// 문법 에러가 발생합니다.
// user.likes birds = true // 에러!!!

// 위와 같이 '.'은 키가 '유효한 변수 식별자'인 경우에만 사용 가능하다. " "도 넣으면 안되고 숫자로 시작하면 안되고
// "$" , "_"를 제외한 특수 문자를 사용하면 안된다.
// 유효한 변수 식별자가 아닌경우 '점' 대신 '대활호 표기법'을 사용하면 된다.

let user7 = {};

//set
user7["likes birds"] = true

//get
console.log(user7["likes birds"]); // true


//delete
delete user7['likes birds'];
console.log(user7["likes birds"]); // undefined


let key = "likes birds";

// user["likes birds"] = true; 와 같습니다.
user7[key] = true;
console.log(user7["likes birds"]); // true

// but!!!!!!!!! '.'표기법으로는 불가능
let user8 = {
    name: "John",
    age: 30
};

let key2 = "name";
console.log( user8.key2 ) // undefined

/////////////////////////////

/// 계산된 프로퍼티
// 객체를 만들 때 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우,
// 이를 계산된 프로퍼티(computed property) 라고 부릅니다.


// let fruit = prompt("어떤 과일을 구매하시겠습니까?", "apple");
let fruit = "apple";

let bag = {
  [fruit]: 5, // 변수 fruit에서 프로퍼티 이름을 동적으로 받아 옵니다.
};

console.log( bag.apple ); // fruit에 "apple"이 할당되었다면, 5가 출력됩니다.

///단축 프로퍼티
// 위 예시의 프로퍼티들은 이름과 값이 변수의 이름과 동일하네요. 이렇게 변수를 사용해 프로퍼티를 만드는 경우는
// 아주 흔한데, 프로퍼티 값 단축 구문(property value shorthand) 을 사용하면 코드를 짧게 줄일 수 있습니다.

// function makeUser(name, age) {
//     return {
//       name: name,
//       age: age,
//       // ...등등
//     };
// }

// 위와 같음
function makeUser(name, age) {
    return {
        name, // name: name 과 같음
        age,  // age: age 와 같음
    };
}


let user9 = makeUser("John", 30);
console.log(user9.name); // John

/// 프로퍼티 이름의 제약사항

// 아시다시피 변수 이름(키)엔 ‘for’, ‘let’, ‘return’ 같은 예약어를 사용하면 안됩니다.
// 그런데 객체 프로퍼티엔 이런 제약이 없습니다.

// 이와 같이 프로퍼티 이름엔 특별한 제약이 없습니다. 어떤 문자형, 심볼형 값도 프로퍼티 키가 될 수 있죠(식별자로 쓰이는 심볼형에 대해선 뒤에서 다룰 예정입니다).
// 문자형이나 심볼형에 속하지 않은 값은 문자열로 자동 형 변환됩니다.
// 예시를 살펴봅시다. 키에 숫자 0을 넣으면 문자열 "0"으로 자동변환됩니다.

let obj = {
    0: "test" // "0": "test"와 동일합니다.
  };

// 숫자 0은 문자열 "0"으로 변환되기 때문에 두 얼럿 창은 같은 프로퍼티에 접근합니다,
console.log( obj["0"] ); // test
console.log( obj[0] ); // test (동일한 프로퍼티)


// ‘in’ 연산자로 프로퍼티 존재 여부 확인하기
// 자바스크립트 객체의 중요한 특징 중 하나는 다른 언어와는 달리,
// 존재하지 않는 프로퍼티에 접근하려 해도 에러가 발생하지 않고 undefined를 반환한다는 것입니다.

// 이런 특징을 응용하면 프로퍼티 존재 여부를 쉽게 확인할 수 있습니다.

let user10 = {};

console.log( user.noSuchProperty === undefined ); // true는 '프로퍼티가 존재하지 않음'을 의미합니다.

// 위에 처럼 판별할 수도 있지만 더 좋은 문법이 있다.
// "key" in object

// ex)
let user11 = { name: "John", age: 30 };

blabla = "name";
console.log( "age" in user11 ); // user.age가 존재하므로 true가 출력됩니다.
console.log( "blabla" in user11 ); // user.blabla는 존재하지 않기 때문에 false가 출력됩니다.
console.log( blabla in user11 ); //

// (=== undefined)로도 충분한데 in 문법이 왜 생겼을까 생각할 수도 있다.
// 하지만 in없이는 판별 안되는 부분도 있다.

let obj2 = {
    test: undefined
};

// in 없이 시도 그러나 true가 나옴 원래대로면 undefined니까 없는 프로퍼티로 생각해야하지만 지금은 값이
// undefined인 경우임 즉 원래 방법으로 해결불가
console.log( obj2.test === undefined);
console.log( obj2.test ); // 값이 `undefined`이므로, 얼럿 창엔 undefined가 출력됩니다. 그런데 프로퍼티 test는 존재합니다.

console.log( "test" in obj2 ); // `in`을 사용하면 프로퍼티 유무를 제대로 확인할 수 있습니다(true가 출력됨).


/////////////////////
/// for ... in 문법
console.log("--------------for ... in 문법-------------------")

/// 문법 :
// for (key in object) {
//     // 각 프로퍼티 키(key)를 이용하여 본문(body)을 실행합니다.
// }


let user12 = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user12) {
// 키
console.log(key);  // name, age, isAdmin
// 키에 해당하는 값
console.log( user12[key] ); // John, 30, true
}

////////////////////////
// 객체 정렬 방식

// 객체는 '특별한 방식으로 정렬’됩니다.
// 정수 프로퍼티(integer property)는 자동으로 정렬되고,
// 그 외의 프로퍼티는 객체에 추가한 순서 그대로 정렬됩니다. 자세한 내용은 예제를 통해 살펴봅시다.

// 아래 객체엔 국제전화 나라 번호가 담겨있습니다.

let codes = {
    아무값 : "우리나라",
    "49": "독일",
    "41": "스위스",
    "+49" : "독크일",
    "-12": "영국",
    // ..,
    "1": "미국"
  };

  for (let code in codes) {
    console.log(code); // 1, 41, 44, 49 순으로 출력
  }

/// 참고로 '1.2' '+49' '-12'처럼 변형을 해야 정수가 되는 수는 정수 프로퍼티가 아니다.



//////////////////

// 지금까진 '순수 객체(plain object)'라 불리는 일반 객체에 대해 학습했습니다.

// 자바스크립트에는 일반 객체 이외에도 다양한 종류의 객체가 있습니다.

// Array – 정렬된 데이터 컬렉션을 저장할 때 쓰임
// Date – 날짜와 시간 정보를 저장할 때 쓰임
// Error – 에러 정보를 저장할 때 쓰임
// 기타 등등

// 객체마다 고유의 기능을 제공하는데, 이에 대해선 추후 학습

// 사람들은 종종 'Array 타입’이나 'Date 타입’이라는 용어를 쓰곤 합니다.
// 사실 Array와 Date는 독립적인 자료형이 아니라 '객체’형에 속합니다.
// 객체에 다양한 기능을 넣어 확장한 또 다른 객체이죠.

////////////////////////////////////////
////// 퀴즈!

// 객체가 비어있는지 확인하기
// 중요도: 5
// 객체에 프로퍼티가 하나도 없는 경우 true,
// 그렇지 않은 경우 false를 반환해주는 함수 isEmpty(obj)를 만들어 보세요.

function isEmpty(obj)
{
    for (let key in obj) {
        return false
    }
    return true
}

let schedule = {};
console.log( isEmpty(schedule) ); // true
schedule["8:30"] = "get up";
console.log( isEmpty(schedule) ); // false


// 프로퍼티 합계 구하기
// 중요도: 5
// 모든 팀원의 월급에 대한 정보를 담고 있는 객체가 있다고 해봅시다.

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let sum = 0;

for (key in salaries)
    sum += salaries[key];
console.log((sum))

