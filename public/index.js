const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
    .then(response => response.json())
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};
let formDataVar;

const addNewHedgehog = (e) => {
  e.preventDefault();

  body = {
    "name": document.getElementById('name').value,
    "hoglets": document.getElementById('hoglets').value,
    "allergies": document.getElementById('allergies').value
  }
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`, {
    method: 'POST',
    headers: {
          "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
  .then(data => {
    const { name, hoglets, allergies } = body
    appendHedgehog({
      name,
      hoglets,
      allergies,
      id: data.id
    });
  })
  .catch(error => {
    console.error(error);
  });
};

const unInviteHedgehog = (e) => {
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites/${e.currentTarget.id}`, {
    method: 'DELETE'
  });
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
