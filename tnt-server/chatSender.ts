import { Chat } from '../common/chat';
import { ChatThread } from '../common/chatThread';

export class ChatSender{
    chatThreads: ChatThread[] = [];

    constructor(){

    }

    createChatThread(threadName: string, firstMessage: Chat): ChatThread{
        return null;
    }

    sendChat(chatMessage: Chat, thread: ChatThread): void{

    }

    getChatThreads(): ChatThread[]{
        return null;
    }
}