<div align='center'>
 
![Magazord](image/logo-magazord.png)
 
 </div>

# Teste para vaga de front-end no Magazord.com.br
Este repositório tem como fim testar os candidatos para vaga de front-end developer na empresa [Magazord](https://magazord.com.br).

## Requisitos necessários
1. Ter NodeJS
2. Ter yarn instalado

## Instruções de instalação do projeto
1. Fazer o clone deste repositório
2. Vá até onde salvou o projeto e abra-o no seu editor preferido
3. Pelo terminal, ou do editor ou do próprio computador, navegue até a pasta do projeto e dê o comando **yarn** para a instalação do pacote node_modules
4. Feito isso, para rodar o projeto, no terminal basta digitar **yarn dev**, e no navegador digitar o endereço localhost:8080


# TruckerBenefits

API criada para servir de apoio aos novos benefícios que estão sendo/serão introduzidos ao motorista da FB.


[![pipeline status](https://gitlab.fretebras.com.br/beneficios-motorista/trucker-benefits/badges/main/pipeline.svg)](https://gitlab.fretebras.com.br/beneficios-motorista/trucker-benefits/-/pipelines)
[![coverage report](https://gitlab.fretebras.com.br/beneficios-motorista/trucker-benefits/badges/main/coverage.svg)](https://gitlab.fretebras.com.br/beneficios-motorista/trucker-benefits/-/commits/main)


Tabela de conteúdos
=================

- [TruckerBenefits](#truckerbenefits)
- [Tabela de conteúdos](#tabela-de-conteúdos)
- [Requisitos](#requisitos)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Comandos make](#comandos-make)
- [Diagrama Arquitetura](#diagrama-arquitetura)

Requisitos
============

Para rodar esse projeto é necessário ter o `docker`, `docker-compose` ≥ `2.6.0` e o `make` instalados na máquina.

Caso tenha algum erro verifique se os dois estão na última versão disponível, caso não estejam, por favor atualize-os.

Tecnologias
============

Utilizamos o `PHP` ≥ `8.1`, em conjunto com o `Laravel` ≥ `9.25.1`.

Como banco de dados usamos o `MySql`.

Variáveis de ambiente em [Envault](https://envault.fretebras.dev.br/apps/29)

Instalação
============

Para instalar o projeto e as suas dependências, basta utilizar o seguinte comando make:


make install


Como usar
============

Utilize o postman compartilhado da FreteBras usando a collection [Trucker Benefits](https://fretebras-tech.postman.co/workspace/Fretebras~d419e8b4-6c02-48d7-83eb-10c649c81b1a/collection/19852727-f4023013-4f73-4dce-9293-6a273b2beab4?action=share&creator=19852727)

Comandos make
============

O arquivo `Makefile`, contido na raiz do projeto, possui os comandos mais frequentes para poder interagir com os containers Docker. Abaixo está uma descrição dos principais deles:

| Comando                       | Descrição                                                                                               |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `make install`                | Executa as instruções necessárias para setup completo do projeto.                                       |
| `make test`                   | Executa todos os testes da aplicação.                                                                   |
| `make test-coverage`          | Executa todos os testes da aplicação e gera code coverage report                                        |
| `make up`                     | Executa instrução `up` dos containers necessários.                                                      |
| `make down`                   | Executa instrução `down` de todo os containers.                                                         |
| `make bash`                   | Abre uma sessão bash com o container da aplicação.                                                      |
| `make clear`                  | Reseta todos os dados cacheados pela aplicação.                                                         |
| `make format`                 | Aplica formatação nos arquivos de acordo com as regras definidas em `.php-cs-fixer.cache`               |
| `make install-hooks`          | Adiciona hooks git repositório local                                                                    |


Diagrama Arquitetura
============

[Arquitetura no Miro](https://miro.com/app/board/uXjVOgMS_R4=/)