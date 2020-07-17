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
基本的にpositionプロパティは**要素の位置**を、z-indexプロパティは**要素の重なり方**の指定を行うために使います。この二つを使いこなせないと意図したレイアウトにできません。ではまずグレーの親要素を1つ、子要素（div1,div2,div3）を3つ、孫要素(div4)を1つ配置し詳しく説明します。

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
  }
  .div{
    font-weight: 600;
    padding: 0.5rem;
    font-size: 1.1em;
    width: 150px;
    height: 150px;
    box-shadow: 7px 7px 0 0 #000;
  }
  .div.div1{
    background: orange;
  }
  .div.div2{
    background: tomato;
  }
  .div.div3{
    background: teal;
  }
  .div.div4{
    width: 80px;
    height: 80px;
    background-color: yellow;
  }
  </style>
</div>

上記の要素はまだpositionプロパティとz-indexプロパティは設定しておらず、それぞれは初期値はデフォルトで`position: static;`をとります。