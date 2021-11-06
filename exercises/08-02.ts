export interface Box {
    locked: boolean;
    unlock(): void;
    lock(): void;
    _content: any[];
    readonly content: any[];
}

export function withBoxUnlocked(box: Box, body: () => void) {
    if (!box.locked) {
        return body();
    }
    box.unlock();
    try {
        return body();
    } finally {
        box.lock();
    }
}
