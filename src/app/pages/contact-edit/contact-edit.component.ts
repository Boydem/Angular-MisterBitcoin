import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  contact!: Contact;
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      async ({ id: contactId }) => {
        this.contact = contactId
          ? await lastValueFrom(this.contactService.getContactById(contactId))
          : (this.contact = new Contact());
      }
    );
  }

  async onAddContact() {
    try {
      await lastValueFrom(this.contactService.saveContact(this.contact));
      this.router.navigateByUrl('/contact');
    } catch (err) {
      console.log('err:', err);
      this.router.navigateByUrl('/contact');
    }
  }

  onCancel() {
    this.router.navigateByUrl('/contact');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
