import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UsersEntity{
   @PrimaryGeneratedColumn() 
   id?:number ;

   @Column({type:'varchar',length:100,nullable:false})
   name:string;

   @Column({type:"varchar",length:100,nullable:false,unique:true})
  email:string;
  
  @Column({type:"varchar",nullable:false})
  password:string;
   
  @Column({type:'varchar',nullable:true})
   mobile:string;

}