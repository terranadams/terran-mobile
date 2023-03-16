import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
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
  @ViewChild('canvas', { static: true }) public canvas!: ElementRef;

  model!: any;
  // context!: CanvasRenderingContext2D;
  context!: any;
  title = '';
  predicted = '';

  constructor() {}

  /// During initialization training of the model on the backend is initialized.
  /// After that is done model is loaded from the predefined location.

  public async ngOnInit(): Promise<void> {
    this.title = 'Started model training, please wait...';

    this.model = await tf.loadLayersModel('/assets/trained_model/model.json');
    console.log(this.model.summary());

    this.title = 'Model Trained! Write down digits!';
  }

  /// Used to configure canvas properties.
  public ngAfterViewInit() {
    const canvasHtmlElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasHtmlElement.getContext('2d');

    canvasHtmlElement.width = this.width;
    canvasHtmlElement.height = this.height;

    this.context.lineWidth = 11;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#111111';

    this.captureEvents(canvasHtmlElement);
  }

   /// Captures events from the canvas.
  /// Based on the type of the event (mousedown, mouseup, etc.) performs certain actions.
  /// In charge of drawing images on canvas and runing the model predictions once digit is drawn.
  private captureEvents(canvasHtmlElement: HTMLCanvasElement) {
    
  }
}
