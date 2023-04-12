import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { DummyformComponent } from '../dummyform/dummyform.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  

  @ViewChild(DummyformComponent)
  productList!: { sessionId: any; };
  sessionId: any;
 
  ngAfterViewInit() {
    this.sessionId = this.productList.sessionId;
  }
}
