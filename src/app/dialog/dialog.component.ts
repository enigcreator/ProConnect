import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  td:Text;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  onClose(): void {
    this.data.success = false;
    this.dialogRef.close({result: this.data});
    
  }
  onDone():void {
    if(this.data.data!=undefined)
    this.data.success = true;
    this.dialogRef.close({result: this.data});
    
  }
}
