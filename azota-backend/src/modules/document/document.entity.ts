import { Entity, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { IsNotEmpty } from 'class-validator';
import { DocumentFile } from '../documentFile/documentFile.entity';
import { Subject } from '../subject/subject.entity';
import { Grade } from '../grade/grade.entity';

@Entity()
export class Document extends BaseEntity {
  @Column()
  @IsNotEmpty()
  docTitle: string;

  @ManyToOne(() => Subject, (subject) => subject.documents)
  subject: Subject;

  @OneToMany(() => DocumentFile, (docFile) => docFile.document)
  docFiles: DocumentFile[];

  
}
