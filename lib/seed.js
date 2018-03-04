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
sortedDataByDate = [];
for (i = 1; i <= 20; i++) {
    sortedDataByDate.push(newTodo('日付でソート', i + '番目', '2000-03-' + ('00' + i).slice(-2)));
}

// 期日でのソート(月)
for (i = 1; i < 12; i++) {
    sortedDataByDate.push(newTodo('月でソート', i + '番目', '2001-' + ('00' + i).slice(-2) + '-01'));
}

// 期日でのソート(年)
for (i = 1; i < 20; i++) {
    sortedDataByDate.push(newTodo('年でソート', i + '番目', '21' + ('00' + i).slice(-2) + '-03-01'));
}

// 終了時刻でのソート
for (i = 0; i < 23; i++) {
    sortedDataByDate.push(newTodo('終了時刻でソート', i + '番目', '2200-03-01', ('00' + i).slice(-2) + ':00'));
}
for (i = 0; i < 59; i++) {
    sortedDataByDate.push(newTodo('終了時刻でソート', i + '番目', '2300-03-01', '12:' + ('00' + i).slice(-2)));
}

// 作業時間でのソート
for (i = 0; i < 100000; i++) {
    sortedDataByDate.push(newTodo('作業時間でソート', i + '番目', '2400-03-01', '12:00', i));
}

db.insert(sortedDataByDate, (err, docs) => {
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