import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-mnist',
  templateUrl: './mnist.page.html',
  styleUrls: ['./mnist.page.scss'],
})
export class MnistPage implements OnInit {

  @Input() public width = 400;
  @Input() public height = 400;
  @ViewChild('canvas', {static: true}) public canvas!: ElementRef;

  model!: any
  context!: CanvasRenderingContext2D;
  title = ''
  predicted = '';

  constructor() { }

   /// During initialization training of the model on the backend is initialized.
  /// After that is done model is loaded from the predefined location.

  public async ngOnInit(): Promise<void> {
    
  }

}
