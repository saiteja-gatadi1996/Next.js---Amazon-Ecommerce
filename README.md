1. Github Repo: https://github.com/basir/next-tailwind-amazona
2. npx create-next-app next-tailwind-amazona

```js
// syntax: npx create-next-app my-app
```

3.

```js
npm run dev
```

4. i) https://tailwindcss.com/docs/guides/nextjs
   ii)

```js
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p (it creates postcss.config.js, tailwind.config.js)
```

iii) add below lines in tailwind.config.js inside content

```js
content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```

v) add below lines in globals.css (at the top)

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Delete Home.module.css and remove the import for that from index.js
6. remove main section from index.js file
7. create components folder and create Layout.js file
8. in eslintrc.json, make string to array and add the eslint:recommended

```js
{
  "extends": ["eslint:recommended", "next/core-web-vitals"]
}

```

9. List Products
   i) create utils folder and add data.js
   ii) add images
   iii) add ProductItem.js file in components folder

10. Create a new folder under pages folder called product and create a new file called [slug].js

11. npm i -D @types/react

12. Create a new file Store.js under utils folder.

13. Create a new file cart.js under pages folder

14. npm i @heroicons/react
