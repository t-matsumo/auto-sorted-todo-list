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

// 期日でのソート(日付)
data = [];
for (i = 1; i <= 10; i++) {
    data.push(newTodo('日付でソート', i + '番目', '2000-03-' + ('00' + i).slice(-2)));
}

// 期日でのソート(月)
for (i = 1; i <= 12; i++) {
    data.push(newTodo('月でソート', i + '番目', '2001-' + ('00' + i).slice(-2) + '-01'));
}

// 期日でのソート(年)
for (i = 1; i <= 10; i++) {
    data.push(newTodo('年でソート', i + '番目', '21' + ('00' + i).slice(-2) + '-03-01'));
}

// 終了時刻でのソート
for (i = 0; i <= 23; i++) {
    data.push(newTodo('終了時刻でソート', i + '番目', '2200-03-01', ('00' + i).slice(-2) + ':00'));
}
for (i = 0; i <= 59; i++) {
    data.push(newTodo('終了時刻でソート', i + '番目', '2300-03-01', '12:' + ('00' + i).slice(-2)));
}

// 作業時間でのソート
for (i = 0; i <= 400; i++) {
    data.push(newTodo('作業時間でソート', i + '番目', '2400-03-01', '12:00', i));
}

// 最大値データ(30文字，100文字，24 * 60分)
data.push(newTodo("ああああああああああああああああああああああああああああああ", "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ", "2400-03-01", "12:00", 24 * 60));

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