import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';








@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt','actions'];
  dataSource :User[]=[];
  isLoading = false;
  constructor(private matDialog:MatDialog, private UsersService:UsersService, private router:Router, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.loadUsers()
    
  }
  loadUsers():void{
    this.isLoading = true;
    this.UsersService.getUsers().subscribe({
      next:(users)=>{
        this.dataSource=users;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      },
    })
  }

  onDelete(id: string) {
    if (confirm('¿Está seguro?')) {
      this.isLoading = true;
      this.UsersService.removeUserById(id).subscribe({
        next: (users) => {
          this.dataSource = users;
        },
        error: (error) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
  goToDetail(id:string):void{
    this.router.navigate([id,'detail'],{relativeTo: this.activatedRoute})
  }
  openModal(editingUser?:User):void{
    this.matDialog.open(UsersDialogComponent,{
      data:{
        editingUser,
      },
    }).afterClosed().subscribe({
      next:(result)=>{
        console.log('recibimos:',result);
        if(!!result){
          if (editingUser){
            this.handleUpdate(editingUser.id,result);
          }else{
          this.dataSource = [...this.dataSource,result,]
          }
        }
      },
    });
  }
  handleUpdate(id: string, update: User): void {
    this.isLoading =true;
    this.UsersService.updateUserById(id, update).subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  
  }
  }

