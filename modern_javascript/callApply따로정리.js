var kim = {name: 'kim', first:10, second:22}
var lee = {name: 'lee', first:10, second:15}
function sum() {
    return this.first + this.second;
}
function sum2(prefix) {
    return prefix + (this.first + this.second);
}

// func.call(this를누구로쓸지, 그 함수들의 인자값)

// 인자를 안 받는 함수가 있을때  그 안에 this값을 call로 바꿀수 있다.
console.log("sum.call(kim)", sum.call(kim));
console.log("sum.call(lee)", sum.call(lee));

console.log("sum2.call(kim)", sum2.call(kim, '=> '));
console.log("sum2.call(lee)", sum2.call(lee, ': '));

////////////////////////
/// bind

// call이 호출될때마다 this를 (일시적으로) 바꿨다면
// bind는 완전바꿔서 고정해서 그 함수를 반환

// sum2가 바뀐게 아니라 sum2에서 bind에 맞게 바뀐 값이 반환된다.
var kimSum = sum2.bind(kim, '-> ');
console.log("kimSum", kimSum());












