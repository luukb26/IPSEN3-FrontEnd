import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../auth/login.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  isAuthorised: string = 'afko'
  isLoggedIn: boolean = false;
  roleRoutes: { name: string; link: string; }[] = []
  adminRoutes = [
    {
      name: 'Overzicht',
      link: '/admin/overzicht'
    },
    {
      name: 'Gebruiker Toevoegen',
      link: '/admin/nieuw'
    },
    {
      name: 'Instellingen',
      link: '/admin/settings'
    }
  ]



  constructor(private route: Router, private activeRoute: ActivatedRoute, private auth: LoginService) {
  }


  ngOnInit(): void {
  }

  logout() {
    this.isLoggedIn = false;
    this.auth.logout();
  }

}
