---
title: 'CSSボタンレシピ集'
date: '2020-07-16T22:40:32.169Z'
template: 'post'
draft: false
slug: 'button-recipi'
category: 'Programming'
tags:
  - 'CSS'
  - 'SCSS'
description: 'ボタンのアニメーションレシピ集'
---

##今回やっていくこと

こんにちは、rattsl([@rattsl](https://twitter.com/rattsl))です。今回はCSSボタンのレシピ集としてまとめました。現在はクラスを付与するだけで一定のスタイルレベルまで簡単に実装できるBootstrapなどがありますが、自分でもカスタマイズできるようにSassでの実装を勉強しました。リッチコンテンツ制作のテンプレートとして再利用できるようにコードを記載しておきます。

##初めに
コードはSassで記述し、VSCodeのLiveSassCompilerでcssファイルを出力しています。

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
    <div id="container">
        <button class="btn">Button</button>
    </div>
</body>
</html>
```

```
//style.css

/* 親要素 */
#container {
  text-align: center;
}

/* ベース */
.btn{
  background-color: hoge;
  color: hoge;
  border: hoge fuga hage;
  padding: hoge;
  margin: hoge;
  font-weight: hoge;
  cursor: pointer;
  transition: hoge;
}

/* ホバー後 */
.btn:hover{
  background-color: hoge;
  color: hoge;
}

```

##ボタンレシピ

- シンプルボタン(白黒)

よく使う色は変数に格納しておきます。

```
//style.scss

$cWhite: white;
$cBlack: black;

#container {
  text-align: center;
}
.btn{
  background-color: $cWhite;
  color: $cBlack;
  border: 1px solid $cBlack;
  padding: 10px 40px;
  margin: 50px 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.8s;

  &:hover{
    background-color: $cBlack;
    color: $cWhite;
  }
}
```
<div id="container">
  <button class="btn">button</button>
  <style>
    #container{
    text-align: center;
    }
    .btn{
      background-color: white;
      color: black;
      border: 1px solid black;
      padding: 10px 40px;
      margin: 50px 10px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.8s;
    }
    .btn:hover{
      background-color: black;
      color: white;
    }
  </style>
</div>

- シンプルボタン（右下に影）

ボタンのクラスに`float`を付与

```
//style.scss

$cWhite: white;
$cBlack: black;

#container {
  text-align: center;
}

.btn {
  background-color: $cWhite;
  color: $cBlack;
  border: 1px solid $cBlack;
  padding: 10px 40px;
  margin: 50px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &.float{
    &:hover{
      box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.5);
    }
  }
}
```

<div id="container">
  <button class="btn2 float2">button</button>
  <style>
    #container {
    text-align: center;
    }
    .btn2 {
      background-color: white;
      color: black;
      border: 1px solid black;
      padding: 10px 40px;
      margin: 50px 0;
      font-weight: 600;
      cursor: pointer;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    .btn2.float2:hover {
      -webkit-box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.5);
              box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.5);
    }
  </style>
</div>

- ホバー時に浮き上がるボタン

ボタンのクラスに`shadow`を付与

```
//style.scss

$cWhite: white;
$cBlack: black;

#container {
  text-align: center;
}

.btn {
  background-color: $cWhite;
  color: $cBlack;
  border: 1px solid $cBlack;
  padding: 10px 40px;
  margin: 50px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &.shadow{
    &:hover{
      transform: translate(-2.5px, -2.5px);
      box-shadow: 5px 5px 0 0 $cBlack;
    }
  }
}
```

<div id="container">
  <button class="btn shadow">button</button>
  <style>
    #container {
    text-align: center;
    }
    .btn {
      background-color: white;
      color: black;
      border: 1px solid black;
      padding: 10px 40px;
      margin: 50px 0;
      font-weight: 600;
      cursor: pointer;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    .btn.shadow{
      background-color: white;
      color: black;
    }
    .btn.shadow:hover {
      -webkit-transform: translate(-2.5px, -2.5px);
          transform: translate(-2.5px, -2.5px);
      -webkit-box-shadow: 5px 5px 0 0 black;
          box-shadow: 5px 5px 0 0 black;
    }
  </style>
</div>

- 丸角押し込みボタン

ボタンのクラスに`solid`を付与

```
//style.scss

$cWhite: white;
$cBlack: black;

#container {
  text-align: center;
}

.btn {
  background-color: $cWhite;
  color: $cBlack;
  border: 1px solid $cBlack;
  padding: 10px 40px;
  margin: 50px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &.solid{
    border-radius: 10px;
    box-shadow: 2px 2px 0 0 $cBlack;
    &:hover{
      transform: translate(2px, 2px);
      box-shadow: none;
    }
  }
}
```

<div id="container">
  <button class="btn solid">button</button>
  <style>
    #container {
    text-align: center;
    }
    .btn {
      background-color: white;
      color: black;
      border: 1px solid black;
      padding: 10px 40px;
      margin: 50px 0;
      font-weight: 600;
      cursor: pointer;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    .btn.solid{
      background-color: white;
      color: black;
      border-radius: 10px;
      box-shadow: 2px 2px 0 0 black;
      -webkit-box-shadow: 2px 2px 0 0 black;
    }
    .btn.solid:hover {
      -webkit-transform: translate(2px, 2px);
      transform: translate(2px, 2px);
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  </style>
</div>

##終わりに
ボタンのデザインに関しては[サルワカ](https://saruwakakun.com/html-css/reference/buttons)のコードをみてるととても勉強になります。レイアウトの再利用性を高めるためにもSassは非常に便利なツールなのでこれからもキャッチアップする必要がありそうです。







