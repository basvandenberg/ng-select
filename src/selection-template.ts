import { Directive, TemplateRef } from '@angular/core';

import { SelectComponent } from './select.component';

@Directive({
  selector: '[selectionTemplate]'
})
export class SelectionTemplate {
  public templateRef: TemplateRef<any>;

  public constructor(templateRef: TemplateRef<any>, select: SelectComponent) {
    select.selectionTemplate = templateRef;
  }
}