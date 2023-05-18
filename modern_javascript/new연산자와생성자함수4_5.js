

// 'new' 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.

// 생성자 함수
// 생성자 함수(constructor function)와 일반 함수에 기술적인 차이는 없습니다.
// 다만 생성자 함수는 아래 두 관례를 따릅니다.

// 함수 이름의 첫 글자는 대문자로 시작합니다.
// 반드시 'new' 연산자를 붙여 실행합니다.

function User(name) {
    // this = {};  (빈 객체가 암시적으로 만들어짐)

    // 새로운 프로퍼티를 this에 추가함
    this.name = name;
    this.isAdmin = false;

    // return this;  (this가 암시적으로 반환됨)
}

let user = new User("보라");

console.log(user.name); // 보라
console.log(user.isAdmin); // false

////////////////////////////
/// 퀴즈

// 계산기 만들기
// 중요도: 5
// 아래와 같은 세 개의 메서드를 가진 생성자 함수, Calculator를 만들어보세요.

// read() – prompt 함수를 이용해 사용자로부터 값 두 개를 받고, 이를 객체 프로퍼티에 저장합니다.
// sum() – 프로퍼티에 저장된 값 두 개를 더한 후 반환합니다.
// mul() – 프로퍼티에 저장된 값 두 개를 곱한 후 반환합니다.

function Calculator()
{

    // 입력

    // 저장
    this.read = function() {
        this.a = 23;
        this.b = 54;
    };

    this.sum = function() {
        return this.a + this.b;
    }

    this.mul = function() {
        return this.a * this.b;
    };
}


let calculator = new Calculator();
calculator.read();

console.log( "Sum=" + calculator.sum() );
console.log( "Mul=" + calculator.mul() );

