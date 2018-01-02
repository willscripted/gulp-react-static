
`gulp-react-static`
===============

Compile es6 react components into static html.

## Install

```
npm install --save-dev gulp-react-static
```

##### Project dependencies

```
npm install --save-dev babel-preset-es2016 babel-preset-react react react-dom gulp
```

##### Example `.babelrc`
```javascript
{
  "presets": ["es2015", "react"]
}
```


## Usage

```javascript
const gulp = require('gulp'),
      rename = require('gulp-rename'),
      render = require('gulp-react-static');

gulp.task('default', () => {
  return gulp.src('src/pages')
    .pipe(render())
    .pipe(rename({extname: ".html"}))
    .pipe(gulp.dest);
})
```

## License

MIT &copy; Will O'Brien
