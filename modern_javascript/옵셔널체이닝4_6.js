let user = {}; // 주소 정보가 없는 사용자

// console.log(user.address.street); // TypeError: Cannot read property 'street' of undefined

console.log( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.
console.log( user?.address ); // undefined
// console.log( user?.address.street ); // TypeError: Cannot read properties of undefined

let user2 = null;

console.log( user2?.address ); // undefined
console.log( user2?.address.street ); // undefined

//////////////////////////
///
// ?.은 delete와 조합해 사용할 수도 있습니다.

delete user?.name; // user가 존재하면 user.name을 삭제합니다.
