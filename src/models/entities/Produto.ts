import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Generated} from 'typeorm'

@Entity()
class Produto {

    @PrimaryColumn()
    id: string;
    @Column({ unique: true})
    serie: number;
    @Column({nullable: true})
    descricao: string;
    @Column()
    nome: string;
    @Column({nullable: true})
    imagem: string;
    @Column('decimal', { precision: 6, scale: 2 })
    preco: number


}

export default Produto