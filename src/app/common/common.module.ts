import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContentTitleComponent } from './content-title/content-title.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MessageBannerComponent } from './message-banner/message-banner.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

@NgModule({
  declarations: [ContentTitleComponent, MessageBannerComponent, SpinnerComponent, TextEditorComponent, DropdownComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule
  ],
  exports: [
    ContentTitleComponent,
    MessageBannerComponent,
    SpinnerComponent,
    TextEditorComponent,
    DropdownComponent
  ]
})
export class AppCommonModule { }
