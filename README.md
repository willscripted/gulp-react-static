
`gulp-react-static`
===============

## Install

```
npm install --save-dev gulp-react-static
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
