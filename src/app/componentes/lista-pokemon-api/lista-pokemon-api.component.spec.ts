import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPokemonComponent } from './lista-pokemon-api.component';

describe('ListaPokemonApiComponent', () => {
  let component: ListaPokemonComponent;
  let fixture: ComponentFixture<ListaPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
