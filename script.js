// https://api.github.com/users/{username}/repos API

let list = []; 

async function getApi () {
    let userName = document.getElementById('user').value
    if (userName == '') {
        alert('Por favor digite o nome do usuário')
    return
    } 
    const response = await fetch(`https://api.github.com/users/${userName}`)
    const data = await response.json()
    if (response.ok) {
        document.querySelectorAll('[hidden]').forEach(element => {
            element.removeAttribute('hidden');
        });
        console.log(data)
        document.getElementById('img').src = data.avatar_url
        document.getElementById('profileUrl').innerHTML = data.html_url
        document.getElementById('name').innerHTML = data.name 
        document.getElementById('bio').innerHTML = data.bio ? data.bio : 'Sem bio'
        document.getElementById('repos').innerHTML = data.public_repos
        document.getElementById('followers').innerHTML = data.followers

        const repos = await fetch(`https://api.github.com/users/${userName}/repos`)
        list = await repos.json()
        console.log(list)
        document.getElementById('repoList').innerHTML = list.map(repository =>
         `<li>${repository.name} - ${repository.private ? 'Privado' : 'Publico'} - 
         ${repository.description ? repository.description : 'Sem descrição definida'} - 
         ${repository.pushed_at} - ${repository.language ? repository.language : 'Sem linguagem definida'} </li>`).join('');

    } else {
        alert('Usuário não encontrado')
    }

}

async function filterRepos() {
    const filterRepo = document.getElementById('searchRepo').value.toLowerCase();
    const repositoriesFiltered = list.filter(repository => repository.name.toLowerCase().includes(filterRepo));

    document.getElementById('repoList').innerHTML = repositoriesFiltered.map(repository =>
     `<li>${repository.name} - ${repository.private ? 'Privado' : 'Publico'} - 
     ${repository.description ? repository.description : 'Sem descrição definida'} - 
     ${repository.pushed_at} - ${repository.language ? repository.language : 'Sem linguagem definida'} </li>`).join('');
    console.log(filterRepo)
}


