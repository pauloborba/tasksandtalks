
import { ChatThread } from '../../common/chatThread';
import { Chat } from '../../common/chat';

describe("O envio de mensagens", () => {
  var envio: ChatThread;

  function enviarMensagem(msg:Chat) {
    envio.addChat(msg);
  }

  function expectToSend() {
    expect(envio.getThreadChats().length).toBe(1);
    var chat = envio.getThreadChats()[0];
    return chat;
  }

  beforeEach(() => envio = new ChatThread())

  it("é inicialmente vazio", () => {
    expect(envio.getThreadChats().length).toBe(0);
  })

  it("envia mensagens corretamente", () => {
    var chat = new Chat();
    enviarMensagem(chat);

    var chatToSend = expectToSend();
    expect(chatToSend.sender).toBe("");
    expect(chatToSend.messageContent).toBe("");
    expect(chatToSend.sendDate).toBe(chat.sendDate);
  })
})