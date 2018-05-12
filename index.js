const request = require('request');

exports.getStats = (username, platform, callback) => {

    var url = 'https://fortnitetracker.com/profile/';
    url += `${platform}/${encodeURIComponent(username)}?old=1`

    request(url, (error, response, body) => {

        if(platform != "pc" && platform != "psn" && platform != "xbl"){
            callback(new Error("Platform must be one of: 'pc', 'psn', 'xbl'"), null);
            return;
        }

        if(!response){
            callback(new Error("No response"), null);
            return;
        }

        if(response.statusCode != 200){
            callback(new Error("Player not found"), null);
            return;
        }

        if(error){
            callback(new Error("Some error occured :("), null);
            return;
        }

        var last7 = body.substring(body.indexOf("var Last7") + 12);
        last7 = last7.substring(0, last7.indexOf("</script>") - 1);

        var accountInfo = body.substring(body.indexOf("var accountInfo") + 18);
        accountInfo = accountInfo.substring(0, accountInfo.indexOf(";</script>"));

        var jsonStats = JSON.parse(last7);
        var jsonInfo = JSON.parse(accountInfo);

        var ret = {
            accountName: jsonInfo.Nickname,
            skinUrl: jsonInfo.EmblemUrl,
            score: jsonStats[0].value,
            kills: jsonStats[1].value,
            wins: jsonStats[2].value,
            matches: jsonStats[3].value,
            top_3_5_10: jsonStats[4].value,
            top_6_12_25: jsonStats[5].value,
            kd: jsonStats[6].displayValue,
            wr: jsonStats[7].value,
            minutesPlayed: jsonStats[8].value
        }

        callback(null, ret);
    });
}
