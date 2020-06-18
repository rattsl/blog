---
title: '実践サーバサイドプログラミング-Day2-'
date: "2020-04-15T23:46:37.121Z"
template: "post"
draft: false
slug: "day2"
category: "Programming"
tags:
  - "テスト"
  - "継続的インテグレーション"
  - "mocha"
description: "実践サーバサイドプログラミングDay2ということでテストや継続的インテグレーションについてお勉強していこうと思います。"
---

## 今回やっていくこと

こんにちわ、rattsl（[@rattsl](https://twitter.com/rattsl)）です。

今回は前回の続きで簡単なテストをし、継続的インテグレーション何かということ勉強していこうと思います。

## mochaをインストールする

まずmochaをyarnを使ってローカルにインストールします。

```
yarn add mocha --dev
```

*上記では`--dev`オプションをつけていますが、基本的にテストやタスクランナー系のライブラリは開発時のみの利用になるので、`devDependencies`に入れます。

コンソールで`node_modules/mocha/bin/mocha -h`と入力したときにヘルプが出てきたらインストールが完了しています。

## テストコードの記述

それでは今回テストをするためのプログラムを作ってみます。プログラムはアルゴリズム問題で定番のフィボナッチ数列を使い、40番目までを一度出力してみます。

```
// index.js
'use strict'

function fib(n){
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } 
  return fib(n - 2) + fib(n - 1)
}

var length = 40
for (var i = 0; i <= length; i++){
  console.log(fib(i))
}
```

`node`で実行してみるとコンソールに次のような結果が出力されました。

```
0
1
1
2
3
5
8
13
21
34
55
89
144
233
377
610
987
1597
2584
4181
6765
10946
17711
28657
46368
75025
121393
196418
317811
514229
832040
1346269
2178309
3524578
5702887
9227465
14930352
24157817
39088169
63245986
102334155
```

40番目の値が`102334155`と出力されましたが、上記は定義された関数が自分をreturnで返している再帰関数と呼ばれるプログラムが実装されており、処理の回数が増えれば増えるほど計算回数が増える**指数オーダー**の形に一致します。**O記法**で表すと

> **O(2ⁿ)**

となります。これだと実行に時間がかかってしまいUXを損ないます。どうしたら軽量なプログラムにできるでしょうか？

## アルゴリズム改善

そこで次にアルゴリズムを改善し、40番目の値のみを出力するプログラムに書き換えて、その書き換えた結果が上記結果と一致するかどうか、mochaでテストをしてみようと思います。

アルゴリズムは**連想配列**を使い、一度計算したものを一時的にキャッシュしてそのキャッシュされた値を利用する方法を採ります。

```
// index.js
'use strict'

const cacheArray = new Map();
cacheArray.set(0, 0);
cacheArray.set(1, 1);
cacheArray.set(2, 2);

function fib(n) {
  if(cacheArray.has(n)) {
    return cacheArray.get(n);
  }
  const value = fib(n - 1) + fib(n - 2);
  cacheArray.set(n, value);
  return value;
}

module.exports = {
  fib: fib
};
```

書き換えました。先ほどのプログラムに加え、`module.exports`では関数をモジュール化し、どの階層からでも使えるようにしています。

## 計算が正しいかテストする

テストを書いていきます。mochaではtestというディレクトリにtest.jsというファイルが存在すると、自動的に検出し実行してくれます。書き方は[mochaのフォーマット](https://mochajs.org/#getting-started)に沿って書いていきます。

```
// test/test.js
'use strict';

const assert = require('assert');
const ff = require('../');

describe('#fib()', () => {

  it('アルゴリズム変更後の値が変わっていないか', () => {
    assert.equal(ff.fib(40), 102334155);
  });

});
```

mochaは`describe`という関数が提供されており、第一引数にはテストをする関数を文字列でを、第二引数では無名関数を渡しています。その渡された第二引数の無名関数の中に**it関数**記述していきます。it関数では第一引数に要件名、第二引数にassertモジュールを使って第一引数の関数の実行結果が第二引数の値と一致しているかを調べています。以下で実行してみましょう。

```
node_modules/mocha/bin/mocha
```

コンソールに出力された結果をみてみます。

```
$ node_modules/mocha/bin/mocha


  #fib()
    1) アルゴリズム変更後の値が変わっていないか


  0 passing (6ms)
  1 failing

  1) #fib()
       アルゴリズム変更後の値が変わっていないか:

      AssertionError [ERR_ASSERTION]: 165580141 == 102334155
      + expected - actual

      -165580141
      +102334155

      at Context.it (test/test.js:9:12)

error Command failed with exit code 1.
```

テストが失敗しており、`failing`という文字が出ています。内容をよくみると`アルゴリズム変更後の値が変わっていないか`という要件内でアサーションエラーが出ているようです。期待している値は`165580141`であるのに対し、実際は`102334155`という値が出力されているよ、また場所は`(test/test.js:9:12)`だよと親切に教えてくれます。index.jsに戻って見てみると、

`cacheArray.set(2, 2);`

という余計なものが入っていました。消してもう一度実行します。

***

### Tips: テストコマンドをエイリアスする

テストを実行するとき、

`node_modules/mocha/bin/mocha`

と、入力していましたが、毎回この長い文字を入力するのは面倒なので、`package.json`に

```
"scripts": {
  "test": "node_modules/mocha/bin/mocha"
  },
```

というスクリプト記入することで`yarn test`で一発でテスト可能です。

***

```
yarn run v1.13.0
$ node_modules/mocha/bin/mocha


  #fib()
    ✓ アルゴリズム変更後の値が変わっていないか


  1 passing (7ms)

Done in 0.66s.
```

passingと出ています。無事成功です。違う要件も追加してみます。

## 負の値が入力された場合

次に負の値が入力されたときのテストをしてみようと思います。今回、フィボナッチ数列のn番目の値はマイナスを取らないようにしたいので、まずtest.jsの`describe`に次のように記述を加えます。

```
it('負の値が入力されたとき0と表示', () => {
    assert.equal(ff.fib(-40), 0);
  });
```

実行後の結果はどうなるでしょうか。

```
・
・
・
at fib (index.js:66:17)
at fib (index.js:66:17)
at fib (index.js:66:17)
at fib (index.js:66:17)
at fib (index.js:66:17)
at fib (index.js:66:17)
at Object.fib (index.js:66:17)
at Context.it (test/test.js:13:21)



error Command failed with exit code 1.
```

謎のエラーが大量に出てきました。これに対応していこうと思います。

fib関数の引数にマイナスの値が渡ってきたとき、0より小さい値だったら0を返すという`normalize`関数を実装します。その後、normalize関数をfib関数に組み込み、渡ってきた値をnormalizeし正常値に変えた後、`_n`として変数に格納し、対応する値を変更していきます。

```
//index.js

const cacheArray = new Map();
cacheArray.set(0, 0);
cacheArray.set(1, 1);

function fib(n) {

  var _n = normalize(n)

  if(cacheArray.has(_n)) {
    return cacheArray.get(_n);
  }
  const value = fib(_n - 1) + fib(_n - 2);
  cacheArray.set(_n, value);
  return value;
}

function normalize(n) {
  if (n < 0) {
    return 0;
  } else {
    return n;
  }
}
```

`yarn test`します。

```
yarn run v1.13.0
$ node_modules/mocha/bin/mocha


  #fib()
    ✓ アルゴリズム変更後の値が変わっていないか
    ✓ 負の値が入力されたとき0が出力されるか


  2 passing (13ms)

Done in 0.64s.
```

うまくいきました！

これが、テスティングフレームワークを用いた要件の検証です。他にも様々な機能がmochaから提供されています。このように、テストを行うことで過去の要件との整合性を取るための確認ができ、不具合の起きにくいプログラムがかけると思います。

***

## 継続的インテグレーションとは

継続的インテグレーションとは、英語では Continuous integration といい、 CI と省略されることもあります。
ソフトウェア開発において、継続的にソフトウェアのコードの品質の低下や機能の問題を早期に検出し、開発の効率化を図る習慣のことです。

継続的インテグレーションの実践として、 CI ツールと呼ばれるツールを用いて、

* ソースコード自体の品質の解析 (静的解析)
* 依存ライブラリの解決やコンパイルなどを行うビルド
* ソフトウェアのテスト
* 配布のためのドキュメントやパッケージの作成
* ソフトウェアの環境へのデプロイ

を、ソースコードの変更があるたびに行う、ということが一般的にされています。

## 二日目はここまで

二日目はここまでにして、次はWebpackなどクライアントサイドのフレームワークを勉強していきます。

