const prettier = require("prettier");
const path = require("path");

const input = `
package com.my.package;
    import com.my.package.TestThing
    import lombok.Getter;
    public class TestClass {
    @Getter private final TestThing testThing;
    public MsgNoNamespace(testThing TestThing) {
    this.testThing = testThing;
    }
    }
`;

try {
  prettier.format(input, {
    parser: "java",
    plugins: [path.resolve(__dirname)],
    tabWidth: 2,
    endOfLine: "lf",
  });
} catch (err) {
  console.log(err);
}
