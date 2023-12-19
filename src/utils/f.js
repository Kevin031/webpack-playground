const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
});

console.log(2);

promise.then(() => {
  console.log(3);
});

promise.then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(5);
}, 0);

console.log(6);

// 1 2 6 3 4 5
