import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacaoDeleteComponent } from './aplicacao-delete.component';

describe('AplicacaoDeleteComponent', () => {
  let component: AplicacaoDeleteComponent;
  let fixture: ComponentFixture<AplicacaoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacaoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacaoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
