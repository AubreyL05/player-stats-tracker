document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('player-form');
  const playersDiv = document.getElementById('players');

  const fetchPlayers = async () => {
    const res = await fetch('/api/players');
    const data = await res.json();
    playersDiv.innerHTML = '';
    data.forEach(player => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${player.name}</strong> | Team: ${player.team} | Position: ${player.position}</p>
        <p>Games: ${player.gamesPlayed} | Points: ${player.points} | Assists: ${player.assists} | Rebounds: ${player.rebounds}</p>
        <button onclick="deletePlayer('${player._id}')">Delete</button>
        <hr/>
      `;
      playersDiv.appendChild(div);
    });
  };

  const deletePlayer = async (id) => {
    await fetch(`/api/players/${id}`, { method: 'DELETE' });
    fetchPlayers();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPlayer = {
      name: document.getElementById('name').value,
      team: document.getElementById('team').value,
      position: document.getElementById('position').value,
      gamesPlayed: document.getElementById('gamesPlayed').value,
      points: document.getElementById('points').value,
      assists: document.getElementById('assists').value,
      rebounds: document.getElementById('rebounds').value,
    };
    await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer),
    });
    form.reset();
    fetchPlayers();
  });

  fetchPlayers();
  window.deletePlayer = deletePlayer;
});
