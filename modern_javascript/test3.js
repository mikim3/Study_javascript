class Animal {
    name = '1'
    constructor(input) {
      this.name = input
      console.log("hahahoho in Animal :" + input); // ra
      console.log("hahahoho in Animal this.name :" + this.name); // an
    }
}
  
class Rabbit extends Animal {
    name = 'WTF'
    constructor(input) {
        super(input)
        console.log("hahahoho :" + input); // ra
        console.log("hahahoho in Rabbit this.name :" + this.name); // WTF
    }
}
  
  let a = new Animal('an');  //
  console.log(a.name)
  
  console.log("------------------------------------")
  
  let r = new Rabbit('ra');
  console.log(r.name)



