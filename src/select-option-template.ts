import { Directive, TemplateRef } from '@angular/core';

import { SelectComponent } from './select.component';

@Directive({
  selector: '[selectOptionTemplate]'
})
export class SelectOptionTemplate {
  public templateRef: TemplateRef<any>;

  public constructor(templateRef: TemplateRef<any>, select: SelectComponent) {
    select.selectOptionTemplate = templateRef;
  }
}