console.log('0')

setTimeout(() => {
    console.log('1')
});

new Promise(function (resolve, reject) {
    console.log('2')
    resolve(3)
}).then((val) => console.log(val))
.then(() => console.log('after...1'))

new Promise(function (resolve, reject) {
    console.log('5')
    resolve(6)
}).then((val) => console.log(val))
.then(() => console.log('after...2'))

console.log('4')

// Mã tổng thể => Micro job (promise, async/await) => Macro (setTimeout, setInterval, )
// Từ trên xuống:
/**
 * - Mã tổng thể => log 0
 * - setTimeout là macro => vào hàng đợi
 * - micro Promise => log 2, nhưng resolve(3).then là vào tổng thể lại, thì chờ kiểm tra tiếp theo còn micro hay không
 * - micro Promise tiếp theo => log 5 => resolve(6).then đợi
 * - Mã tổng thể => log 4
 * - then log 3, then log 6 (cùng cấp micro với log 3)
 * - then log after...1, and then log after...2
 * - log 1 của setTimeout
 * => 0 2 5 4 3 6 after...1 after...2 1
 */