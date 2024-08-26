import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

toolbarColor: string="app-primary";
title: string="ProTeam";

  constructor() { }

  ngOnInit() {}

}
