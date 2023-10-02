import { render } from "@testing-library/react";
import App from "../App";

test("demo", () => {
  expect(true).toBe(true);
});

// toBe uses Object.is to test exact equality
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

// to check the value of an object, use toEqual:
test("object assignment", () => {
  const data = { one: 1, two: 1 };
  data.two = 2;

  expect(data).toEqual({ one: 1, two: 2 });
});

// test for the opposite of a matcher using not:
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// comparing numbers have matcher equivalents
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// For floating point equality, use toBeCloseTo instead of toEqual,
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

// check strings against regular expressions with toMatch:
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

// check if an array or iterable contains a particular item using toContain:
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

// test whether a particular function throws an error when it's called, use toThrow.
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});

// async code test
// fetchData returns a promise that is supposed to resolve to the string 'peanut butter'.
const fetchData = () => {
  return new Promise((resolve) => {
    resolve("peanut butter");
  });
};
// can test it with:
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});

// Async/Await
// you can use async and await in your tests. To write an async test, use the async keyword in front of the function passed to test
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

// You can combine async and await with .resolves or .rejects.
test("the data is peanut butter", async () => {
  await expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchData()).rejects.toMatch("error");
});

function isCity(city: string) {
  return ["Vienna", "San Juan"].includes(city);
}

// describe with setup and teardown
describe("describe", () => {
  beforeEach(() => {
    // init
  });

  afterEach(() => {
    // clean up
  });

  test("city database has Vienna", () => {
    expect(isCity("Vienna")).toBeTruthy();
  });

  test("city database has San Juan", () => {
    expect(isCity("San Juan")).toBeTruthy();
  });
});

// mock function
describe("mock function", () => {
  const mockCallback = jest.fn((x) => 42 + x);
  const forEach = (items: number[], callback: (x: number) => number) => {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  };

  it("calls forEach mock function", () => {
    forEach([0, 1], mockCallback);

    // The mock function was called twice
    expect(mockCallback.mock.calls).toHaveLength(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);
  });
});

// Mock functions can also be used to inject test values into your code during a test:
test("mock function with return value", () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce("x")
    .mockReturnValueOnce(true)
    .mockReturnValue(1);

  console.log(myMock(), myMock(), myMock(), myMock());
  expect(myMock()).toEqual(1);
});

test("Renders the main page", () => {
  type TUser = {
    name: string;
    age: number;
  };
  const user = {
    name: "John",
    age: 10,
  } as TUser;

  expect(user.age).toBe(10);

  render(<App />);
  expect(true).toBeTruthy();
});
