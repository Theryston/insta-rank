import { PaidMail } from './../email/paid';
import { User } from "../database/User";
import { UserService } from './UserService';

export class PaymentService {
    constructor() { }

    async pay(datas: any) {
        try {
            const user = await User.findOne({ where: { email: datas.edz_cli_email } })
            if (user) {
                if (datas.edz_fat_status == '3') {
                    await User.update({ buy: true }, { where: { email: datas.edz_cli_email } })
                    await PaidMail.paid({ email: datas.edz_cli_email, name: datas.edz_cli_name })
                } else {
                    await User.update({ buy: false }, { where: { email: datas.edz_cli_email } })
                }
            } else {
                if (datas.edz_fat_status == '3') {
                    const userService = new UserService()
                    const password = this.password(8)
                    await userService.register({ name: datas.edz_cli_name, email: datas.edz_cli_email, password: password, buy: true })
                    await PaidMail.paid({ email: datas.edz_cli_email, name: datas.edz_cli_name, password: password })
                }
            }
            return "ok"
        } catch (error) {
            throw new error
        }
    }

    password(tamanho: number) {
        var stringAleatoria = '';
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
}