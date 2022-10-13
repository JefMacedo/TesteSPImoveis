USE [DbTeste]
GO

CREATE TABLE [dbo].[Cliente](
	[ClienteId] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](100) NOT NULL,
	[Email] [varchar](50) NULL,
	[Telefone] [varchar](13)NOT NULL,
	[Data] [date] NOT NULL,
	CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED(
		[clienteId] ASC
	)WITH (
		PAD_INDEX = OFF, 
		STATISTICS_NORECOMPUTE = OFF, 
		IGNORE_DUP_KEY = OFF, 
		ALLOW_ROW_LOCKS = ON, 
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY]
) ON [PRIMARY]
GO
