import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}
  marketPriceData!: {
    description: string;
    name: string;
    values: { x: number; y: number }[];
  };
  user!: User | null;
  rate!: number;

  async ngOnInit() {
    this.userService.getLoggedInUser();
    this.userService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });

    try {
      this.rate = await this.bitcoinService.getRate();
      this.marketPriceData = await this.bitcoinService.getMarketPrice();
    } catch (err) {
      console.log('err:', err);
    }
  }
}
