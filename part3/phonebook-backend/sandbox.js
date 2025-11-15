const d = Date.now();
console.log(d);

console.log(new Date());
const time = new Date().getMilliseconds();
// console.log(time);

// const z = new Date().toString();
// console.log(z);

const random = Math.floor(Math.random() * Date.now());
console.log(random);

const characters = [
  { id: '1', name: 'Leon S. Kennedy', number: '090-1200-4581' },
  { id: '2', name: 'Claire Redfield', number: '080-4421-9930' },
  { id: '3', name: 'Jill Valentine', number: '070-5593-2201' },
  { id: '4', name: 'Chris Redfield', number: '090-8744-1266' },
  { id: '5', name: 'Ada Wong', number: '080-3882-9054' },
  { id: '6', name: 'Albert Wesker', number: '070-6610-3228' },
  { id: '7', name: 'Rebecca Chambers', number: '080-4992-1807' },
  { id: '8', name: 'Sherry Birkin', number: '090-7441-6670' },
  { id: '9', name: 'Barry Burton', number: '070-2219-8344' },
  { id: '10', name: 'HUNK', number: '080-9093-7712' },
];

const ashley = {
  id: '11',
  name: 'Ashley',
  number: '99922-11112-3333',
};

const z = [...characters, ashley];
console.log(z);
