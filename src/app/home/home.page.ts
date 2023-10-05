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

  parametro : any

  isModalOpen = false;
  
  isModalOpening = false;

  setOpening(isOpen: boolean) {
    this.isModalOpening = isOpen;
  }

  modalInserir(codigo: any) {
    this.isModalOpening = true;
    this.codigo = codigo;
  }


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

  // atualizar(dados:any){
  //   this.isLoading = true;
  //   this.funcionario.Sobrenome = dados.Sobrenome
  //   this.funcionario.CodFun = this.codigo
  //   this.funcionario.Nome = dados.Nome
  //   this.funcionario.Cargo = dados.Cargo
  //   this.funcionario.DataNasc = dados.DataNasc
  //   this.funcionario.Endereco = dados.Endereco
  //   this.funcionario.Cidade = dados.Cidade
  //   this.funcionario.Cep = dados.Cep
  //   this.funcionario.Pais = dados.Pais
  //   this.funcionario.Fone = dados.Fone
  //   this.funcionario.Salario = dados.Salario

  //   console.log(this.funcionario)

  //   fetch('http://localhost/api2/funcionarios/atualizar.php',
	// 		{
	// 		  method: 'POST',
	// 		  headers: {
	// 		    'Content-Type': 'application/json',
	// 		  },
	// 		  body: JSON.stringify(this.funcionario)
	// 		}
	// 	)
  //   .then(response => response.json())
  //   .then(_response => {
  //     this.getFuncionarios();
  //   })
  //   .catch(erro => {
  //     console.log(erro);
  //   })
  //   .finally(()=>{
  //     this.isLoading = false;
  //   })
  // }

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

  inserir(dados:any){
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


    fetch('http://localhost/api2/funcionarios/inserir.php',
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

  
  setParametro(dados: any){
    console.log(dados.detail.value)
  
  }

    consultar(dados: any){
      let url = '';
      if(this.parametro == 'Nome'){
        url = ('http://localhost/api2/funcionarios/consultar_por_nome.php');
      }
    // this.isLoading = true;
    // fetch('http://localhost/api2/funcionarios/consultar_por_nome.php')
    // .then(response => response.json())
    // .then(response => {
    //   this.funcionarios = response['funcionarios']
    //   console.log(response)
    // })
    // .catch(erro => {
    //   console.log(erro);
    // })
    // .finally(()=>{
    //   this.isLoading = false;
    // })

  }
}

