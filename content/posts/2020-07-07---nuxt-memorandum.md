---
title: '初めてのNuxt.js'
date: '2020-07-07T22:40:32.169Z'
template: 'post'
draft: false
slug: 'nuxt-memorandum'
category: 'Programming'
tags:
  - 'Vue.js'
  - 'Nuxt.js'
description: 'nuxt.jsを触ってみて特徴等を探っていき、TODOアプリを作ってみました。'
---
## Nuxt.jsとは
Vue.jsのフレームワーク。Vue.jsでSSRが可能になることで今までの欠点を補い、より強力なアプリケーションが作れるようになります。SSRとは事前にサーバサイドでレンダリングをすることで、SPA特有のサイトに初めて訪れたときに画面が白くなる現象を抑えることを可能にします。他にもルーティングが簡単になるなど、たくさんの便益を与えてくれます。

ルーティングについて深掘りしていくと、Vue-Routerのようにライブラリをインポートして明示的に書く必要が無いそうです。ファイルを作ってブラウザで`localhost:3000/path`にアクセスするとルートの定義を勝手にしてくれます。`<router-link>`を使ってページ遷移をするが、実際にレンダリングされるのは**aタグ**になっている。詳細は`.nuxt/router.js`の中の`routes`で設定されているみたい。

##早速TODOアプリを作ってみる


