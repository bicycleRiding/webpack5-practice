module.exports = {
	presets: [
		[
			"@babel/env",
			{
				useBuiltIns: "usage",
				corejs: 3
			}
		]
	],
	plugins: ["@babel/transform-runtime"]
}