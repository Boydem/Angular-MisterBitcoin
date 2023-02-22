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
import { Move, User } from 'src/app/models/user.model';
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
  contactSubscription!: Subscription;
  userSubscription!: Subscription;
  user!: User | null;
  moves: Move[] = [];

  ngOnInit() {
    this.contactSubscription = this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
    this.userService.getLoggedInUser();
    this.userSubscription = this.userService.loggedInUser$.subscribe((user) => {
      this.user = user;
      this.moves =
        user?.transactions
          .filter((t) => t.toId === this.contact._id)
          .slice(0, 5) || [];
    });
  }

  onGoBack(): void {
    this.router.navigateByUrl('/contact');
  }

  ngOnDestroy(): void {
    this.contactSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
