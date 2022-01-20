importPackage(org.jsoup);

const allsee = "\u200b".repeat(500);

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (msg == "코인 시세") {
        replier.reply("데이터를 가져오는 중입니다...");
        replier.reply(binance());
    }
}


function binance() {
    const line = "=".repeat(20);
    const data = JSON.parse(
        Jsoup.connect("https://api.binance.com/api/v3/ticker/24hr")
            .ignoreContentType(true)
            .get().text()
    );
    let res = "Binance 시세조회\n" + allsee + "\n" + line + "\n\n";
    data.forEach((e) => {
        res += "종목: " + e.symbol + "\n\n전일 종가: " + +e.prevClosePrice + "\n금일 고가: " + +e.highPrice + "\n금일 저가: " + +e.lowPrice + "\n\n구매가: " + +e.askPrice + "\n판매가: " + +e.bidPrice + "\n등락폭: " + +e.priceChangePercent + "%\n\n" + line + "\n\n";
    });
    return res;
}