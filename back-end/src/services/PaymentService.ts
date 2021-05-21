import { User } from "../database/User";

export class PaymentService {
    constructor() { }

    async pay(datas: any) {
        try {
            if (datas.edz_fat_status == '3') {
                await User.update({ buy: true }, { where: { email: datas.edz_cli_email } })
            } else {
                await User.update({ buy: false }, { where: { email: datas.edz_cli_email } })
            }
            return "ok"
        } catch (error) {
            throw new error
        }
    }
}