import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import sass from 'sass'


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
	},
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass
			}
		}
	},
	plugins: [react(), tsconfigPaths()]
})
