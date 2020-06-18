---
title: '実践サーバサイドプログラミング-Day1-'
date: '2020-04-12T22:40:32.169Z'
template: 'post'
draft: false
slug: 'day1'
category: 'Programming'
tags:
  - 'JavaScript'
  - 'Express'
  - 'Mocha'
description: '実践サーバサイドプログラミングのDay1ということで、フレームワークを使ってお勉強していきます。'
---

## 今回やっていくこと

こんばんわ、rattsl([@rattsl](https://twitter.com/rattsl))です。

今回は1日目ということで、JavaScriptのWebフレームワークであるExpressのAPIの使い方やGitHubを使った外部認証、テスティングについて勉強していきます。

***

## Expressのセキュリティ

ExpressのAPI等勉強をしていく前にセキュリティに関してのベストプラクティスがドキュメントに書かれているので列挙します。

* Don’t use deprecated or vulnerable versions of Express
* Use TLS
* Use Helmet
* Use cookies securely
* Prevent brute-force attacks against authorization
* Ensure your dependencies are secure
* Avoid other known vulnerabilities
* Additional considerations

### Don’t use deprecated or vulnerable versions of Express
脆弱性のある版は使わないでとのこと。2.xや3.xはサポートされていないから最新版にアップデートして使ってくださいと書かれています。

### Use TLS
TLSを使ってねとのこと。TLSとはSSLでの暗号化通信をより標準化したものです。

### Use Helmet
helmetを使ってねとのこと。helmetとは、HTTPにおいて脆弱性となるヘッダなどを取り除き、安全に使えるようにしてくれるモジュールのことです。Expressで雛形を作ったとします。Chromeのデベロッパツールを使い、Networkのheaderタブを見ると`X-Powered-By:Express`と書かれています。これはこのアプリケーションが何のフレームワークを使っているかを表しています。一見便利そうに見えますが、フレームワーク側に脆弱性が見つかったとき、攻撃される可能性があります。これを防ぐためにhelmetを使い、ヘッダ情報を隠します。helmetという名前がヘッダ（頭）にhelmet（ヘルメット）するイメージができ、かなりイカしたモジュール名ですね。

### Use cookies securely
クッキーを安全に使ってねとのこと。デフォルトセッションのキーは使わないでと書かれています。

### Prevent brute-force attacks against authorization
認証の際の総当たり攻撃は防いでねとのこと。総当たり攻撃とは何回でもパスワードが入力できる認証システムにしてある際、考えられるパスワードで総攻撃する方法です。同じユーザが何度もパスワードを入力できないように、複数回認証に失敗すると1日使えないようにするといった解決策があります。

### Ensure your dependencies are secure
依存ライブラリの安全性を確認してねとのこと。`npm install`や`yarn add`をすると`package.json`に依存関係が記述されますが、そのモジュールに欠陥があるものが含まれる場合、アプリケーションに脆弱性が生まれてしまいます。

安全の確認の方法として`npm audit`を実行する方法があります。`npm audit`とはdependencyを自動的に解析し脆弱性のあるモジュールを教えてくれる便利ツールです。問題のあるモジュールがわかったところで修正されたものをインストールしてセキュリティホールを埋めます。

### Avoid other known vulnerabilities
既知の脆弱性には気をつけてねとのこと。[Node Security Project](https://www.npmjs.com/advisories)に目を通しておく必要があります。

## ExpressのAPI

まず、プロジェクトの雛形をPugをテンプレートエンジンとして形成し、`App.js`の中身をみていきます。

```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require("helmet")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

まず宣言されているモジュールから見ていきます。

```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require("helmet")
```

* http-errorsは、HTTPのエラーを作成するモジュール
* expressは、Expressの本体
* cookie-parserは、Cookieを解釈するモジュール
* morganは、コンソールにログを整形して出力するモジュール
* pugは、テンプレートエンジン

となっています。

```
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
```

これは`routes`ディレクトリのRouterオブジェクトを読み込みindexRouterとusersRouterとして変数に格納しています。

```
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

ここではまずexpress関数を使ってApplicationオブジェクトを生成し、app変数に格納しています。その後set関数を使ってアプリ内設定を行っており、テンプレートファイルがviewsにあり、テンプレートエンジンはpugを使ってますよということを表しています。


```
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
```

Applicationオブジェクトにはuse関数が提供されており、use関数の引数に入れて宣言したものを使っています。以上のコードは

* ログを出すための`logger`を使う設定
* json形式を解釈したり作成するための`json`を使う設定
* URLをエンコードしたりデコードするための`urlencoded`を使う設定
* Cookieを解釈したり作成するための`cookieParser`を使う設定
* 静的(static)なファイルを`public`というディレクトリにするという設定

となっております。

```
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

これは`/`というpassにアクセスしたときに、`indexRouter`のRouterオブジェクトを、`/users`にアクセスがあったとき、`usersRouter`のRouterオブジェクトを使うというものです。

このようにオブジェクトを登録しておいて、何かイベントがあったとき（例としてここでは`/`にアクセスがあったとき）処理が走るようにしておく関数を**イベントハンドラ**と呼びます。電車で例えるとレール上に分岐器を設置するイメージでしょうか。

```
app.use(function(req, res, next) {
  next(createError(404));
});
```

このハンドラにはreq（リクエスト）、res（レスポンス）、nextという関数を引数に取ってnextを実行し、設定されていないpassにアクセスがあったときに404のエラーを吐くcreateError関数を呼び出しています。

```
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

上記はエラー処理のハンドラです。

エラーメッセージをres.locals.messageに代入し、開発環境下であればエラーのオブジェクトをテンプレートに渡し、本番環境におけるエラーは渡さないというものになっております。ここでいうテンプレートとは`views/error.pug`を表します。

```
module.exports = app;
```

この記述によってApplicationオブジェクトをモジュール化し、他でも使えるようになります。

ここまでで生成したコードを説明することができました。

***

## Githubを使った外部認証

ここまででAPI等説明してきましたが、次にGithubを使った外部認証の勉強をしていきます。

外部認証は[Firebase](https://firebase.google.com/?hl=ja)や[AWS Amplify](https://aws.amazon.com/jp/amplify/)といったmBaaS（mobile Backend as a Service）でもユーザー認証機構が提供されており、その中でもOAuth2.0という仕組みをやっていきます。

##OAuth2.0とは

OAuthとはクライアントアプリがリソースサーバ（ここでいうGitHub）からデータをリクエストし、そのデータを元に認証などを行うことです。そのアプリを使う際、自分メールアドレスやおパスワード等を入力する手間が省けます。クライアントアプリに実装し認証するまでの流れは以下になります。

1. クライアントアプリをGitHubに登録する。
2. 登録と同時にアクセストークンをクライアントアプリに登録する。
3. ユーザはログイン時、Githubが認証情報を利用してログインしてもいいか聞いてくる。
4. ユーザが許可するとクライアントアプリはGiuhubからユーザ情報を受け取れるようになる。
5. その情報を元にログインする。

***

## テスティングフレームワークとは

最後にテスティングフレームワークについて説明していきます。

テストといえばNode.jsで提供されている**assert**モジュールがあります。しかしこのテストモジュールだけでは補きれない部分があります。テストをする際必要になってくる機能は、

* テスト自体を細かく分割する機能
* テストに一つ一つに意味をつけて、実行結果の集計結果を表示する機能
* テストの失敗の際に、どのような値が正解で実際はどのような値だったかを表示する機能
* 細かく分割されたテストの最初と最後に、必ず実行する処理を集約する機能

があります。

assertモジュールにはこれらの機能が備わっておらず、自分でテストをするには骨が折れる作業です。そこでこの便利な機能をまとめて提供してくれるのが、この**テスティングフレームワーク**です。

## なぜテストするのか

テスティングフレームワークを説明する前に、そもそもなぜテストをするのでしょうか？私自身テストと聞くと学校のテストを連想してしまい、聞いててあまりいい気持ちではありません。しかしテストというのはその人（プログラム）がしっかり理解しているか（不具合が起きないか）を保証するものです。事前にテストを行うことにより、入試（本番環境）で点数が取れるかどうか（正常に動作するかどうか）を定量的に判断し、学力（品質）を保証することができます。

ここでは学校のテストで例えましたが、「こんな感じでコード書いてこんな感じで動いた」のようなフワッとしたテストだと、例外的な処理が発生したときに対応できず、最悪の場合、サービスの根幹を揺るがす問題に発展し、ユーザに迷惑をかける可能性があります。

そのためテストはしっかり計画を立て、バグを起こさないソフトウェアにする必要があります。

## テストの種類

テストには3つの種類があり、

* ユニットテスト
* 結合テスト
* システムテスト

があり、ユニットテストは**モジュール単体**をテストすること、結合テストとは**複数のモジュール**が結合したときに正常に動作するかテストすること、システムテストとは**システム全体（プロダクト）**が動くかどうかテストすることです。
 
 ## どういったテスティングフレームワークがあるか

 テストをすることによって、成否具合や内容、問題となる内容が詳しく出力されますが、フレームワークにはReact.js,Vue.jsがあるのと同様に、様々なテスト用のフレームワークが提供されており、それぞれ違いがあります。一度GitHubでどういったテスティングフレームワークが人気なのか調べてみます。

 [Githubでレポジトリ検索](https://github.com/search)をしてみます。フォームに`javascript test`と記入し、右上のSortで`Most stars`を選択すると、スターが多い順に様々なフレームワークが抽出されます。JavaScriptで人気のフレームワークは[Jest](https://github.com/facebook/jest)や[mocha](https://github.com/mochajs/mocha)、[ava](https://github.com/avajs/ava)などがあるようです。今回はその中でも教材で使われている**mocha**を利用していきたいと思います。

## 今日はここまで

 1日目はここまでにして次で簡単なテストを実行していこうと思います。




