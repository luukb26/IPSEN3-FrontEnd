import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrganisationService} from "./organisation.service";
import {OrganisationModel} from "../abbreviation-list/organisation.model";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Output() onSelectEvent = new EventEmitter();

  public organisations : OrganisationModel[];
  public static readonly NO_ORGANISATION_SELECTED_ID = "NO_ID";
  public static readonly NO_ORGANISATION_SELECTED_NAME = "selecteer een organisatie";

  constructor(private form: FormBuilder, private http : OrganisationService) {
    this.organisations = [];

    this.http.getAllOrganisations((orgs : OrganisationModel[]) => {
      this.fillOrganisationsArray(orgs);
    });
  }

  ngOnInit(): void {}

  submit(event : any) {
    let org = this.getOrganisationFromName(event.target.value);
    if (org.id !== DropdownComponent.NO_ORGANISATION_SELECTED_ID) {
      this.onSelectEvent.emit(org);
    }
  }

  // returns -1 if no id is found
  public getOrganisationFromName(name : string) : OrganisationModel{
    for (let i = 0; i < this.organisations.length; i++) {
      if (this.organisations[i].name === name) {
        return this.organisations[i];
      }
    }
    let org = new OrganisationModel();
    org.id = DropdownComponent.NO_ORGANISATION_SELECTED_ID;
    return org;
  }

  private fillOrganisationsArray(orgs : OrganisationModel[]) : void {
    // create default organisation
    let defaultOrg = new OrganisationModel();
    defaultOrg.id = DropdownComponent.NO_ORGANISATION_SELECTED_ID;
    defaultOrg.name = DropdownComponent.NO_ORGANISATION_SELECTED_NAME;
    this.organisations.push(defaultOrg);

    orgs.forEach((org) => {
      this.organisations.push(org);
    });
  }
}
