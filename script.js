document.addEventListener('DOMContentLoaded', async () => {
    const partyForm = document.getElementById('partyForm');
    const partyList = document.getElementById('partyList');


    try {
        const response = await fetch('https://fsa-async-await.herokuapp.com/api/workshop/parties');
        const data = await response.json();
        renderPartyList(data);
    } catch (error) {
        console.log(error);
    }


    partyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const data = document.getElementById('data').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;


        const newParty = {
            name, 
            date, 
            time,
            location,
            description
        };


        try {
            const response = await fetch('https://fsa-async-await.heroukapp.com/api/workshop/parties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newParty)
            });

            const data = await response.json();

            renderParty(data);

            partyForm.requestFullscreen();
        } catch (error) {
            console.log(error);
        }
    });


    partyList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const partyId = event.target.dataset.partyId;


            try {
                await fetch(`https://fsa-async-await.herokuapp.com/api/workshop/parties/${partyId}`, {
                    method: 'DELETE'
                });


                event.target.parentElement.remove();
            } catch (error) {
                console.log(error);
            }
        }
    });


    function renderPartyList(parties) {
        parties.forEach(party => {
            renderParty(party);
        });
    }

    function renderParty(party) {
        const li = document.createElement('li');
        li.innerHTML = `
        <strong>${party.name}</strong><br>
        Date: ${party.date}<br>
        Time: ${party.time}<br>
        Location: ${party.location}<br>
        Description: ${party.description}<br>
        <button class="delete-button" data-party-id="${party.id}">Delete</button>
        `;
        partyList.appendChild(li);
    }
});