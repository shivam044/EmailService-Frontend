import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  // @Input() ;
  @Input('editorContent') editorContentBody: String;

  ngOnInit() {
  }

  onClosedConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  onClosedCancel(){
    this.thisDialogRef.close('Cancel');
  }
}
