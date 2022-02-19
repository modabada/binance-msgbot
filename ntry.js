const scriptName = "ntry";

importPackage(org.jsoup);
ntry_obj = {
    last_round: 0,
    last_time: 0
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    ntry(replier);
}


function ntry(replier) {
    let time = Date.now();
    if (time - ntry_obj.last_time < 10 * 1000) { // 딜레이 시간(초) * 1000
        return;
    }

    const ball = JSON.parse(Jsoup.connect("https://ntry.com/data/json/games/powerball/result.json").ignoreContentType(true).get().text());

    if (ball.date_round == ntry_obj.last_round) {
        return;
    }

    const ladder = JSON.parse(Jsoup.connect("https://ntry.com/data/json/games/power_ladder/result.json").ignoreContentType(true).get().text());
    ntry_obj.last_time = time;
    ntry_obj.last_round = ball.date_round;

    replier.reply(
        ball.date_round + "회차 파워볼\n" + [
            ball.pow_ball_oe ? ball.pow_ball_oe : "홀",
            ball.pow_ball_unover === "언더" ? "언" : "오",
            ball.def_ball_size ? ball.def_ball_size : "소",
            ball.def_ball_oe ? ball.def_ball_oe : "홀",
            ball.def_ball_unover === "언더" ? "언" : "오"
        ].join(" ") + "\n" + "=".repeat(20) + "\n" +
        ladder.r + "회차 사다리\n" + [
            (ladder.s ? ladder.s : 'LEFT') == "LEFT" ? "좌" : "우",
            ladder.l ? ladder.l : '3',
            (ladder.o ? ladder.o : 'ODD') == "ODD" ? "홀" : "짝"
        ].join(" ")
    );
}
