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
                    <a target="_blank" href="https://github.com/${user.login}"><img class="avatar" src="${user.avatar_url}" alt="${user.name}" /></a>
                </div>
                <div class="user-info">
                    <a target="_blank" href="https://github.com/${user.login}"><h2>${user.name}</h2></a>
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
    const repos_div = document.getElementById("repos");

    repos.forEach(repo => {
            const repo_elem = document.createElement('a');
            repo_elem.classList.add("repo");
            repo_elem.href = `https://github.com/${repo.full_name}`;
            repo_elem.target = "_blank";
            repo_elem.innerText = repo.name;
            repos_div.appendChild(repo_elem);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        get_user(user);
        search.value = "";
    }
});