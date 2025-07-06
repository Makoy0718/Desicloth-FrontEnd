import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetallePedidoComponent } from './dialog-detalle-pedido.component';

describe('DialogDetallePedidoComponent', () => {
  let component: DialogDetallePedidoComponent;
  let fixture: ComponentFixture<DialogDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDetallePedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
