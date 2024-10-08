import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import { HideService } from '../../_service/hide/hide.service';
import {AppComponent} from "../../app.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchInput') searchInputElement!: ElementRef;
  @ViewChild('searchInput2') searchInput2Element!: ElementRef;


  isMenuOpen:boolean = false;
  isMenuSearchOpen:boolean = false;
  isMobile:boolean = false;


  constructor(public hideService: HideService,
              private router: Router,
              protected app: AppComponent) { }

  ngOnInit(): void {
    this.isMobileScreen();
    window.addEventListener('resize', () => {
      this.isMobileScreen();
    });

    if (this.hideService.isVisible) {
      console.log("je suis inactif");
      return;
    }
    console.log("je suis actif");
  }

  onSearch(searchTerm: string) {
    if (searchTerm) {
      this.searchInputElement.nativeElement.value = '';
      this.searchInput2Element.nativeElement.value = '';
      this.router.navigate(['/player/', searchTerm]);
      this.closeMenuSearch();
    }
  }

  logout() {
    this.app.loggout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuSearchOpen) {
      this.isMenuSearchOpen = false;
    }
  }
  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenuSearch() {
    this.isMenuSearchOpen = !this.isMenuSearchOpen;
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
  closeMenuSearch() {
    this.isMenuSearchOpen = false;
  }

  isMobileScreen() {
    this.isMobile = window.innerWidth < 1060;
  }

}
