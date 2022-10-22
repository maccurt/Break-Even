import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';

import { MatTooltipDefaultOptions, MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS,  } from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const toolTipDefault: MatTooltipDefaultOptions = {
  showDelay: 750,
  hideDelay: 500,
  touchendHideDelay: 100
};

@NgModule({
  declarations: [],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: toolTipDefault }
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule
  ]

})
export class MaterialModule { }
