const APIURL = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

get_user("maximop2p");

async function get_user(username) {
    const resp = await fetch(APIURL + username);
    const resp_data = await resp.json();

    create_user_card(resp_data);
}

function create_user_card(user) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers} followers</li>
                    <li>${user.following} following</li>
                    <li>${user.public_repos} repos</li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        get_user(user);
        search.value = "";
    }
});