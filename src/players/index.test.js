import mockAxios from "axios";
import { getPlayers, getPlayerById } from ".";
const fixture = require("../data/headtohead.json");

describe("when I get the players", () => {
  beforeEach(() => {
    mockAxios.get.mockReset();
  });

  test("it should return empty array when no players", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: []
      })
    );
  
    const players = await getPlayers();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
    );
    expect(players).toMatchSnapshot();
  });

  test("it shoud return players sorted by id", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: fixture
      })
    );

    const players = await getPlayers();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
    );
    expect(players).toMatchSnapshot();
  });

  test("it should bubble errors", async () => {
    mockAxios.get.mockRejectedValue(new Error("Async error"));

    expect(mockAxios.get).toHaveBeenCalledTimes(0);
    try {
      await getPlayers();
    } catch (error) {
      expect(error).toEqual(Error("Async error"));
    }
  });
});

describe("when I get a user by id", () => {
  beforeEach(() => {
    mockAxios.get.mockReset();
  });

  test("it should return 404 when not found", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: []
      })
    );

    const player = await getPlayerById(0);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
    );
    expect(player).toEqual(null);
  });

  test("it should return player when found", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: fixture
      })
    );

    const player = await getPlayerById(17);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
    );
    expect(player).toMatchSnapshot();
  });
});
