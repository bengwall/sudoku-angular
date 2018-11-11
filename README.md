# SudokuNgxs

## Project creation steps

```bash
ng new <project-name>
ng add @angular/material
```

then in `app.module.ts`, import the `NgxsModule`:

```TS
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
  ]
})
export class AppModule {}
```

```bash
ng generate component home
npm i @ngxs/store --save
npm i @ngxs/cli -g
ngxs --name state --directory src/app --folder state
```

then AppState to app.module.ts:
  
```TS
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      AppState
    ])
  ]
})
export class AppModule {}
```



