create database CrocBox;
use CrocBox;

create table perfil(
id int auto_increment primary key,
nome varchar(100) not null,
email varchar(100) not null unique,
senha varchar(200) not null check (LENGTH(senha) >= 8),
contato varchar(20) not null,
endereco varchar(100)
);

create table produtos(
id_Produto int auto_increment primary key,
nome_Produto varchar(100) not null,
descricao_Produto varchar(300),
preco_Produto DECIMAL(10, 2) not null
);

create table carrinho(
id_Carrinho int auto_increment primary key,
usuario_id int not null,
produto_id int not null,
quantidade int not null default 1,
foreign key (usuario_id) references perfil(id) on delete cascade,
foreign key (produto_id) references produtos(id) on delete cascade
);

create table pedidos(
id int auto_increment primary key,
usuario_id int not null,
valor_Total decimal(10,2) not null,
status_Pedido varchar(30) default 'Pendente',
data_Pedido timestamp default current_timestamp,
foreign key (usuario_id) references perfil(id) on delete cascade
);

create table pedidos_Comprados(
id int auto_increment primary key,
pedido_id int not null,
produto_id int not null,
quantidade int not null,
preco_unidade decimal(10,2) not null,
foreign key (pedido_id) references pedidos(id) on delete cascade,
foreign key (produto_id) references produtos(id) on delete cascade
);

create table fornecedores(
id_Fornecedor int auto_increment primary key,
nome_Fornecedor varchar(100) not null,
contato varchar(50) not null,
endereco varchar(150)
);

create table entregadores(
id_Entregador int auto_increment primary key,
nome_Entregador varchar(100) not null,
veiculo varchar(50) not null,
placa_Veiculo varchar(10) unique
);
 
INSERT INTO produtos (nome_Produto, descricao_Produto, preco_Produto) VALUES
('Solo Box', 'Tiras de frango crocantes, batata rústica e 1 molho', 24.90),
('Duo Box', 'Coxas e sobrecoxas empanadas, batata rústica e 2 molhos', 44.90),
('Mega Box', 'Frango picotado, batata e 4 molhos', 79.90),
('Burguer Box', 'Burger de frango crocante, queijo, tomate, batata e refrigerante gelado', 32.90),
('Batata Crinckle', 'Porção extra de batatas', 12.00),
('Refrigerante', 'Lata 350ml', 6.00),
('Molho Extra', 'Porção de molho da casa', 3.00);

INSERT INTO perfil (nome, email, senha, contato) VALUES
('Admin CrocBox', 'admin@crocbox.com.br', 'senha1234', '31999999999');

INSERT INTO fornecedores (nome_Fornecedor, contato, endereco) VALUES
('Frango Dourado Ltda', 'Carlos - 98888-0000', 'Rua das Granjas, 100'),
('Embalagens Certa', 'Ana Paula - 97777-1111', 'Av. Brasil, 500');

INSERT INTO entregadores (nome_Entregador, veiculo, placa_Veiculo) VALUES
('João MotoBoy', 'Honda CG 160', 'ABC-1234'),
('Mariana Costa', 'Bicicleta Elétrica', 'ISENTO'),
('João Pedro', 'Yamaha Fazer', 'XYZ-9876');

ALTER TABLE fornecedores MODIFY COLUMN contato VARCHAR(100);