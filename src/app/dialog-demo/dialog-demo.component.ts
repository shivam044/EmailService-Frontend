import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService } from "../../services/http.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.css']
})
export class DialogDemoComponent implements OnInit {

  toEmail = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  fromEmail = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  message = new FormControl("", [
    Validators.required
  ]);

  editorForm: FormGroup;
  editorContent: String;

  // editorStyle = {
  //   height: '300px'
  // }

  constructor(public http: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.http.test);
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }

  title = 'email-service';
  dialogResult = "";

  openDialog(): void {
    this.editorContent = this.editorForm.get('editor').value;
    console.log(this.editorForm.get('editor').value);
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '800px',
      data: {
        toemail: this.toEmail.value,
        fromemail: this.fromEmail.value,
        editor: this.editorForm.get('editor').value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }
  // openDialog(){
  //  let dialogRef = this.Dialog.open(MyDialogComponent, {
  //    width: '600px',
  //    data: 'This text is passed into the dialog'
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log(`Dialog closed: ${result}`);
  //   this.dialogResult = result;
  //  });
  // }

  sendEmail() {

    let user = {
      toemail: this.toEmail.value,
      fromemail: this.fromEmail.value,
      editor: this.editorForm.get('editor').value
    }
    console.log(user.toemail, user.fromemail, user.editor);
    alert("Email has been sent successfully");
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }

}