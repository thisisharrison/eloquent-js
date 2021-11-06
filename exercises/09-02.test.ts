jest.spyOn(global.console, "log");

test("quoting style", () => {
    let text = "'I'm the cook,' he said, 'it's my job.'";

    // Start of the string ^ or end $
    console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

    expect(console.log).toBeCalledWith('"I\'m the cook," he said, "it\'s my job."');
});
