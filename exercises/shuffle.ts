export default function shuffleArray(arr: any[]) {
    let currentIdx = arr.length - 1;

    while (currentIdx >= 0) {
        let randIdx = Math.floor(Math.random() * currentIdx);
        [arr[randIdx], arr[currentIdx]] = [arr[currentIdx], arr[randIdx]];
        currentIdx--;
    }

    return arr;
}
