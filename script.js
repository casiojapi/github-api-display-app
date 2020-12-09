const APIURL = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

get_user("maximop2p");

async function get_user(username) {
    const resp = await fetch(APIURL + username);
    const resp_data = await resp.json();

    create_user_card(resp_data);
    get_repos(username);
}

async function get_repos(username) {
    const resp = await fetch(APIURL + username +  "/repos");
    const resp_data = await resp.json();

    add_repos_to_card(resp_data);
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

function add_repos_to_card(repos) {
    const repos_elem = document.getElementById("repos");
    console.log(repos);
    repos.forEach(repo => {
        // if (repo.homepage) { // just the ones with github pages (or webpage)
            const repo_elem = document.createElement('a');

            repo_elem.classList.add("repo");
            repo_elem.href = repo.homepage;
            repo_elem.target = "_blank";
            repo_elem.innerText = repo.name;

            repos_elem.appendChild(repo_elem);
        // }
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        get_user(user);
        search.value = "";
    }
});