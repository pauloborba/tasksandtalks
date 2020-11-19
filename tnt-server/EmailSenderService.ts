import 'dotenv/config'
import Mail from './util/Mail'
import { Email } from '../common/Email'

export class EmailSenderService {
    public async execute(email: Email) {
        const sendEmail = await Mail.sendMail({
            from: `<${email.sender}>`,
            to: `${email.recipient}`,
            subject: `${email.subject}`,
            text: `${email.content}`,
        })
        return sendEmail
    }
}