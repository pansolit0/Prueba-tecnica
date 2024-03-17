import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPokemonApiComponent } from './lista-pokemon-api.component';

describe('ListaPokemonApiComponent', () => {
  let component: ListaPokemonApiComponent;
  let fixture: ComponentFixture<ListaPokemonApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPokemonApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPokemonApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
