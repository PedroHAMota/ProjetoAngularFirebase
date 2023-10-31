import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimacaoPage } from './animacao.page';

describe('AnimacaoPage', () => {
  let component: AnimacaoPage;
  let fixture: ComponentFixture<AnimacaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnimacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
