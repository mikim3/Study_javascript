// 객체는 사용자(user), 주문(order) 등과 같이 실제 존재하는
// 개체(entity)를 표현하고자 할 때 생성됩니다.

// 아래 두 객체는 동일하게 동작합니다.
user1 = {
    sayHi: function() {
      console.log("Hello");
    }
};

// 사실 미묘하게 다르긴하지만 일단 pass
user2 = {
    sayHi() { // "sayHi: function()"과 동일합니다.
      console.log("Hello");
    }
};


////////////////////////////////////////
/// 메서드와 this

// 메서드에서 객체에 저장된 정보에 접근할 수 있어야 구현가능한 경우가 있다. 그럴땐 this를 써야한다.

let user3 = {
    name: "John",
    age: 30,

    sayHi() {
      // 'this'는 '현재 객체'를 나타냅니다.
      console.log(this.name);
    }
};

user3.sayHi(); // John

// this가 필요한 경우

// 그런데 이렇게 외부 변수를 사용해 객체를 참조하면 예상치 못한 에러가 발생할 수 있습니다.
// user를 복사해 다른 변수에 할당(admin = user)하고, user는 전혀 다른 값으로 덮어썼다고 가정해 봅시다.
// sayHi()는 원치 않는 값(null)을 참조할 겁니다.


let user4 = {
    name: "Mike",
    age: 30,
    sayHi() {
    //   console.log( user4.name ); // Error: Cannot read property 'name' of null
        // this로 해결
        console.log( this.name ); // Mike
    }
};


let admin = user4;
user4 = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.

////////////////////////////
/// 자유로운 this
console.log("----------------------------자유로운 this -------------------")

// 자바스크립트의 this는 다른 프로그래밍 언어의 this와 동작 방식이 다릅니다.
// 자바스크립트에선 모든 함수에 this를 사용할 수 있습니다.
// 아래와 같이 코드를 작성해도 문법 에러가 발생하지 않습니다.
// this 값은 런타임에 결정됩니다. 컨텍스트에 따라 달라지죠.

let user5 = { name: "John" };
let admin2 = { name: "Admin" };

function sayHi() {
  console.log( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user5.f = sayHi;
admin2.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user5.f(); // John  (this == user)
admin2.f(); // Admin  (this == admin)

admin2['f'](); // Admin (점과 대괄호는 동일하게 동작함)

//////////////////////////////////
/// this가 없는 화살표 함수

// 화살표 함수는 일반 함수와는 달리 ‘고유한’ this를 가지지 않습니다.
// 화살표 함수에서 this를 참조하면, 화살표 함수가 아닌
// ‘평범한’ 외부 함수에서 this 값을 가져옵니다.

// 아래 예시에서 함수 arrow()의 this는 arrow의 this가 아닌
// 외부 함수 user6.sayHi()의 this가 됩니다.
let user6 = {
    firstName: "보라",
    sayHi() {
      let arrow = () => console.log(this.firstName);
      arrow();
    }
};

user6.sayHi(); // 보라
// object.method() 로 호출했을때 method()안에 this는 object를 참조한다.

// 화살표 함수는 자신만의 this를 가지지 않는다는 점에서 독특합니다.
// 화살표 함수 안에서 this를 사용하면, 외부에서 this 값을 가져옵니다.



/////////////////////////////////////////
// 퀴즈!!!!!

// 객체 리터럴에서 'this' 사용하기
// 중요도: 5
// 함수 makeUser는 객체를 반환합니다.
// 이 객체의 ref에 접근하면 어떤 결과가 발생하고, 그 이유는 뭘까요?

// function makeUser() {
//     return {
//       name: "John",
//       ref: this
//     };
// };

// let user7 = makeUser();
// // makeUser의 name에 접근 undefined 출력
// console.log( user7.ref.name ); // 결과가 어떻게 될까요?
// alert( user7.ref.name ); // Error: Cannot read property 'name' of undefined

// function makeUser(){
//     return this; // 이번엔 객체 리터럴을 사용하지 않았습니다.
// }
// console.log( makeUser().name ); // Error: Cannot read property 'name' of undefined
// // alert( makeUser().name ); // Error: Cannot read property 'name' of undefined

// 오류 해결버젼
// 이렇게 하면 user.ref()가
// 메서드가 되고 this는 . 앞의 객체가 되기 때문에 에러가 발생하지 않습니다.
function makeUser() {
    return {
      name: "JohnSina",
      ref() {
        return this;
      }
    };
};

let user = makeUser();

console.log( user.ref().name ); // JohnSina







//////////////////////////


let user20 = { 
  name: "John" ,
  user21 : {
    name :"mikim3",
    sayHi2 : function () {
      console.log("sayHi2 arrow")
      let arrow = () => console.log(this.name);
      arrow();
      console.log("sayHi2 normal")
      console.log(this.name)
    }
  },
};
let admin20 = { name: "Admin" };

function sayHi() {
  console.log( this.name );
}

// function sayHi2() {
//   let user21 = {name: "mikim3"};
//   sayHi();  
//   console.log("hhh" + this.name );
// }

// 별개의 객체에서 동일한 함수를 사용함
user20.f = sayHi;
admin20.f = sayHi;
user20.user21.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user20.f(); // John  (this == user)
admin20.f(); // Admin  (this == admin)
console.log("ggogo")
user20.user21.f();
console.log("ggogosss")
user20.user21.sayHi2();

console.log(this.name);

admin20['f'](); // Admin (점과 대괄호는 동일하게 동작함)
