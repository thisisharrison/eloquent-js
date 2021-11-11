// @ts-nocheck
export function Promise_all<T>(promises: Promise<T>[]) {
    return new Promise((resolve, reject) => {
        const results = [];
        for (let promise of promises) {
            promise
                .then((result) => {
                    results.push(result);
                    if (results.length === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        }
        if (promises.length === 0) {
            resolve(results);
        }
    });
}

export function Promise_all1<T>(promises: Promise<T>[]) {
    return new Promise((resolve, reject) => {
        const results = [];
        promises.forEach(async (promise) => {
            try {
                let res = await promise;
                results.push(res);
                if (results.length === promises.length) {
                    resolve(results);
                }
            } catch (e) {
                reject(e);
            }
        });
    });
}
