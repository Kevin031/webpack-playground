const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");
const types = require("@babel/types");

const code = `
console.log("hello world");
console.warn(1);
console.log(2);
console.log(3);
console.log(4);
`;

// 源码解析ast
const ast = parser.parse(code);

// 遍历ast，执行转换
traverse.default(ast, {
  CallExpression(path, state) {
    const { node } = path;
    if (types.isMemberExpression(node.callee)) {
      // 找到console
      if (node.callee.object.name === "console") {
        // 找到符合的方法名
        if (
          ["log", "info", "warn", "error"].includes(node.callee.property.name)
        ) {
          // 找到所处的行列
          const { line, column } = node.loc.start;
          node.arguments.push(types.stringLiteral(`${line}:${column}`));
          // 找到文件名
          // const filename = state.file.opts.filename;
          // 输出文件的相对路径
          // const relativeName = pathLib
          //   .relative(__dirname, filename)
          //   .replace(/\\/g, "/"); // 兼容windows
          // node.arguments.push(types.stringLiteral(relativeName));
        }
      }
    }
  },
});

// 生成
const result = generator.default(ast, {}, code);

console.log(result.code);
