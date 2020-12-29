---
slug: "/blog/nitic_ctf_writeup"
createdAt: 2020-07-19
updatedAt: 2020-07-19
title: "NICIT CTF Writeup"
tags: ["CTF"]
status: "published"
---

[NITIC CTF](https://wakuwakuclub.connpass.com/event/182469/) に参加しました．CTF の経験は cpaw_ctf を 8 割がた埋めたことと
リアルタイムのコンテストで椅子温め係をやったことがあるくらいです．  
そんなぼくでも想定以上に解けたので Writeup を書いてみようと思います．以下解いた順です．

## prime factorization (PPC)

素因数分解してほしそうな数が与えられるので適当に素因数分解をします．フォーマットを整えて投げると通ります．

## anim (Forensic)

よく分からない `flag` というファイルが降ってきます．こういうときはまず `file` コマンドで素性を調べてみます．

```
$ file flag
flag: Microsoft PowerPoint 2007+
```

PowerPoint らしいです．無理矢理開きます．すると青い背景に何も書かれていないテキストボックスが配置されています．

![Powerpoint](../images/20200719133633.jpg)

背景色をいじったりしてもなにも見えなかったので詰まってしまいましたが，ふとサイドバーを見ると星マークがついています．  
これはこのスライドがアニメーションを含むということなのでアニメーションを再生してみました．  
するとテキストボックスがシュッと動いてフラグが出てきました． `file` コマンド使えますか問題っぽいですね．

## shift only (Crypto)

暗号化に使ったとみられる Python スクリプトと暗号文が降ってきます．

```python
from os import environ
flag = environ["FLAG"]
format = environ["FORMAT"]


encrypted = "6}bceijnob9h9303h6yg896h0g896h0g896h01b40g896hz"
shift_table = "abcdefghijklmnopqrstuvwxyz0123456789{}_"
def encrypt(text: str, shift: int) -> str:
    assert  0 <= shift <= 9
    res = ""
    for c in text:
        res += shift_table[(shift_table.index(c)+shift)%len(shift_table)]
    return str(shift) + res
for shift in format:
    flag = encrypt(flag, int(shift))
with open("encrypted.flag", "w") as f:
    f.write(flag)
```

これが暗号化のスクリプトです．あんまりよく読んでいなかったので `encrypt` でシフトしてそのシフト幅を暗号の先頭に付加しているだけの簡単な問題だと思いました．  
逆シフトする関数を書いて復号しようとしましたが，フラグっぽいものは得られません．

ここでスクリプトをよく読むと，シフト幅を `format` から一文字ずつ取ってきて，順番に複数回シフトしていることが読み取れました．つまり `format = "123"` のときは
シフト幅 1, 2, 3 で順にシフトするということです．

最後に暗号化したときのシフト幅は暗号の一文字目を見れば分かるので，それを読みながら順に逆シフトしていけばよいです．フラグの形式から，暗号の一文字目が数字でなければそれがフラグです．
実装は以下の通りになりました．

```python
encrypted = "6}bceijnob9h9303h6yg896h0g896h0g896h01b40g896hz"
def decrypt(text: str, shift: int) -> str:
    res = ""
    for c in text:
        res += shift_table[(shift_table.index(c) - shift + len(shift_table)) % len(shift_table)]
    return res

while True:
    try:
        # シフト幅
        shift = int(encrypted[0])
        encrypted = decrypt(encrypted[1:], int(shift))
    except ValueError as e:
        # 一文字目が数字でなければフラグ
        print(encrypted)
        break
```

## 8^2 (Web)

`data:image/jpeg;base64,` で始まるフラグが与えられます．ググるとこれは `img` タグに JPEG を base64 でエンコードして埋め込むときの書式らしいです．
ブラウザのアドレスバーにコピペして見るとフラグが書かれた画像が表示されました．

## Dangerous Twitter (Recon)

運営のフレキシブル基盤さんの Twitter プロフィールのリンクが提示されて，そこからパスワードを探します．  
かなり難しそうだと思って投稿を眺めていたらパスワードが書かれた紙の写っている画像が投稿されていたので，これを入力してみると通りました．
今回はたまたま開いた画像にフラグが書いてあってラッキーでしたが，最悪ツイートを全探索すればいいので運がなくても解けます．

## cha1n (Misc)

いくつかのシェルスクリプトとバッチファイルが降ってきます．とりあえずバッチファイルは無視します．  
シェルスクリプトを見ると `str=${str//()/h}` のように文字列の置換を行っています．また `c.sh` には `njtjxpxtfwx()s1Kpx()s1Kpx()s1Kpx()s1Kpx()s1Kp5x8mb83` という
いい感じに置換するとフラグになりそうな文字列があり，これに置換を施して `echo` しています．  
問題名もヒントになっていて，順に置換を施して(チェインして)やればよさそうなことに気づきます．置換をすべて書き出していい感じにつながるような順でチェインしてやるとフラグを得られました．  
実行は以下のようにしました．

```bash
$ bash c.sh | bash h.sh | bash a.sh | bash 1.sh | bash n.sh
```

## Fortran (Reversing)

一番苦戦しました．Fortran からコンパイルされたと思しき ELF と EXE が降ってきます．ELF のほうを実行すると `nitictf{Fortran}` というフラグらしきものがテキストファイルに書き込まれますがこれはフラグではありません．  
次に EXE のほうを実行しようとしますが DLL が見つからないというエラーが出ます．  
ELF に適当な入力を食わせたらなにか吐かないかなと思っていろいろ試してみますが同じ出力しか得られません．しかたないので `objdump -d -M intel` してグッとにらんでみるとどうやら入力を受け取っているわけではなさそうでした． `strings`を試してもそれっぽいものは得られず，ここで諦めてしまいました．  
ところが夜ご飯を食べてから EXE のほうを `strings` にかけていないことに気づいて試してみるとなんとフラグがありました! なぜこれを最初に試さなかったのか......

## 完走した感想

完走はできませんでしたが......  
Pwn が最後まで解けなかったのが残念ですがそれ以外は楽しく解けたので良かったです．Pwn は CTF の花形みたいなイメージがあって自力で解けるようになりたいのですが
根本的なことが分かっていない気がしています．そのうちやる気が出てくると思うのでそのときには基本的なことからやっていこうと思います．
