class Animal {
    constructor(name) {
      this.speed = 25;
      this.name = name;
    }
}
  
class Rabbit extends Animal {
    constructor(name, earLength) {
      super(name);
      this.earLength = earLength;
    }
}
  
  // 이제 에러 없이 동작합니다.
  let rabbit = new Rabbit("흰 토끼", 10);
  console.log(rabbit.name); // 흰 토끼
  console.log(rabbit.earLength); // 10
  console.log(rabbit.speed); // 