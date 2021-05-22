import { PaidMail } from './../email/paid';
import { User } from "../database/User";

export class PaymentService {
    constructor() { }

    async pay(datas: any) {
        try {
            if (datas.edz_fat_status == '3') {
                await User.update({ buy: true }, { where: { email: datas.edz_cli_email } })
                PaidMail.paid({email: datas.edz_cli_email, name: datas.edz_cli_name})
            } else {
                await User.update({ buy: false }, { where: { email: datas.edz_cli_email } })
            }
            return "ok"
        } catch (error) {
            throw new error
        }
    }
}