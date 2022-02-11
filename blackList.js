const scriptName = "blacList.js";

importClass(java.io.File);

const admin = "관리자 해시값";
const path = "/storage/emulated/0/msgbot/Database";

File(path + "/black").exists() || File(path + "/black").mkdirs();
File(path + "/users").exists() || File(path + "/users").mkdirs();

function response(p) {
    blacklist(p);
}

function blacklist(p) {
    const date = "\n" + new Date().toLocaleDateString("ko-KR", { hour12: false }) + "\n\n";
    const hash = java.lang.String(p.ImageDB.getProfileImage()).hashCode();
    let list = DataBase.getDataBase("users/" + hash);
    if (list) {
        list = list.split("\n");
    }
    else {
        DataBase.setDataBase("users/" + hash, p.sender + date);
        list = (p.sender + date).split("\n");
    }
    (p.msg == "내 해시") && p.replier.reply(p.sender + "님의 해시는 " + hash + "입니다");
    DataBase.getDataBase("black/" + hash) && p.replier.reply("블랙유저가 채팅했습니다");
    if (list[list.length - 4] != p.sender) {
        DataBase.appendDataBase("users/" + hash, p.sender + date);
        list.push(p.sender + date);
    }

    if (hash == admin & p.msg.startsWith("/블랙")) {
        if (["추가", "삭제"].includes(p.msg.slice(4, 6))) {
            let target = p.msg.slice(7);
            "추가" == p.msg.slice(4, 6) ? DataBase.setDataBase("black/" + target, date) : DataBase.removeDataBase("black/" + target, date);
        }
        else if (p.msg.endsWith("초기화")) {
            const black = new File(path + "/black").list();
            for (let i = 0; i < black.length; i++) {
                DataBase.removeDataBase("black/" + black[i].slice(0, -4));
            }
        }
    }
}