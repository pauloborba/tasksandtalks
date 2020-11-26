import { Email } from '../../common/Email';
import { EmailSenderService } from '../EmailSenderService'

describe('O serviço de Email', () => {
  var emailSender: EmailSenderService = new EmailSenderService();

  it('envia emails corretamente', async () => {
    const sender = 'jbmn2@cin.ufpe.br';
    const recipient = 'jbmn2@cin.ufpe.br';
    const subject = 'Testando...';
    const content = 'O corpo de mensagem';

    const email = new Email(sender, recipient, subject, content);
    const sendEmail = await emailSender.execute(email);
    expect(sendEmail).not.toBeNull();
  });

  it('não envia emails incompletos', async () => {
    const sender = 'jbmn2@cin.ufpe.br';
    const recipient = '';
    const subject = 'Testando...';
    const content = 'O corpo de mensagem';

    let senderError = '';
    const email = new Email(sender, recipient, subject, content);
    try {
      const sendEmail = await emailSender.execute(email);
    }
    catch (error) {
      senderError = error;
    }
    expect(senderError).not.toBeNull();

  });
})
