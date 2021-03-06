const { FuseBox, QuantumPlugin, WebIndexPlugin, Sparky } = require("fuse-box");

let fuse, bundle;
let isProduction = false;

// we can change the target when making a seperate bundle
let target = "browser@es6";

// bundle name needs to be changed too (as we are making an isolate build and 
// and we need to bundle the API into it
let bundleName = "es6";

let instructions = "> index.ts";



Sparky.task("config", () => {

    fuse = FuseBox.init({
        homeDir: "src",
        globals: { 'default': '*' }, // we need to expore index in our bundles
        target: target,
        output: "dist/$name.js",
        cache: false,
        tsConfig: [{ target: bundleName }], // override tsConfig
        plugins: [
            WebIndexPlugin(),
            isProduction && QuantumPlugin({
                containedAPI: true,
                ensureES5: false,
                uglify: true,
                bakeApiIntoBundle: bundleName
            })
        ]
    });
    bundle = fuse.bundle(bundleName).instructions(instructions)
});


Sparky.task("clean", () => {
    return Sparky.src("dist/").clean("dist/");
});

Sparky.task("copy-src", () => Sparky.src("./**", { base: './src' }).dest("dist/"));
Sparky.task("copy-pkg", () => Sparky.src("./package.json").dest("dist/"));

Sparky.task("dev", ["clean"], () => {
    bundleName = "app";
    instructions = "> dev.ts"
});

Sparky.task("dist-es5", async() => {
    target = "browser@es5"
    isProduction = true;
    bundleName = "es5"
    await Sparky.resolve("config")
    await fuse.run();
});

Sparky.task("dist", ["clean", "copy-src", "copy-pkg", "dist-es5"], () => {

});



// Development
Sparky.task("default", ["dev", "config"], () => {
    fuse.dev();
    bundle.hmr().watch();
    fuse.run();
});