import { Database, Repository } from 'db-mycro';
const DBdivices = new Database('compatibility', __dirname + '/../database')
const divices = new Repository({
    name: 'divices',
    db: DBdivices,
    columns: [
        { name: 'id', type: 'number', isPrimary: true, allowNull: false, autoIncrement: true },
        { name: 'isCompatible', type: 'number', isPrimary: false, allowNull: false, autoIncrement: false }
    ]
})

export class DevicesService {
    constructor() { }

    async status(status: number) {
        divices.add([{ isCompatible: status }])
        await divices.save()
        return 'ok'
    }

    async compatible() {
        return (divices.find({ where: "data.isCompatible == 1"})).length
    }

    async incompatible() {
        return (divices.find({ where: "data.isCompatible == 2"})).length
    }
}