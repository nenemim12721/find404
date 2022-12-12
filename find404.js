const puppeteer = require('puppeteer');
const fs = require('fs');
const jsonPath = './data.json';
// 検索条件やURLをdata.jsonから取得する
const data = JSON.parse(fs.readFileSync(jsonPath));
// 使用するデバイスを取得
const device = data.targetDevice.sp ? puppeteer.KnownDevices[data.targetDevice.sp] : false;
// data.jsonカラ取得したURLのリスト
const targetUrl = data.targetPageUrl;
// 対象urlが指定されていなかったら処理を中止
const noTargetUrl = !targetUrl.length || targetUrl.some((url) => !url.length);
if (noTargetUrl) {
    console.log('data.jsonのtargetPageUrlにurlを指定してください><');
    return;
}

(async() => {
    // 新規ブラウザをシークレットブラウザで立ち上げる
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 10000,
        ignoreDefaultArgs: ['--disable-extensions'],
    });
    const context = await browser.createIncognitoBrowserContext();
    // 新規タブを開く
    const page = await context.newPage();
    if (device) {
        // 開くデバイスを指定
        await page.emulate(device);
    }

    try {
        const notFound = [];
        for (url of targetUrl) {
            // ページにアクセスする
            const response = await page.goto(url);
            // ページにアクセスできないあるいは404が帰ってきた時
            if (!response || response.status() >= 400) {
                notFound.push(url);
            }
        }

        // 400番台のページをログ出力
        console.log('==============================');
        if (!notFound.length) {
            console.log('すべてのページが存在します');
        } else {
            console.log('以下のページが表示できません。');
            console.log('==============================');
            notFound.forEach((url) => {
                console.log(url)
            });
        }
        console.log('==============================');
    } catch(e) {
        if (e instanceof Error) {
            console.log(e.message);
        } else {
            console.log('予期せぬエラー');
        }
    } finally {
        // チェックが終了したらブラウザーを閉じる
        await browser.close();
    }

})();