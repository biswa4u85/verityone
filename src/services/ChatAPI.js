import { database } from '@common/Firebase';

class ChatAPI {
    loggedInUser = null;
    chatUser = null;
    userId = '';
    messagesRef = null;
    usersRef = null;

    setloggedInUser(value) {
        this.loggedInUser = value;
    }

    getloggedInUser() {
        return this.loggedInUser;
    }

    setChatUser(value) {
        this.chatUser = value;
    }

    getChatUser() {
        return this.chatUser;
    }

    // Load users
    loadUsers(callback) {
        this.usersRef = database.ref('users');
        this.usersRef.off();
        const onReceive = (data) => {
            const user = data.val();
            callback(user)
        };
        this.usersRef.limitToLast(20).on('child_added', onReceive);
    }

    // retrieve the messages from the Backend
    loadMessages(callback) {
        this.messagesRef = database.ref('chat/new');
        database.ref('chat')
            .once('value', snapshot => {
                this.messagesRef = database.ref('chat/new');
                this.messagesRef.off();
                const onReceive = (data) => {
                    const message = data.val();
                    if (message.receiverId === this.getChatUser().uid || message.senderId === this.getChatUser().uid) {
                        callback({
                            _id: data.key,
                            text: message.message,
                            receiver: message.sender,
                            createdAt: new Date(Number(message.timestamp)),
                            receiverId: message.senderId,
                            sender: message.receiver,
                            senderId: message.receiverId,
                            user: {
                                _id: message.receiverId,
                                name: message.receiver,
                                avatar: message.senderImage
                            }
                        });
                    } else {
                        callback({})
                    }
                };
                this.messagesRef.limitToLast(20).on('child_added', onReceive);

            });


    }

    // send the message to the Backend
    sendMessage(message) {
        let msg = []
        for (let i = 0; i < message.length; i++) {
            currentTimestamp = (new Date).getTime().toString();
            this.messagesRef.child(currentTimestamp).set(
                {
                    'isRead': "0",
                    'message': message[i].text,
                    'timestamp': currentTimestamp,
                    'receiver': this.getChatUser().name,
                    'receiverId': this.getChatUser().uid,
                    'sender': this.getloggedInUser().name,
                    'senderId': this.getloggedInUser().uid,
                });
        }
    }

    // close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }

}

export default new ChatAPI();