# WhatsAppChatbot
This is a nodejs application, which starts a chatbot and can be modified by changing the JSON file. 
This application uses 🕷[Venom Bot](https://github.com/orkestral/venom)🕸

One can simply edit the `messages.json` to change the structure of the Chatbot 

## Messages Json Example
Please remove comments before using.
```json
{
    "hi": "Welcome to Manan's Chatbot",      //required
    "menu": {                                //required
        "message": "1) msg1\n2)msg2\n3)msg3",//can have more messages
        "1": {
            "message": "!sendVcard,0000000000,Manan Karani"
                                             //can send contactCards 
                                             //and location with "!sendLocation"
        },
        "2": {
            "message": "msg_main2",
            "1":{"message":"msg1"},
            "2":{"message":"msg2"}           //can have more depth
        },
        "3": {
            "entryData": true,               //use entryData: true to handle data inputs
            "message": "Enter Your Details",
            "name": {
                "message": "Enter Name",
                "saveData":true              //this will save previous data i.e. "3"
            },
            "email": {
                "message": "Enter Email",
                "saveData":true              //this will save previous data i.e. "name"
            },
            "message-saved": {               //after end send this
                "message": "Thanks",
                "saveData":true              //this will save previous data i.e. "email"
            }
        }
    }
}
```


## Usage
Install the dependencies
```bash
npm install
```
Use the start script
```bash
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
