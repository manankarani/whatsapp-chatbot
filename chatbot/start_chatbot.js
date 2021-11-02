let users = require('./users.json');
const messages = require('./messages.json');
let current_message_json = {};
async function start(client) {
    try {
        client.onMessage(async (message) => {
            if (message.isGroupMsg === false) {
                const messageBody = message.body;
                const caller = messageBody.toLowerCase().split(" ");
                const phone = message.from;
                if (caller[0] == "hi" || caller[0] == "hello" || caller[0] == "hey") {
                    caller[0] = "hi";
                }
                if (users[phone] == undefined && caller[0] == "hi") {
                    users[phone] = {
                        phone: phone,
                        status: "new",
                        data_ctr: 1,
                        data: []
                    }
                    await client.sendText(phone, messages["hi"]);
                    await client.sendText(phone, messages["menu"].message);
                    current_message_json = messages["menu"];
                    users.status = "menu";
                }
                else {
                    if (users[phone].status != "data_entry") { current_message_json = current_message_json[caller[0]] ?? {}; }

                    if (current_message_json["entryData"] || users[phone].status == "data_entry") {
                        if (users[phone].status != "data_entry") {
                            users[phone].status = "data_entry";
                            if (current_message_json["message"]) {
                                await client.sendText(phone, current_message_json["message"]);
                            }
                        }
                        users[phone].status = "data_entry";
                        key_counter = users[phone].data_ctr;
                        keys = getKeys(current_message_json);
                        keys = removeKeys(keys, 'message', 'message-saved', 'entryData');
                        keys.push('message-saved')
                        keys.insert(0, "entry")
                        curr_key = keys[key_counter];
                        curr_json = current_message_json[curr_key]

                        //saving prev data
                        if (curr_json["saveData"]) {
                            var obj = {};
                            obj[keys[key_counter - 1]] = messageBody;
                            users[phone].data.push(obj)
                        }

                        await client.sendText(phone, curr_json.message); //send message

                        if (key_counter == keys.length - 1) {
                            /**
                             * TODO
                             * save data to database
                             */
                            //console.log(users[phone].data);
                            delete users[phone];
                            current_message_json = {};
                            return;
                        }
                        users[phone].data_ctr = users[phone].data_ctr + 1;
                        return;
                    }
                    if (count(current_message_json) > 0 && users[phone].status != "data_entry" && caller[0] != "hi") {
                        message = current_message_json?.message ?? "Incorrect Input";
                        if(message[0]=="!") {
                            await specialMsgs(message, client, phone);
                            return;
                        }
                        await client.sendText(phone, message);
                    }
                    else {
                        await client.sendText(phone, "Incorrect Input");
                    }
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function count(obj) { return Object.keys(obj).length; }
function getKeys(obj) { return Object.keys(obj); }

function removeKeys(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

async function specialMsgs(msg, client, phone) {
    command = msg.split(",");
    if (command[0] == "!sendVcard") {
        await client.sendText(
            phone,
            `For further queries contact the given number below.`
        );
        await client.sendContactVcard(
            phone,
            `91${command[1]}@c.us`,
            `${command[2]}`
        );

    }
    if (command[0] == "!sendLocation") {
        await client.sendText(
            phone,
            `For further queries contact the given number below.`
        );
        await client.sendLocation(
            phone,
            `${command[1]}`,
            `${command[2]}`,
            `${command[3]}`
        );
    }
    return msg;
}

module.exports = {
    start
};