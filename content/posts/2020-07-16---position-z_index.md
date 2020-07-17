---
title: 'positionとz-index'
date: '2020-07-16T22:40:32.169Z'
template: 'post'
draft: false
slug: 'position_z-index'
category: 'Programming'
tags:
  - 'position'
  - 'z-index'
description: '思い通りのレイアウトを実現させるためにpositionとz-indexを学びます。'
---
##初めに
こんにちは、rattsl([@rattsl](https://twitter.com/rattsl1))です。今回はより高度なレイアウトを実現させるためにCSSの**position**と**z-index**を学んでいきます。

##positionとz-index概要
基本的にpositionプロパティは**要素の位置**を、z-indexプロパティは**要素の重なり方**の指定を行うために使います。この二つを使いこなせないと意図したレイアウトにできません。ではまずグレーの親要素(container)を1つ、子要素（div1,div2,div3）を3つ、孫要素(div4)を1つ配置し詳しく説明します。

※ハンズアウト形式で説明していきます。このブラウザで検証を使う際は実際の記載されている挙動と違った結果が返ってくる為、以下のコードをコピーして自分の環境で実行してください。

```
//index.html
<div id="container">
  <div class="div-1">div1</div>
  <div class="div-2">div2</div>
  <div class="div-3">
    div3
    <div class="div-4">div4</div>
  </div>
</div>
```

```
//style.scss
#container {
  padding: 1rem;
  background-color: gray;
}

div {
  font-weight: 600;
  padding: 0.5rem;
  font-size: 1.1em;
  width: 150px;
  height: 150px;
  box-shadow: 7px 7px 0 0 #000;
}

.div-1 {
  background: orange;
}
.div-2 {
  background: tomato;
}
.div-3 {
  background: teal;
}
.div-4 {
  width: 80px;
  height: 80px;
  background-color: yellow;
}
```

<div id="container">
  <div class="div div1">div1</div>
  <div class="div div2">div2</div>
  <div class="div div3">
    div3
    <div class="div div4">div4</div>
  </div>
  <style>
  #container {
  padding: 1rem;
  background-color: gray;
  position: relative;
  }
  .div{
    font-weight: 600;
    padding: 0.5rem;
    font-size: 1.1em;
    width: 150px;
    height: 150px;
    box-shadow: 7px 7px 0 0 #000;
    position: relative;
  }
  .div.div1{
    background: orange;
    right: 37%;
  }
  .div.div2{
    background: tomato;
    right: 37%;
  }
  .div.div3{
    right: 37%;
    background: teal;
  }
  .div.div4{
    width: 80px;
    height: 80px;
    background-color: yellow;
  }
  </style>
</div>

##positionについて

上記の要素はまだpositionプロパティとz-indexプロパティは設定しておらず、positionプロパティに関しては、それぞれは初期値はデフォルトで`position: static;`をとります。このstaticはこんなのがあるんだな程度で大丈夫です。よく使われるのは次の4つ。

- **relative**
- **absolute**
- fixed
- sticky

まずrelativeから。relativeとは**現在表示されている位置から相対的なポジションをとる場合**に使用します。検証でこの灰色のcontainerに`position:relative`を付けてみて下さい。特に変化はしないと思います。理由としてrelativeは現在の要素の位置から相対的に位置を変えるため、`top`や`left`を使って変更を加えないと位置が変わりません。そしてcontainerにrelativeを付けた後は子要素のdiv1に`position: absolute;`を付与して下さい。div2がなくなったかと思いますが実際にはdiv2の後ろに隠れています。

この**absolute**というのは**親要素にrelativeが付いているものの左上から絶対値で要素を表示する場合**に使用します。div1に続けて`top: 0;`,`left: 0`を付けると親要素のcontainerのpaddingが打ち消され、containerの左上隅と同じ位置にdiv1の左上隅がくるかと思います。上記で*親要素にrelativeがついているものの*と申しましたが、containerのrelativeを外してみて下さい。ウィンドウの左上隅まで飛んで行ったかと思います。挙動の理由としましては、子要素のabsoluteが親要素のrelative(正確には`position: static;`以外)を探したが結局なかったためウィンドウの左上まで行ったということになります。

このように子要素でabsoluteを使う際は、親要素にrelativeを使うことによって意図した場所に要素を持っていくことができます。他にもfixedは位置を指定することでスクロールしてもずっとそのウィンドウ上の位置を維持し続けることができるという性質を持っています。ホームページの上の方にあるメニューバーなどでよく使われています。

##z-indexについて

次にz-indexについて説明していきます。先ほどのcontainerのrelativeは付けた状態にしてdiv2にもrelativeを付けてみて下さい。div1とdiv2が被ったかと思います。**このdiv1を手前に持ってきたいときにz-indexを使います。**使い方は簡単で手前に持ってきたい方の値を大きくするだけです。div1には`z-index: 20;`,div2には`z-index: 10;`と指定してみて下さい。手前にdiv1がくるかと思います。div2を`z-index: 30;`にするとまたdiv2が前にきます。

もうちょっと詳しくz-indexを掘り下げていきます。

div3に`position: absolute;`,`top: 40px;`,`left: 40px;`,`z-index: 50;`を指定して下さい。div3のz-indexの値が一番大きいので一番前にきます。div4をdiv3より後ろに配置はしたいときどうしますか？この感じの定石だとpositionを設定してz-indexをdiv3の値より小さくすれば良さそうですが実際には期待した挙動をしてくれません。何故でしょうか？

これは**スタックコンテキスト**という概念が存在するからです。スタックコンテキストに関しましては[こちら](https://qiita.com/hoto17296/items/42e62989193504d512c7)の記事が非常にわかりやすい為、こちらを読んでいただきたいのですが（説明丸投げすいません）、こちらの記事のお言葉を借りると**div4はdiv3のスタックコンテキストに所属しており、その中でのz-indexの値が反映される**ということになります。

##最後に
最後の説明は端折ってしまいましたが、positionとz-indexを使いこなせると、よりリッチなコンテンツを制作できるので勉強して損はなかったと思います。もっと勉強しよう...

