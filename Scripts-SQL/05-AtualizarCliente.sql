USE [DbTeste]
GO

UPDATE [dbo].[Cliente]
   SET [Nome] = 'Jeferson Macedo'
	  ,[Email] = 'jeferson@gmail.com'
	  ,[Telefone] = '65992833530'
 WHERE [ClienteId] = 1
GO
