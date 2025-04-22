// repeatedCancellable.js

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    fn(...args); // run immediately
    const intervalId = setInterval(() => {
        fn(...args);
    }, t);
    const cancelFn = () => {
        clearInterval(intervalId);
        console.log("⛔ Cancelled");
    };
    return cancelFn;
};

// --- Demo ---

let count = 0;

const fn = (msg) => {
    console.log(`[${new Date().toLocaleTimeString()}]`, msg);
    count++;
};

const args = ["📢 Repeating call"];
const intervalMs = 1000; // 1 second
const cancelAfterMs = 4000; // Cancel after 4 seconds

const cancel = cancellable(fn, args, intervalMs);

setTimeout(() => {
    cancel(); // stops the interval after some time
    console.log("✅ Done");
}, cancelAfterMs);
