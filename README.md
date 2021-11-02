# WhatsAppChatbot
This is a nodejs application, which starts a chatbot and can be modified by changing the JSON file. 
This application uses 🕷[Venom Bot](https://github.com/orkestral/venom)🕸

One can simply edit the `messages.json` to change the structure of the Chatbot 

## Messages Json Example
Edit `messages.json` with the format below.
* Hi - [x] Necessary
* Menu - [x] Necessary
     * 1 - Can have a nested object with `message` key
     * 2 - Can have a nested object with `message` key
```json
{
    "hi": "Welcome to Manan's Chatbot",      
    "menu": {                                
        "message": "1) msg1\n2)msg2\n3)msg3",
        "1": {
            "message": "!sendVcard,0000000000,NAME"
        },
        "2": {
            "message": "msg_main2",
            "1":{"message":"msg1"},
            "2":{"message":"msg2"}           
        },
        "3": {
            "entryData": true,               
            "message": "Enter Your Details",
            "name": {
                "message": "Enter Name",
                "saveData":true              
            },
            "email": {
                "message": "Enter Email",
                "saveData":true              
            },
            "message-saved": {               
                "message": "Thanks",
                "saveData":true              
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
