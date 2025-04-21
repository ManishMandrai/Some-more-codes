// cancellable.js

const { performance } = require("perf_hooks");

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
const cancellable = function (fn, args, t) {
    const timer = setTimeout(() => {
        fn(...args);
    }, t);

    const cancelFn = function () {
        clearTimeout(timer);
        console.log("⛔ Cancelled before execution");
    };

    return cancelFn;
};

// --- Demo Run ---

const result = [];

const fn = (x) => x * 5;
const args = [2], t = 20, cancelTimeMs = 50;

const start = performance.now();

const log = (...argsArr) => {
    const diff = Math.floor(performance.now() - start);
    const output = { time: diff, returned: fn(...argsArr) };
    console.log(output);
    result.push(output);
};

const cancel = cancellable(log, args, t);

const maxT = Math.max(t, cancelTimeMs);

// Cancel after some time
setTimeout(cancel, cancelTimeMs);

// Log final result
setTimeout(() => {
    console.log("🧾 Final result array:", result);
}, maxT + 15);
