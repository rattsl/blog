---
title: 'ハンバーガーアイコンを作ってみた'
date: '2020-07-19T22:40:32.169Z'
template: 'post'
draft: false
slug: 'humberger-icon'
category: 'Programming'
tags:
  - 'CSS'
  - 'SCSS'
  - 'JavaScript'
description: '巷でよく見るハンバーガーアイコンを作ってみました。'
---

##今回やっていくこと

こんにちは、rattsl([@rattsl](https://twitter.com/rattsl1))です。今回はフルスクラッチでレスポンシブサイトでよく見るメニューアイコンを作ってみました。

##挙動確認
アイコンはページの角に設置し、`button`タグの子要素の`span`タグでハンバーガーアイコンを表現しています。ボタンが押されたら`span`の要素を「X」にアニメーションさせ,押すと閉じれるとわかるようなUIに変化するようにしてあります。トグルはJavaScriptでDOMを操作し、`menu-open`クラスの付け外しを行っています。

##アニメーションを作るときのポイント
CSSにおいてアニメーションを作るときのポイントは、**しっかりと変化する要素を分解して状態を指定してからアニメーションを付ける**ということです。その動かしたい要素の初めの状態と動き終わった状態を先に指定してから`transition`プロパティを付けるという風に、段階で分けるとアニメーションの理解が深まります。

##ソース

```
//index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button class="mobile-menu-icon" onclick="document.querySelector('body').classList.toggle('menu-open')">
    <span></span>
    <span></span>
    <span></span>
  </button>
</body>
</html>
```

```
//style.scss

$cBlack: black;
$cWhite: white;

.mobile-menu-icon{
  background-color: transparent;
  border: none;
  cursor: pointer;

  & > span{
    background-color: $cBlack;
    width: 35px;
    height: 2px;
    display: block;
    margin-bottom: 9px;
    transition: all 1s;

    &:last-child{
      margin-bottom: 0;
    }
  }
}

.menu-open{
  background-color: $cBlack;

  //menu-openがついているときのmobile-menu-iconの設定
  .mobile-menu-icon{
    & > span{
      background-color: $cWhite;

      &:nth-child(1){
        transition-delay: 0.2s;
        transform: translateY(11px) rotate(135deg);
      }
      &:nth-child(2){
        transform: translateX(-18px) scaleX(0); 
        // width: 0;
      }
      &:nth-child(3){
        transition-delay: 0.4s;
        transform: translateY(-11px) rotate(-135deg);
      }
    }
  }
}
```

##成果物

<div class="container_icon">
 <button class="mobile-menu-icon" onclick="document.querySelector('.container_icon').classList.toggle('menu-open')">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <style>
  .container_icon{
    width: 100%;
    height: 420px;
    transition: 0.8s;
  }
  .mobile-menu-icon {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .mobile-menu-icon > span {
    background-color: black;
    width: 35px;
    height: 2px;
    display: block;
    margin-bottom: 9px;
    -webkit-transition: all 1s;
    transition: all 1s;
  }
  .mobile-menu-icon > span:last-child {
    margin-bottom: 0;
  }
  .menu-open {
    background-color: black;
  }
  .menu-open .mobile-menu-icon > span {
    background-color: white;
  }
  .menu-open .mobile-menu-icon > span:nth-child(1) {
    -webkit-transition-delay: 0.2s;
            transition-delay: 0.2s;
    -webkit-transform: translateY(11px) rotate(135deg);
            transform: translateY(11px) rotate(135deg);
  }
  .menu-open .mobile-menu-icon > span:nth-child(2) {
    -webkit-transform: translateX(-18px) scaleX(0);
            transform: translateX(-18px) scaleX(0);
  }
  .menu-open .mobile-menu-icon > span:nth-child(3) {
    -webkit-transition-delay: 0.4s;
            transition-delay: 0.4s;
    -webkit-transform: translateY(-11px) rotate(-135deg);
            transform: translateY(-11px) rotate(-135deg);
  }
  </style>
</div>

##終わりに
今回は使用していませんがanimationには`@keyframes`などの便利な機能も備わっており、ChromeのDevtoolなどと合わせて使うとより自由な表現が可能になります。`transition-delay`プロパティの値を変えるなどして自分がしっくりくるアニメーションになるまで遊んでみるのもいいと思います。