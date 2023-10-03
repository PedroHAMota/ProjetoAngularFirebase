import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLoading: boolean = false;
  funcionarios: any;
  codigo : any;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  abrirModalAtualizar(codigo: any) {
    this.isModalOpen = true;
    this.codigo = codigo;
  }

  constructor() {
    this.getFuncionarios()
  }

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/api2/funcionarios/listar.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response['funcionarios']
      console.log(response)
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(codigo:any){
    this.isLoading = true;
    fetch('http://localhost/api2/funcionarios/remover.php',
			{
			  method: 'DELETE',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: codigo })
			}
		)
    .then(response => response.json())
    .then(_response => {
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  atualizar(dados:any){
    this.isLoading = true;

    let funcionario = {
      Sobrenome : dados.Sobrenome,
      CodFun : this.codigo,
      Nome : dados.Nome,
      Cargo : dados.Cargo,
      DataNasc : dados.DataNasc,
      Endereco : dados.Endereco,
      Cidade : dados.Cidade,
      Cep : dados.Cep,
      Pais : dados.Pais,
      Fone : dados.Fone,
      Salario : dados.Salario
    }


    fetch('http://localhost/api2/funcionarios/atualizar.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(response => response.json())
    .then(_response => {
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

}
