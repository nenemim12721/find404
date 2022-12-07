# Puppeteerで404画面のページを取得しよう

## 本コードでやりたいこと
 - Puppeteerを使って対象のページが存在するかを確認し、存在しないページのリストをコマンドで出力する
 - 確認したい画面のurlはdata.jsonに持たせる
 - デバイスを選択して対象画面で確認できるようにする

## 使い方
 - data.jsonのtargetPageUrlに確認したい画面を配列で入れる
 - スマホ画面で確認したい場合、targetDevice.spの値に下記の対象デバイスとして設定可能な値を入れる
 - PC画面の確認をしたい場合は、targetDevice.spをfalseにする
 - コマンドで`find404.js`を実行

## 参考
https://iwb.jp/puppeteer-multiple-webpage-404status-code-search/#response404
https://iwb.jp/puppeteer-deprecated-code/
https://pptr.dev/

## 対象デバイスとして設定可能な値
以下の公式ページ参照
https://pptr.dev/next/api/puppeteer.knowndevices/