// const {players} = require('../data/headtohead.json');
import axios from "axios";

async function getRemotePlayers() {
  try {
    const { data } = await axios.get(
      "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPlayers() {
  try {
    const response = await getRemotePlayers();
    const players = response.players
      ? response.players.sort(
          (firstPlayer, secondPlayer) => firstPlayer.id - secondPlayer.id
        )
      : [];
    return players;
  } catch (error) {
    throw error;
  }
}

export async function getPlayerById(id) {
  try {
    const playerId = parseInt(id);
    const response = await getRemotePlayers();
    const players = response.players
      ? response.players.find(player => player.id === playerId)
      : null;
    return players;
  } catch (error) {
    throw error;
  }
}
