import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  contact!: Contact;
  subscription!: Subscription;
  user!: User | null;

  async ngOnInit() {
    this.subscription = this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
    try {
      await this.userService.getLoggedInUser();
      this.subscription = this.userService.loggedInUser$.subscribe((user) => {
        this.user = user;
      });
    } catch (err) {
      console.log('err:', err);
    }
  }

  onGoBack(): void {
    this.router.navigateByUrl('/contact');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
