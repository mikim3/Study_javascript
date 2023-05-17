'use strict';

// 자바스크립트에서는 아래와 같이 그냥 객체1 = 객체2로 하면 객체2,1이 같은 참조값을 갖게되고 객체는 복사되지 않는다.
//  객체가 할당된 변수를 복사할 땐 객체의 참조 값이 복사되고 객체는 복사되지 않습니다.


let user = {
    name: "John"
};
let admin = user; // 참조값을 복사함
console.log("admin ==",admin); // "John"
console.log("user ==", user); // "John"

user.name = 'Pete'

console.log("admin ==",admin); // Pete
console.log("user ==", user); // Pete

////////////////////////////////
/// 참조에 의한 비교



let a = {};
let b = a; // 참조에 의한 복사

console.log( a == b ); // true, 두 변수는 같은 객체를 참조합니다.
console.log( a === b ); // true

let a2 = {};
let b2= {}; // 독립된 두 객체

console.log( a2 == b2 ); // false


/////////////////////////////////
///객체 복사, 병합과 Object.assign
console.log("------------------객체 복사, 병합과 Object.assign---------------")

// 기존과 똑같으면서 독립된 객체를 만들 필요가 있다.

// 방법은 있는데 자바스크립트는 객체 복제 내장 메서드를 지원하지 않기 때문에 조금 어렵습니다.
// 사실 객체를 복제해야 할 일은 거의 없습니다. 참조에 의한 복사로 해결 가능한 일이 대다수이죠.

// 정말 복제가 필요한 상황이라면 새로운 객체를 만든다음
// 기존 객체의 프로퍼티들을 순회해 원시 수준까지 프로퍼티를 복사하면 됩니다. 아래와 같이 말이죠.

let user2 = {
    name: "John",
    age: 30
};

let clone = {}; // 새로운 빈 객체

  // 빈 객체에 user 프로퍼티 전부를 복사해 넣습니다.
for (let key in user2) {
    clone[key] = user2[key];
}

  // 이제 clone은 완전히 독립적인 복제본이 되었습니다.
clone.name = "Pete"; // clone의 데이터를 변경합니다.

console.log( "user2 == ",user2.name ); // 기존 객체에는 여전히 John이 있습니다.
console.log( "clone == ",clone.name );

// Object.assign를 사용하는 방법도 있습니다.
// 문법과 동작 방식은 다음과 같습니다.

// 문법 :
// Object.assign(dest, [src1, src2, src3...])
// - 첫 번째 인수 dest는 목표로 하는 객체입니다.
// - 이어지는 인수 src1, ..., srcN는 복사하고자 하는 객체입니다. ...은
// 필요에 따라 얼마든지 많은 객체를 인수로 사용할 수 있다는 것을 나타냅니다.
// - 객체 src1, ..., srcN의 프로퍼티를 dest에 복사합니다. dest를 제외한 인수(객체)의 프로퍼티 전부가 첫 번째 인수(객체)로 복사됩니다.
// - 마지막으로 dest를 반환합니다.


let user3 = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// permissions1과 permissions2의 프로퍼티를 user로 복사합니다.
Object.assign(user3, permissions1, permissions2);

console.log(user3)



/////////////////////////////////
/// 중첩 객체 복사
console.log("---------------------중첩객체복사---------------------")

// 지금까진 user의 모든 프로퍼티가 원시값인 경우만 가정했습니다.
// 그런데 프로퍼티는 다른 객체에 대한 참조 값일 수도 있습니다. 이 경우는 어떻게 해야 할까요?

let user4 = {
    name: "John",
    sizes: {
      height: 182,
      width: 50
    }
};
console.log( user4.sizes.height ); // 182

// 중첩객체 복사는  assign으로 처리 안됨
let user5 = {
    name: "John",
    sizes: {
      height: 182,
      width: 50
    }
};

let clone2 = Object.assign({}, user5);

console.log( user5.sizes === clone2.sizes ); // true, 같은 객체입니다.

// user와 clone는 sizes를 공유합니다.
user5.sizes.width++;       // 한 객체에서 프로퍼티를 변경합니다.
console.log(clone2.sizes.width); // 51, 다른 객체에서 변경 사항을 확인할 수 있습니다.

// 이 문제를 해결하려면 user[key]의 각 값을 검사하면서, 그 값이 객체인 경우
// 객체의 구조도 복사해주는 반복문을 사용해야 합니다. 이런 방식을 '깊은 복사(deep cloning)'라고 합니다.
// 깊은 복사 시 사용되는 표준 알고리즘인 Structured cloning algorithm을 사용하면
// 위 사례를 비롯한 다양한 상황에서 객체를 복제할 수 있습니다.
// 자바스크립트 라이브러리 lodash의 메서드인 _.cloneDeep(obj)을 사용하면
// 이 알고리즘을 직접 구현하지 않고도 깊은 복사를 처리할 수 있으므로 참고하시기 바랍니다.

















