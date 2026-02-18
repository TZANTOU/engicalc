import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Measurement } from '../../models/measurement.model';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
})
export class Calculator {
  rows = signal<Measurement[]>([]);
  private nextId = 1;

  grandTotal = computed(()=>{
    return this.rows().reduce((sum,row) => {
      return sum + (row.length*row.width*row.pricePerM2);
    },0);
  });

  totalArea = computed(()=>{
    return this.rows().reduce((sum,row) =>{
      return sum + (row.length*row.width);
    },0);
  });

  //Actions
  addRow(): void {
    this.rows.update(currentRows => [...currentRows,{
      id: this.nextId++,
      description: '',
      length: 0,
      width: 0,
      pricePerM2: 0
    }
    ]);
  }
  removeRow(id:number): void {
    this.rows.update(currentRows => currentRows.filter(row => row.id !== id));
  }
  updateRow(id:number,field: keyof Measurement, value:string|number): void {
    this.rows.update(currentRows=> currentRows.map(row => {
      if(row.id===id){
        return {...row,[field]:value};
      }
      return row;
    })
    );
  }
  getArea(row: Measurement):number{
    return row.length * row.width;
  }
  getRowTotal(row: Measurement):number{
    return this.getArea(row) * row.pricePerM2;
  }
  projectName = '';
  projectDate=  new Date().toISOString().split('T')[0];
  exportPDF(): void {
    const win = window.open('','_blank');
    if(!win) return;

    let html = `<html><head>
      <meta charset="UTF-8">
      <title>${this.projectName || 'Antoulinakis Constructions'}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #222; }
        h1 { font-size: 22px; margin-bottom: 4px; }
        .meta { font-size: 13px; color: #666; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { background: #f4f4f4; text-align: left; padding: 8px 10px; border-bottom: 2px solid #ccc;
             font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 8px 10px; border-bottom: 1px solid #eee; }
        .num { text-align: right; font-family: 'Courier New', monospace; }
        .total-row td { border-top: 2px solid #333; font-weight: bold; font-size: 15px; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      <h1>${this.projectName || 'Χωρίς Τίτλο'}</h1>
      <div class="meta">Ημερομηνία: ${this.projectDate || '\u2014'}</div>
      <table>
        <tr>
          <th>#</th><th>Περιγραφή</th>
          <th class="num">Μήκος (m)</th><th class="num">Πλάτος (m)</th>
          <th class="num">Εμβαδόν (m\u00B2)</th><th class="num">\u20AC/m\u00B2</th>
          <th class="num">Σύνολο (\u20AC)</th>
        </tr>`;

    this.rows().forEach((row, i) => {
      html += `<tr>
        <td>${i + 1}</td><td>${row.description || '\u2014'}</td>
        <td class="num">${row.length.toFixed(2)}</td><td class="num">${row.width.toFixed(2)}</td>
        <td class="num">${this.getArea(row).toFixed(2)}</td>
        <td class="num">${row.pricePerM2.toFixed(2)}</td>
        <td class="num">\u20AC${this.getRowTotal(row).toFixed(2)}</td>
      </tr>`;
    });

    html += `<tr class="total-row">
        <td colspan="4"></td>
        <td class="num">${this.totalArea().toFixed(2)} m\u00B2</td>
        <td></td>
        <td class="num">\u20AC${this.grandTotal().toFixed(2)}</td>
      </tr></table></body></html>`;

    win.document.write(html);
    win.document.close();
    win.print();
  }


}
