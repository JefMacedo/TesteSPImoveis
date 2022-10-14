USE [DbTeste]
GO

SELECT [Cliente].[ClienteId] 
	  ,[Nome]
      ,[Email]
      ,[Telefone]
      ,[Data]
	  ,[ImovelId]
      ,[Cidade]
      ,[Bairro]
      ,[Rua]
      ,[Numero]
	  ,[Complemento]
	  FROM [Cliente], [Imovel]
	  WHERE [Cliente].[ClienteId] = [Imovel].[ClienteId] --AND [Cliente].[ClienteId] = 1