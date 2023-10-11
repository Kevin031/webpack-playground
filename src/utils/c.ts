interface IPerson {
  firstName: string;
  lastName: string;
  age?: number;
  say?: (key?: string) => void;
}

class Person {
  firstName = "";
  lastName = "";

  constructor(name: string, age: number) {
    const [firstName, lastName] = name.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const manA = new Person("Jack Twen", 15);

export default {
  Person,
  manA,
};
