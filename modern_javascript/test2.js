class Animal {
    name = 'animal'

    constructor(name) {

        console.log(this.name); // (*)
    }
}
  
class Rabbit extends Animal {
    name = 'rabbit';
    constructor(name) {
        super(name);
    }
}

new Animal(); // animal
new Rabbit(); // animal






