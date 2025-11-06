const request = require('supertest');
const app = require('../app');
const Jogo = require('../domain/Jogos');

jest.mock('../domain/Jogos');

describe('API de Jogos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /jogos/', () => {
    it('deve retornar uma lista vazia quando não há jogos no banco', async () => {
      Jogo.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      const response = await request(app).get('/api/jogos/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('deve retornar uma lista de todos os jogos', async () => {
      const mockJogos = [
        { nome: 'The Legend of Zelda', ano: 1986 },
        { nome: 'Super Mario Bros', ano: 1985 },
      ];
      Jogo.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockJogos),
      });

      const response = await request(app).get('/api/jogos/');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);

      const nomes = response.body.map((jogo) => jogo.nome);
      expect(nomes).toContain('The Legend of Zelda');
      expect(nomes).toContain('Super Mario Bros');

      const anos = response.body.map((jogo) => jogo.ano);
      expect(anos).toContain(1985);
    });

    it('deve retornar 500 se o banco de dados falhar ao buscar jogos', async () => {
      Jogo.find.mockReturnValue({
        sort: jest
          .fn()
          .mockRejectedValue(new Error('Falha de conexão com o DB')),
      });

      const response = await request(app).get('/api/jogos/');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erro ao buscar os jogos.');
    });
  });

  describe('POST /jogos/add', () => {
    it('deve criar um novo jogo com sucesso', async () => {
      const novoJogo = {
        nome: 'Chrono Trigger',
        ano: 1995,
      };
      const jogoCriadoMock = { _id: 'mockId', ...novoJogo };
      Jogo.create.mockResolvedValue(jogoCriadoMock);
      Jogo.findById.mockResolvedValue(jogoCriadoMock);

      const response = await request(app).post('/api/jogos/add').send(novoJogo);

      expect(response.status).toBe(201);
      expect(response.body.nome).toBe('Chrono Trigger');
      expect(response.body).toHaveProperty('_id');

      const jogoNoBanco = await Jogo.findById(response.body._id);
      expect(jogoNoBanco.nome).toBe('Chrono Trigger');
    });

    it('deve retornar erro 400 ao tentar criar um jogo sem o campo nome', async () => {
      const jogoInvalido = {
        ano: 2023,
      };

      const response = await request(app)
        .post('/api/jogos/add')
        .send(jogoInvalido);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('O nome do jogo é obrigatório.');
    });

    it('deve retornar erro 400 ao tentar criar um jogo sem o campo ano', async () => {
      const jogoInvalido = {
        nome: 'Jogo sem ano',
      };

      const response = await request(app)
        .post('/api/jogos/add')
        .send(jogoInvalido);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'O ano de lançamento é obrigatório.'
      );
    });

    it('deve retornar 500 se o banco de dados falhar ao criar', async () => {
      Jogo.create.mockRejectedValue(new Error('Falha de conexão com o DB'));

      const novoJogo = {
        nome: 'Jogo Falhado',
        ano: 2000,
      };

      const response = await request(app).post('/api/jogos/add').send(novoJogo);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erro ao adicionar o jogo.');
    });
  });

  describe('POST /jogos/delete', () => {
    it('deve deletar um jogo ao receber o ID', async () => {
      const jogoCriado = {
        _id: 'idValido123',
        nome: 'Chrono Trigger',
        ano: 1995,
      };
      Jogo.create.mockResolvedValue(jogoCriado);
      Jogo.findByIdAndDelete.mockResolvedValue(jogoCriado);

      const createResponse = await request(app)
        .post('/api/jogos/add')
        .send(jogoCriado);

      expect(createResponse.status).toBe(201);

      const res = await request(app)
        .post('/api/jogos/delete')
        .send({ id: jogoCriado._id });

      expect(res.status).toBe(204);
    });

    it('deve retornar um Not Found (404) ao enviar um delete sem possuir o jogo no banco', async () => {
      const idQueNaoExiste = 'idDeletado456';

      Jogo.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/jogos/delete')
        .send({ id: idQueNaoExiste });

      expect(res.status).toBe(404);
    });

    it('deve retornar 400 se o ID não for fornecido no body', async () => {
      const res = await request(app).post('/api/jogos/delete').send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('O ID do jogo é obrigatório.');
    });

    it('deve retornar 500 se o ID tiver um formato inválido (CastError)', async () => {
      Jogo.findByIdAndDelete.mockRejectedValue(new Error('CastError'));

      const idInvalido = '123';

      const res = await request(app)
        .post('/api/jogos/delete')
        .send({ id: idInvalido });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Erro ao deletar o jogo.');
    });
  });
});
