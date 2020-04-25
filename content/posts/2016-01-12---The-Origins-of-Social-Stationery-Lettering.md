---
title: "実践サーバサイドプログラミング-Day3-"
date: "2020-04-17T22:40:32.169Z"
template: "post"
draft: false
slug: "day3"
category: "Programing"
tags:
  - "webpack"
  - "DOM"
  - "jQuery"
description: "実践サーバサイドプログラミングのDay3ということで、webpackの仕組みやDOMの操作の勉強をしていきます。"
---

## 今回やっていくこと

こんにちわ、rattsl（[@rattsl](https://twitter.com/rattsl)）です。

コロナウイルスによる経済対策で減収世帯限定に30万給付すると思っていたら取下げになって、次は10万円一律給付という話が出てきていますね。ハーバード大学のグレゴリー・マンキュー教授は、３月13日付のブログ記事（Thoughts on the Pandemic）で、本当に困っている人を識別（特定）することには困難が伴うから、すべての米国民に1000ドルの小切手をできる限り早期に届けることから始めるとよいとの提案を行っているそうです。この給付でお金が循環して少しでも景気がよくなればいいのですが、と余談はさておきやっていきましょう。

今回はWebpackやDOMのお勉強を進めていきたいと思います。

***

## webpackとは

webpackとは簡単に説明すると、HTMLに組み込むためのJSのファイルを一つにまとめる役割を果たしてくれるフレームワークです。他にもnode.jsのモジュールをクライアントのHTMLで利用可能に機能もあります。

## ファイルをまとめるメリットとは？

なぜファイルをまとめる必要があるのでしょうか？そこにはTCP通信やブラウザに理由があります。通常、一度ブラウジングした画像やファイルなどの静的ファイルは、２回目にそのページを訪れたときに、サーバからもう一度データをリクエストすることはなく、１度目でダウンロードされた静的ファイルを使って描画します。これを**キャッシュ**といいます。キャッシュという仕組みがあるおかげで何度もリクエストする必要がなくなります。

そこで、このキャッシュを利用するブラウザの挙動を利用するために、バラバラになったファイルを一つにまとめます。すると利用効率が上がり、サーバの負荷や通信量を抑えることが可能になり、同時にユーザもリソースを効率よく使うことができるというわけです。他にもHTTPのプロトコルであるTCPとwebpackのようなクライアントjavascriptをまとめるフレームワークは接続の観点から相性がいいという理由もあります。

## webpackのインストール

複数インストールしていきます。モジュールに関しましてはwebpackだけではなくBABELもインストールします。

```
yarn add webpack@4.26.1 webpack-cli@3.1.2 @babel/core@7.1.6 @babel/preset-env@7.1.6 babel-loader@8.0.4 --dev
yarn add https://github.com/progedu/damage-calc-4006.git
```

### Tips: BABELとは
JavaScriptの**トランスコンパイラ**。どういった役割を果たすかというと、ES2015以降の新しい書き方をES5の構文に変換するのに使われています。ここでは`babel-loader`という利用環境のブラウザに対応する版にコンパイルしてくれるモジュールを利用します。

## 対象ファイルの作成

インストールが終わったら今回使うファイルを生成します。

```
touch webpack.config.js
mkdir app
touch app/entry.js
mkdir public/javascripts
```

`webpack.config.js`は webpackの設定を行うファイル、`app/entry.js`は、エントリポイントとしてHTMLに組み込むJavaScriptファイル、`public/javascripts`は`app/entry.js`でまとめられたJavaScriptファイルが出力されるディレクトリとなります。

次に作業フォルダのルートに設置された`webpack.config.js`を次のように設定します。

```
// webpack.config.js

module.exports = {
  context: __dirname + '/app',
  entry: './entry',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js'
  },
  mode: 'none',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};
```

```
context: __dirname + '/app',
  entry: './entry',
```

`__dirname`はNode.jsで予め用意されている変数で、記述されたファイルのパスが格納されています。`entry`は依存関係を始めに読み込むJavaScriptのファイルを表しており、`./entry`と設定してあります。

```
output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js'
  },
```

ここではまとめられたJavaScriptのディレクトリと出力ファイルを`bundle.js`として出力するという設定です。

次に変換を行うJavaScriptのファイルを`entry.js`に記述します。

```
// entry.js

'use strict';
import dc from 'damage-calc';
const root = document.getElementById('root');
root.innerHTML = '<p>攻撃力 100, 防御 50, 防御貫通 30 のダメージは、'
  + dc.effectiveDamage(100, 50, 30) + '</p>';
```

import文では`yarn add`した`progedu/damage-calc-4006`のモジュールをdcという変数に格納して利用しており、
その後`id`を取得してその要素に`innerHTML`で変更を加えています。

このように`Node.js`で実装されたモジュールを利用したJavaScriptが、クライアントのJavaScript向けに変換されるとどのようになるのかを確認してみます。コンソールで次のwebpackコマンドを実行します。

```
node_modules/.bin/webpack
```

すると次のような情報が出力されるはずです。

```
Hash: ハッシュ値
Version: webpack 4.26.1
Time: 4183ms
Built at: 2020-04-20 08:52:54
    Asset      Size  Chunks             Chunk Names
bundle.js  5.58 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./entry.js 218 bytes {0} [built]
    + 1 hidden module
```
***

### Tips: npx
npmのバージョン5.2.0以降`npx`コマンドが利用できます。`npx webpack`をすることで`/node_modules/.bin/`までのpath通す作業が省かれます。

***

これが出てきたら出力成功しています。`bundle.js`を見てみます。

```
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
（以下省略）
```

ここで記述されていることを簡単に説明すると、module.exportsというオブジェクトがブラウザ上で利用できるということを表しています。

生成したファイルをテンプレートに組み込めば完成です。

## DOMとは

上記で記述したwebpackではNode.jsで開発したモジュールを、そのままクライアントのJavaScriptとして利用することができました。今度はクライアントの JavaScirptを実装する際に発生する、DOMの操作に対するフレームワークを説明します。その前にDOMとはなんでしょうか。

そもそも不思議な点で言うと**HTMLという言語とJavaScriptという言語は全くもって別の言語であるのに対しなぜJavaScriptからHTMLの操作ができるのか**ということです。結論から行ってしまうと、JavaScriptは**Docment Object Model**と言う仕組みを介してDOMツリーを操作し、ブラウザが差分を反映させています。

例えばbody要素のp要素ののidを取得し、そのidに対応する要素を更新したりすることで見た目を変えています。(document.getElementByIdと言うAPIを利用しています。)

この記述を簡単にするフレームワークが














