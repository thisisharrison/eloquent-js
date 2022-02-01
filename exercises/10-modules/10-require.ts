hRequire.cache = Object.create(null);

export function hRequire(name: string) {
    if (!(name in hRequire.cache)) {
        let code = readFile(name);
        let module = { exports: {} };
        // adds modules to its cache before it starts loading the module
        // if any require call made while it's running, it returns the cached interface rather than loading once more
        // this avoids circular deps
        // before code finish loading, default interface object is empty {}
        // overwriting empty rather than intended interface would be fine
        // https://eloquentjavascript.net/10_modules.html#p_nf2U1lY9dq
        hRequire.cache[name] = module;
        // reading the module’s code, wrapping it in a function, and calling it.
        // This Function constructor is saying: See below
        let wrapper = Function("hRequire, exports, module", code);
        wrapper(hRequire, module.exports, module);
    }
    // Return the export bindings
    return hRequire.cache[name].exports;
}

function readFile(filename: string) {
    return `
        function addTwo(x) {
            return x + 2;
        }
        module.exports = addTwo;
    `;
}

/**
 * Function("hRequire, exports, module", code);
 * Equivalent to
 * function (hRequire, exports, module) {
 *  function addTwo(x) {
 *      return x + 2;
 *  }
 *  module.exports = addTwo
 * }
 */
