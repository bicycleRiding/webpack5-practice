## webpack5 实践

# babel 相关

## 设置浏览器支持(browserslist 配置将被 babel 调用)

```json
// package.json
 "browserslist": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
  ]
```

or

```.browserslist
">0.25%"
"not ie 11"
"not op_mini all"
```

## babel 相关预设与插件

```js
module.exports = {
	presets: [
		[
			"@babel/env",
			{
				useBuiltIns: "usage", // 按需加载
				corejs: 3 // 一种 polyfill, 需要npm i corejs
			}
		]
	],
	plugins: ["@babel/transform-runtime"] // 一种helper抽离的手段
}
```

## vue 相关

```cmd
yarn add -D @vue/compiler-sfc vue-loader@next vue@next
```
