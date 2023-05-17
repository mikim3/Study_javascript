'use strict';
// 심볼형이란?
//'심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용합니다.

// 심볼은 이렇게 만든다.
let id = Symbol();
// 심볼 id에는 "id"라는 설명이 붙습니다.
// 설명은 디버깅에서 유용하지만 프로그래밍 적으로 어떠한 영향도 주지 않는다.
let id2 = Symbol("id");

let id3 = Symbol("id");
let id4 = Symbol("id");

console.log(id3 == id4); // false

let id5 = Symbol("id");

// 심볼은 자동 형변환 안함
// alert(id5); // TypeError: Cannot convert a Symbol value to a string
// 그러나 console.log에서는 일단 출력은 시켜줌
console.log(id5); // Symbol(id)
console.log(id5.toString()) // Symbol(id) 이게 원래 맞음
console.log(id5.description) // Symbol(id) 이게 원래 맞음

///////////////////////////////////////////////////////////////////
/// 숨김프로퍼티

// 심볼을 이용하면 ‘숨김(hidden)’ 프로퍼티를 만들 수 있습니다.
// 숨김 프로퍼티는 외부 코드에서 접근이 불가능하고 값도 덮어쓸 수 없는 프로퍼티입니다.
// 서드파티 코드에서 가지고 온 user라는 객체가 여러 개 있고,
// user를 이용해 어떤 작업을 해야 하는 상황이라고 가정해 봅시다. user에 식별자를 붙여주도록 합시다.
// 식별자는 심볼을 이용해 만들도록 하겠습니다.

let user1 = { // 서드파티 코드에서 가져온 객체
  name: "John"
};

let id6 = Symbol("id");

user1[id6] = 1;

console.log( user1[id6] ); // 심볼을 키로 사용해 데이터에 접근할 수 있습니다.


///////////////////////
///전역 심볼
console.log("-------------------------전역 심볼-------------------------");

// 원래 심볼이 이름이 같아도 서로 다른거를 가르키지만 같은걸 가르키기를 원할떄 전역심볼을 쓰면된다.

// 전역 레지스트리에서 심볼을 읽습니다.
let id20 = Symbol.for("id"); // 심볼이 존재하지 않으면 새로운 심볼을 만듭니다.

// 동일한 이름을 이용해 심볼을 다시 읽습니다(좀 더 멀리 떨어진 코드에서도 가능합니다).
let idAgain = Symbol.for("id");

// 두 심볼은 같습니다.
console.log( id20 === idAgain ); // true

/// 전역심볼 검색
// 해당 전역심볼을 찾을때 keyFor을 쓴다.

// 이름을 이용해 심볼을 찾음
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 심볼을 이용해 이름을 얻음
console.log( Symbol.keyFor(sym) ); // name
console.log( Symbol.keyFor(sym2) ); // id

