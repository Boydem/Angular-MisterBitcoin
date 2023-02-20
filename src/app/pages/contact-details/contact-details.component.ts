import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  contact: Contact | undefined;
  subscription!: Subscription;

  async ngOnInit() {
    this.subscription = this.route.params.subscribe(async (params) => {
      // Property 'id' comes from an index signature, so it must be accessed with ['id']
      // const id = params.id // Thats why TS wont allow this
      const contactId = params['id'];
      try {
        // Get the contact from the service with the id
        const contact = await lastValueFrom(
          this.contactService.getContactById(contactId)
        );
        this.contact = contact;
      } catch (err) {
        console.log('err:', err);
        this.router.navigateByUrl('/contact');
      }
    });
  }

  onGoBack(): void {
    this.router.navigateByUrl('/contact');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
