import Temperature from "./06-temperature";

test("Temperature", () => {
    // static
    let temp = Temperature.fromFahrenheit(100);
    // get
    expect(temp.fahrenheit).toBe(100);
    // set
    temp.fahrenheit = 101;
    expect(temp.fahrenheit).toBe(101);
});
