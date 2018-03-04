const Datastore = require('nedb');

console.log('start seed!!');

const dbDir = __dirname + '/../db/todo.db';
console.log('db dir:' + dbDir);
db = new Datastore({filename: dbDir, timestampData: true, autoload: true});
db.remove({}, { multi: true }, (err, docs) => {
    if (err) {
        console.log('drop db error... (´；ω；｀)' + err);
    } else {
        console.log('droped db!!');
    }
});

// 最大値データ(30文字，100文字，24 * 60分)
data = [];
for (i = 0; i < 1000; i++) {
    data.push(newTodo("ああああああああああああああああああああああああああああああ", "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ", "2400-03-01", "12:00", i));
}

db.insert(data, (err, docs) => {
    if (err) {
        console.log('insert error... (´；ω；｀)' + err);
    } else {
        console.log('completed inserting data!! ＼(^o^)／');
        db = null;
    }
});

function newTodo(title = '', content = '', deadlineDate = '2000-01-01', deadlineTime='00:00', workTimeMinutes = 1) {
    return {title: title, content: content, deadlineDate: deadlineDate, deadlineTime: deadlineTime, workTimeMinutes: workTimeMinutes};
}