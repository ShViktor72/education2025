// Регулярные выражения
// 1. Объявление
const regexp1 = /abc/gmi;
const rexexp2 = new RegExp("abc", "gmi");
const js = "Javascript";
const rexexp3 = new RegExp(js, "gmi");
const rexexp4 = new RegExp(`i like ${js}`, "gmi");

// 2. Флаги
// i - игнорирование регистра
// console.log(/JavaScript/.test("javascript")); // false
// console.log(/JavaScript/i.test("javascript")); // true

// g - глобальный поиск
// console.log("i like JS. JS is cool!".match(/JS/)); // JS
// console.log("i like JS. JS is cool!".match(/JS/g)); // [JS, JS]

// m - многострочнй поиск
const price = `1000тг,
2000тг,
3000тг.`;
    
// console.log(price.match(/^\d+/g)); // ['1000']
// console.log(price.match(/^\d+/gm)); // ['1000', '2000', '3000']

// 3. Методы
// методы RegExp
// regexp.test(str) - есть вхождение или нет (true / false)
// console.log(/hello/.test('hello, world!')); // true
// console.log(/hello/.test('hi, world!')); // false

// regexp.exec(str) - проверка вхождения, подробный вывод или null
// console.log(/hello/.exec('hello, world!')); // ['hello', index: 0, input: 'hello, world!', groups: undefined]
// console.log(/hello/.exec('hi, world!')); // null

// методы строк
// str.match(regexp) - проверка вхождения
// console.log('hello, world! hello!'.match(/hello/)); // ['hello', index: 0, input: 'hello, world! hello!', groups: undefined]
// console.log('hello, world! hello!'.match(/hello/g)); // ['hello', 'hello']
// console.log('hello, world! hello!'.match(/hi/g)); // null

// str.replace(regexp, str) - замена
// const str = 'I love JS';
// console.log(str.replace(/love/, 'like'));

// str.search(regexp) - возвращает индекс первого вхождения или -1
// console.log("hello, world!".search('hello')); // 0
// console.log("hello, world!".search('hi')); // -1

// 4. Символьные Классы
// \d - цифра
// \w - латинская буква, цифра, _
// \s - пробельный символ (пробел, табуляция, перенос строки)
// \D - не цифра
// \W - не латинская буква, цифра, _
// \S - не пробельный символ
// . - любой символ, кроме переноса строки

// console.log(/\d+/.test('123')); // true
// console.log(/\d+/.test('Hello')); // false
// console.log(/\D+/.test('Hello')); // true
// console.log(/.+/.test('Hello')); // true

// 5. Якоря
// ^ - начало строки
// $ - конец строки
// \b - граница слова

// console.log(/^hello/.test('hello, world!')); // true
// console.log(/^hello$/.test('hello, world!')); // false
// console.log(/!$/.test('hello, world!')); // true

// console.log(/\bcat\b/i.test('Catalog')); // false
// console.log(/\bcat\b/i.test('Cat is funny')); // true

// 6. Специальные символы
// . + * ^ $ \ / [ ? | ( ) 
// console.log(/\$/.test("1000$")); // true
// console.log(/\+/.test("2 + 2 = 4")); // true
// console.log(/\//.test("on/off")); // true

// 7. Диапазоны. Наборы
// [abcd] - любой символ из abcd
// [a-z] - любой символ от a до z
// [0-9] [а-яё] 
// исключения
// [^0-9]

// console.log(/[abcd]/.test('hello, world!')); // true
// console.log(/[abcd]/.test('hello!')); // false

// 8. Квантификаторы
// +  - 1 и более
// *  - 0 и более
// ?  - 0 или 1
// {3} - точное количество
// {n, m} диапазон, от n до m
// {n,} от n и более

// console.log(/\w{4}/.test("hello, John!")); // true

// 9. Группы захвата
// console.log(/(ab){2}/.test("abab"));

// console.log("word1 word2".replace(/(\w+) (\w+)/, '$2 $1')); // word2 word1

// Или |
// console.log(/JS|C|C#/.test("I like Python!")); // false
// console.log(/JS|C|C#/.test("I like JS!")); // true

// 10. Жадность
// console.log("I like the 'Clash' and the 'Cure'!".match(/'.+'/g)); // ["'Clash' and the 'Cure'"]
// console.log("I like the 'Clash' and the 'Cure'!".match(/'.+?'/g)); // ["'Clash'", "'Cure'"]

