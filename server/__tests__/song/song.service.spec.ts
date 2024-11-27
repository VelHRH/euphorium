import { Test, TestingModule } from '@nestjs/testing';

import { SongService } from '$modules/entities/song/song.service';

describe('SuperheroService', () => {
  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongService],
    }).compile();

    service = module.get<SongService>(SongService);
  });

  it('should return reversed name', () => {
    const song = service.get();

    expect(song).toHaveProperty('name');
    expect(typeof song.name).toBe('string');
    // eslint-disable-next-line @cspell/spellchecker
    expect(song.name).toBe('etilletaS');
  });
});
