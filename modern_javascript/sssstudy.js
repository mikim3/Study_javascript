// in은 내부 다돌림
// on은 이터가능한 것만 돌림
// of 

// class User {

//     constructor(name) {
//       // setter를 활성화합니다.
//       this.name = name;
//     }
  
//     get name() {
//       return this._name;
//     }
  
//     set name(value) {
//       if (value.length < 4) {
//         console.log("이름이 너무 짧습니다.");
//         return;
//       }
//       this._name = value;
//     }
  
//   }
  
// let user = new User("보라xxxxxx");

// //   user.name``
// console.log(user._name); // 보라
// console.log(user.name); // 보라
// console.log(user); // 보라

// user = new User(""); // 이름이 너무 짧습니다.


class User {

    ['say' + 'Hi']() {
      console.log("Hello");
    }
  
  }
  
new User().sayHi();