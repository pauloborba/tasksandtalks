import 'dotenv/config'
import Mail from './util/Mail'
import { Email } from '../common/Email'

export class EmailSenderService {
    public async execute(email: Email) {
        const { sender, recipient, subject, content } = email;
        if (sender && recipient && subject && content) {
            const sendEmail = await Mail.sendMail({
                from: `<${email.sender}>`,
                to: `${email.recipient}`,
                subject: `${email.subject}`,
                text: `${email.content}`,
            })
            return sendEmail
        }
        else {
            throw new Error("Dados incompletos para o envio de email");
        }
    }
}