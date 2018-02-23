import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;
  now = new Date();
  constructor() { }

  ngOnInit() {
    this.year = this.now.getFullYear();
  }

}
