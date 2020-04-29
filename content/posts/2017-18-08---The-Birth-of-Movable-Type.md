---
title: "実践サーバサイドプログラミング-Day4-"
date: "2020-04-26T22:12:03.284Z"
template: "post"
draft: false
slug: "day4"
category: "Programing"
tags:
  - "AJAX"
  - "WebSocket"
description: "実践サーバサイドプログラミングのDay4ということでAJAXやWebSocketのお勉強をしていきます。"
---

## 今回やっていくこと

こんにちわ、rattsl([@rattsl](https://twitter.com/rattsl))です。

今回はクライアントJavaScriptにおけるAJAX通信とAJAXのデメリットに対する解決策としてのWebSocketの学習をしていきます。

## AJAXとは

AJAXとは、**Asynchronous JavaScript + XML**の略で、非同期でサーバにHTTPリクエストを行い、その結果をUIに反映させたりする技術を指します。データのフォーマットは、基本的に通信量や利用のしやすさからJSON形式でレスポンスが返ってくるようになっています。AJAX通信が有名になったのは、Googleマップが利用されてからで、多くの人に使われるようになりました。画面をピンチアウトしたときに一瞬白くなっているのがリアルタイムで非同期通信されている証拠です。

またAJAX通信を繰り返すことで**SPA(Single Page Applicatiopn)**という技術を実現することができるようになりました。

## SPAとは

SPAとは**単一のWebページで複数の機能を表現したアプリケーション**を指します。従来のボタンをクリックしたらHTTPリクエストが飛び、サーバがそのリクエストに対してHTMLページをレスポンスで返すという通信手法は、その度にページが読み込まれ画面が遷移するという特徴がありました。。それに対しSPAは**単一ページで切り替えを行うため、ページ全体の遷移は必要なく、ブラウザの挙動に縛られないUX**を可能にします。

## AJAXを使ってみる

早速AJAXを利用し自動的にサーバの状態を取得し表示するアプリを作ってみます。アーキテクチャ自体は前回同様テンプレートエンジンをPugにしたExpressでクライアントをJQueryで実装していきます。まず始めにサーバサイドでサーバの状態を返すWebAPIを実装していきます。ここでのサーバの状態とはロードアベレージを表しますが、その前にこのロードアベレージとはなんでしょうか？

### Load Average

ロードアベレージとは**1CPUにおける単位時間あたりの実行待ちとディスクI/O待ちのプロセス数**です。 よくサーバーにおける負荷を計測する値として用いられ、値が大きいほどサーバに負荷がかかっていることを表します。コンソールで`uptime`と入力すると

```
 22:58:12 up 17:56,  1 user,  load average: 0.00, 0.00, 0.00
```

と出力されます。`load average:`のラベルの後は直近1分の値、直近5分の値、直近15分の値が表示されます。

***

今回`Router/server-status`にGETでアクセスしロードアベレージの配列を表示させたいのでファイルを生成して記述していきます。

```
'use strict';
const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/', (req, res, next) => {
  res.json({ loadavg: os.loadavg() });
});

module.exports = router;
```

Expressモジュールとloadavgを使用するためのosモジュールを読み込み、`/`に対してイベントハンドラを設定しています。`/`にgetでアクセスがあったときにjson形式でロードアベレージをレスポンスします。

次に`app.js`にこのオブジェクトを設定します。

```
var serverStatus = require('./routes/server-status');
app.use('/server-status', serverStatus);
```

これでサーバの状態を取得するWebAPIが完成しました。次にクライアントサイドJavaScriptを実装していきます。`views/index.pug`に表示エリアを書きます。

```
// index.pug

h3 ロードアベレージ
p#loadavg
```








