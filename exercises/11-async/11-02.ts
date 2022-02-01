// @ts-nocheck
export function Promise_all<T>(promises: Promise<T>[]) {
    return new Promise((resolve, reject) => {
        const results = [];
        let pending = promises.length;
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then((result) => {
                    results[i] = result;
                    pending--;
                    if (pending === 0) {
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
        const results = Array.from({ length: promises.length });
        promises.forEach(async (promise, i) => {
            try {
                let res = await promise;
                results[i] = res;
                if (i === promises.length - 1) {
                    resolve(results);
                }
            } catch (e) {
                reject(e);
            }
        });
    });
}
