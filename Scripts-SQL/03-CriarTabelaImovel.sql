USE [DbTeste]
GO

CREATE TABLE [dbo].[Imovel](
	[ImovelId] [int] IDENTITY(1,1) NOT NULL,
	[ClienteId] [int] NOT NULL,
	[Cidade] [varchar](25) NOT NULL,
	[Bairro] [varchar](25) NOT NULL,
	[Rua] [varchar](25) NOT NULL,
	[Numero] [int] NOT NULL,
	[Complemento] [varchar](150) NULL
)
