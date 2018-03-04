# AutoSortedTodoList
行うべき順番にソートしてくれるTODOリスト(同じ機能を持つ既存のものはたくさんあるけど作るwww)

# 実行方法
package.jsonまたは以下のリポジトリを参照  
https://github.com/maximegris/angular-electron

# やりたいこと
- 期日と作業時間から行うべき順番にソート
- Windows や mac で動作
- 情報は動作端末に保持(将来的にはサーバにデータを保持して共有？？)

# TODO(最低限)
- [x] リスト画面作成
- [x] TODO入力画面作成
- [x] 保存機能実装
- [x] ソート機能実装
- [ ] 見た目を良くする(めんどくさいからscssでだれかやってくれないかな...)
    （現状ではとりあえずマテリアルデザイン）
- [x] 入力フォームにバリデーションをかける
- [ ] ソート順切り替え
- [ ] パッケージ方法をいい感じにする
    - [ ] packageの中に最小限のnode_modulesの中身を移す簡単な方法を考える(.exeとか.appファイルを作るとき)
    - [ ] 現状ではauto-sorted-todo-list-*/resources/app/main.jsを以下のようにいじらないと実行可能ファイルからは動かないため自動化する
    ```
    pathname: path.join(__dirname, 'dist/index.html'),
    ↓
    pathname: path.join(__dirname, 'index.html'),
    ```