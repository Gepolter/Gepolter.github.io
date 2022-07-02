
/*
const {src, dest} = require('gulp');
const json = require(gulp-modiffy-json);

const armor_json = path.join(path.dirname("C:\Users\Dominik\vs-workspace\db_json\armor_high_rank.json"), 'armor_high_rank.json')
const pkg = JSON.parse(fs.readFileSync(armor_json));
const name = pkg.name;
const patch = pkg.patch;
const _id = pkg._id;

function bumpValue(key, value) {
    // var value = Number(patch);
    value++;
    src(['./armor_json'])
      .pipe(json({
        key: key,
        value: value
      }))
      .pipe(dest('./'));
}

function bumpPatch(cb) {
    bumpValue('patch', patch);
    cb();
}
exports.bumpPatch = bumpPatch

function bumpId(cb) {
    bumpValue('_id', patch);
    cb();
}
exports.bumpId = bumpId

*/
var gulp = require('gulp')
//const { src, dest } = require('gulp');


gulp.task('jsonModify', function (){
    var value = 0
    value++
    console.log("stuff")
    return gulp.src(['C:\Users\Dominik\vs-workspace\db_json\armor_high_rank.json'])
    .pipe(gulp.run.jsonModify({
        key: '_id',
        value: value
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('default', function(){
    gulp.run('jsonModify')
})
/*
function defaultTask(cb) {
    // place code for your default task here
    gulp.run('jsonModify')
  }
  
  exports.default = defaultTask
  */