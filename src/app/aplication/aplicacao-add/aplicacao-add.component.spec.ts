import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacaoAddComponent } from './aplicacao-add.component';

describe('AplicacaoAddComponent', () => {
  let component: AplicacaoAddComponent;
  let fixture: ComponentFixture<AplicacaoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacaoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacaoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
