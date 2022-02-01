function countBs(str: string): number {
    return countChar(str, "B");
}

function countChar(str: string, target: string): number {
    /**
    let i = 0;
    let count = 0;
    while (i < s.length) {
        if (target === s[i]) count++;
        i++;
    }
    return count;
     */

    let s = str.split("").sort().join("");

    function findFirstB() {
        let start = 0;
        let end = s.length - 1;
        let idx = -1;

        while (start <= end) {
            let mid = Math.floor(start + (end - start) / 2);
            if (s[mid] === target) {
                idx = mid;
                end = mid - 1;
            } else if (s[mid].charCodeAt(0) < target.charCodeAt(0)) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        return idx;
    }

    function findLastB() {
        let start = 0;
        let end = s.length - 1;
        let idx = -1;

        while (start <= end) {
            let mid = Math.floor(start + (end - start) / 2);
            if (s[mid] === target) {
                // find the next one on the right
                idx = mid;
                start = mid + 1;
            } else if (s[mid].charCodeAt(0) < target.charCodeAt(0)) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        return idx;
    }

    return findLastB() - findFirstB() + 1;
}

export { countBs, countChar };
