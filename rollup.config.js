import rollupTypescript from 'rollup-plugin-typescript'
import rollupResolve from 'rollup-plugin-node-resolve'
import rollupCommonjs from 'rollup-plugin-commonjs'
import rollupServe from 'rollup-plugin-serve'
import rollupLiveReload from 'rollup-plugin-livereload';
import rollupCopy from 'rollup-copy-plugin'
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'typescript'
import tsconfig from './tsconfig.json'

const singleDevelopmentPlugins = []

const getPlugins = () => {
	const plugins = [
		rollupCommonjs(),
		rollupResolve(),
		rollupTypescript({
			typescript,
			include: tsconfig.include
		})
	]

	if (process.env.development) {
		if (singleDevelopmentPlugins.length === 0) {
			singleDevelopmentPlugins.push(rollupServe({ contentBase: 'dist', port: 8080 }))
			singleDevelopmentPlugins.push(rollupLiveReload('dist'))
			singleDevelopmentPlugins.push(rollupCopy({
				'./test/index.html': 'dist/index.html'
			}))
			plugins.push(...singleDevelopmentPlugins)
		}
	}

	if (process.env.production) {
		plugins.push(uglify())
	}

	return plugins
}
const mainEntry = {
	input: './src/index.ts',
	output: {
		file: './dist/index.js',
		sourcemap: process.env.development,
		format: 'iife'
	},
	plugins: getPlugins(),
}

const workerEntry = {
	input: './src/worker.ts',
	output: {
		file: './dist/worker.js',
		sourcemap: process.env.development,
		format: 'es'
	},
	plugins: getPlugins(),
}

export default [mainEntry, workerEntry]