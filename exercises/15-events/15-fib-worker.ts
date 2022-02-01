const fibWorker = new Worker("./15-fib.js");
fibWorker.addEventListener("message", (event) => {
    console.log("The worker responded: ", event.data);
});

fibWorker.postMessage(10);
fibWorker.postMessage(42);
