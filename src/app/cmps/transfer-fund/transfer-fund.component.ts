import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent {
  constructor(private userService: UserService) {}
  amountToTransact!: number;
  @Input() contact!: Contact;
  @Input() maxValue!: number;
  transferMoney() {
    if (this.amountToTransact < this.maxValue) return;
    this.userService.addMove(this.contact, this.amountToTransact);
  }
}
