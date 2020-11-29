import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atendimento } from '../atendimento';
import { AtendimentoService } from '../atendimento.service';


@Component({
  selector: 'app-atendimento-control',
  templateUrl: './atendimento-control.component.html',
  styleUrls: ['./atendimento-control.component.css']
})
export class AtendimentoControlComponent implements OnInit {
  atendimento = {} as Atendimento;
  atendimentos: Atendimento[];
  control=1

  constructor(private atendimentoService:AtendimentoService) { }

  ngOnInit(): void {
    this.getAtendimentos();
  }
  getAtendimentos() {
    this.atendimentoService.getAtendimentos().subscribe((atendimentos: Atendimento[]) => {
      this.atendimentos = atendimentos;
    });
  }
  editAtendimento(atendimento:Atendimento) {
    this.atendimento = { ...atendimento };
    this.control=3;
  }
  deleteAtendimento(atendimento: Atendimento) {
    let r=window.confirm("Deseja realmente excluir o atendimento?");
      if(r==false){
        return;
      }
    this.atendimentoService.deleteAtendimento(atendimento).subscribe(() => {
      this.getAtendimentos();
    });
  }
  saveAtendimento(form: NgForm) {
    if (this.atendimento.id !== undefined) {
      this.atendimentoService.updateAtendimento(this.atendimento).subscribe(() => {
        this.cleanForm(form);
        this.control=1;
      });
    } else {
      this.atendimentoService.saveAtendimento(this.atendimento).subscribe(() => {
        this.control=1;
        this.cleanForm(form);
      });
    }
  }
  inserir(){
    this.control=2;
  }
  cleanForm(form: NgForm) {  
    form.resetForm();
    this.atendimento = {} as Atendimento;      
  }
  retornar(form: NgForm){
    this.control=1;
    this.cleanForm(form);
  }
}
