---
title: 'Webpackのボイラープレートを作成しました'
date: '2021-11-03T22:40:32.169Z'
template: 'post'
draft: false
slug: 'webpack-boil'
category: 'Programming'
tags:
  - 'Webpack'
  - 'Webapck5'
---

## 今回やったこと

こんにちは、rattsl([@rattsl](https://twitter.com/rattsl1))です。久しぶりにブログ更新しました。
webサイトを構築するに当たって毎回webpack設定ファイルを書いてローダーをインストールしてプラグインインストールして〜〜が厄介なので、今回使い回しができるようWebpackボイラープレートを作成しました。

## webpackとは？
webapckとは簡単に言うと各リソース(jsファイル、cssファイル、画像ファイル等)を一つのjsファイルにバンドルしてhtmlに読み込ませることができる優れものです。これによりhttp通信が減らせて表示も早くなるなどいろいろなメリットがあります。

## リポジトリ

https://github.com/rattsl/webpack-boil

## 所感
はじめバンドルするとcssや画像ファイルが別で欲しい場合どうするんだと思いましたが、プラグインで別々に切り出すことも可能なのでクライアントワークにも使える点非常にいいです。
またLP作成案件で生のHTMLにCSS読み込ませて、JQueryをhead読み込ませて、ライブラリをbody閉じタグの前で記述して〜〜は正直手動で書く分エラーも増えるし時間もかかるしで全くもってスマートじゃないのでnpmでパッケージ管理してwebpackでバンドルするのが最適だなと思います。

