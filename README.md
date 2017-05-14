### Fuse-box + Creating npm package.

This project is to get you started using FuseBox as module loader and bundler to create an npm package, using `TypeScript`.

FuseBox enables creating an npm package, but we have to follow certain steps to make it work.

First, make sure to give your package a name, version and main properties. in this project those properties are defined as follows:
```json
{
 "name": "fuse-box-npm-package-seed",
  "version": "1.0.0",
  "main": "dist/index.js"
}
```

second, in your `fuse.js` config make sure to add `packge` option to the config as follows:
```js
  package: {
        name: 'fuse-box-npm-package-seed',
        main: 'src/index.ts'
    }
```

Note that the `name` property in the `package` option above is the same as the `name` property in `package.json`, this is important!

Also you can provide `main` option, which tells `FuseBox` what is the entry file for this package.

Third, make sure your bundle `instructions` is as follows:
```js
  .instructions("> index.ts")
```

Notice the `>` arithmatic symbol above? it is important to make fuse expose your exports.

With the above instruction done right, Now you can publish your package to npm repository and user can use it like any other npm package. for example:

 `import {name,calculate} from "fuse-box-npm-package-seed"`

To test locally, you can use  [npm link](https://docs.npmjs.com/cli/link). currently it may not work on Windows operating system, to solve this you can utilize `FuseBox`'s awesome [custom modules folder](http://fuse-box.org/page/configuration#custom-modules-folder) feature.

When testing locally, remember to disable `FuseBox` cache or increase the package's `package.json` version so fuse will bundle the latest code for you.

#### Setup & run
* `npm install`
* `npm start`

Visit `http://localhost:4444/`

Don't hesitate to tell us how to improve it :)