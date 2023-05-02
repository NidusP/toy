import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //打包后文件目录
    // outDir: 'es',
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      // input: ['src/steps-guide/index.ts'],
      output: {
        globals: {
          vue: 'Vue',
        },
        dir: 'lib',
        exports: 'named',
      },
    },
    lib: {
      entry: 'src/steps-guide/index.ts',
      name: '[name]',
      fileName: '[name]',
      formats: ['es', 'umd', 'cjs'],
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: 'src/steps-guide',
      outputDir: ['./lib'],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      // tsConfigFilePath: './tsconfig.json',
    }),
  ],
});
