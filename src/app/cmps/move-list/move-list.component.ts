import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
})
export class MoveListComponent implements OnInit {
  constructor(private userService: UserService) {}
  @Input() user!: User | null;
  ngOnInit(): void {}
}
