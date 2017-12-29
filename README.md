
`gulp-react-static`
===============

## Install

```
npm install --save-dev gulp-react-static
touch .babelrc
```

Make sure your `.bablerc` file includes all relevent presets and plugins you may require to render components in the source directory. Eg. 

```javascript
{
  "presets": ["es2015", "react"]
}
```


## Usage

```javascript
const gulp = require('gulp')
      render = require('gulp-react-static');

gulp.task('default', () => {
  return gulp.src('src/pages')
    .pipe(render())
    .pipe(gulp.dest);
})
```

## License

MIT &copy; Will O'Brien
