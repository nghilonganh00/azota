import { Entity, Column, BeforeInsert, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Document } from '../document/document.entity';

@Entity()
export class DocumentFile extends BaseEntity {
  @Column()
  @IsNotEmpty()
  link: string;

  @Column()
  type: string;

  @ManyToOne(() => Document, (doc) => doc.docFiles)
  document: Document;
}
