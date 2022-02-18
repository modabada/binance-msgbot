const scriptName = "Jacqueline2.0";

importPackage(org.jsoup);

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    switch (msg) {
        case "사다리":
            replier.reply(ntry("ladder"));
            break;
        case "파워볼":
            replier.reply(ntry("ball"));
            break;
    }
}


function ntry(item) {
    let data;
    switch (item) {
        case "ball":
            data = JSON.parse(Jsoup.connect("https://ntry.com/data/json/games/powerball/result.json").ignoreContentType(true).get().text());
            return data.date_round + "회차 파워볼\n" + [
                data.pow_ball_oe ? data.pow_ball_oe : "홀",
                data.pow_ball_unover === "언더" ? "언" : "오",
                data.def_ball_size ? data.def_ball_size : "소",
                data.def_ball_oe ? data.def_ball_oe : "홀",
                data.def_ball_unover === "언더" ? "언" : "오"
            ].join(" ");
        case "ladder":
            data = JSON.parse(Jsoup.connect("https://ntry.com/data/json/games/power_ladder/result.json").ignoreContentType(true).get().text());
            return data.r + "회차 사다리\n" + [
                (data.s ? data.s : 'LEFT') == "LEFT" ? "좌" : "우",
                data.l ? data.l : '3',
                (data.o ? data.o : 'ODD') == "ODD" ? "홀" : "짝"
            ].join(" ");
        default:
            throw Error();
    }
}
