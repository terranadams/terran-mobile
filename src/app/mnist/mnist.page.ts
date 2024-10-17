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

// MNIST database: Modified National Institute of Standards and Technology database)

/*
  When the Angular component is initialized and the ngOnInit lifecycle hook is triggered, we use Tensorflow.js to load a pre-trained machine learning model at /assets/trained_model/model.json
  This file contains the necessary data to recreate the model's architecture and weights. Once loaded, the model is ready for use.
  At this point, the application is set up to accept handwritten user input, and use the loaded model to make predictions about what those digits represent.
*/

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

  // Using Tensorflow to bring in the pre-trained machine learning model
  public async ngOnInit(): Promise<void> {
    this.model = await tf.loadLayersModel('/assets/trained_model/model.json');
    console.log(this.model.summary());
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

  /// Clears the canvas and the information on the screen.
  public clear(): void {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.predicted = '';
  }

  /// Captures events from the canvas.
  /// Based on the type of the event (mousedown, mouseup, etc.) performs certain actions.
  /// In charge of drawing images on canvas and runing the model predictions once digit is drawn.
  private captureEvents(canvasHtmlElement: HTMLCanvasElement) {
    // Draw image.
    fromEvent(canvasHtmlElement, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasHtmlElement, 'mousemove').pipe(
            takeUntil(fromEvent(canvasHtmlElement, 'mouseup')),
            takeUntil(fromEvent(canvasHtmlElement, 'mouseleave')),
            pairwise()
          );
        })
      )
      .subscribe((res: any) => {
        const clientRect = canvasHtmlElement.getBoundingClientRect();
        const previousPosition = {
          x: res[0].clientX - clientRect.left,
          y: res[0].clientY - clientRect.top,
        };
        const currentPosition = {
          x: res[1].clientX - clientRect.left,
          y: res[1].clientY - clientRect.top,
        };
        this.drawOnCanvas(previousPosition, currentPosition);
        // Drawing is finished, run the predictions
        fromEvent(canvasHtmlElement, 'mouseup').subscribe(async () => {
          const pred = await tf.tidy(() => {
            // Convert the canvas pixels
            let image = this.getImage(canvasHtmlElement);

            // Make and format the predications
            const output = this.model.predict(image) as any;
            let predictions = Array.from(output.dataSync());
            console.log(predictions);

            // Write out the prediction.
            for (let i = 0; i < predictions.length; i++) {
              if (predictions[i] == '1') {
                this.predicted = i.toString();
              }
            }
            if (this.predicted == '') {
              this.predicted = 'Not sure :(';
            }
          });
        });
      });
  }

  /// Handles drawing on the canvas.
  private drawOnCanvas(
    previousPosition: { x: number; y: number },
    currentPosition: { x: number; y: number }
  ) {
    if (!this.context) {
      return;
    }
    this.context.beginPath();
    if (previousPosition) {
      this.context.moveTo(previousPosition.x, previousPosition.y);
      this.context.lineTo(currentPosition.x, currentPosition.y);
      this.context.stroke();
    }
  }

  private getImage(canvasHtmlElement: any) {
    this.context.drawImage(canvasHtmlElement, 0, 0, 28, 28);
    let imageData = this.context.getImageData(0, 0, 28, 28);
    let img = tf.browser.fromPixels(imageData, 1);
    let imgtmp = img.reshape([1, 28, 28, 1]);
    imgtmp = tf.cast(imgtmp, 'float32');
    return imgtmp;
  }

  onTouchStart(event: TouchEvent) {
    this.context.beginPath();
    const rect = (
      this.canvas.nativeElement as HTMLCanvasElement
    ).getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    this.context.moveTo(x, y);
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    const rect = (
      this.canvas.nativeElement as HTMLCanvasElement
    ).getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    this.context.lineTo(x, y);
    this.context.stroke();
    setTimeout(() => {
      this.predict();
    }, 2000);
  }

  private async predict() {
    const pred = await tf.tidy(() => {
      // Convert the canvas pixels
      let image = this.getImage(this.canvas.nativeElement);

      // Make and format the predictions
      const output = this.model.predict(image) as any;
      let predictions = Array.from(output.dataSync());
      console.log(predictions);

      // Write out the prediction
      for (let i = 0; i < predictions.length; i++) {
        if (predictions[i] == '1') {
          this.predicted = i.toString();
        }
      }
      if (this.predicted == '') {
        this.predicted = 'Not sure :(';
      }
    });
  }
}
