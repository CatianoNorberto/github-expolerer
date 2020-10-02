window.onload = function () {
  const repositories = [];
  const form = document.getElementById("form");

  const repositoryContainer = document.getElementById("repository");

  const cleanButton = document.getElementById("clean-storage");

  const inputError = document.getElementById("input");
  const spanError = document.getElementById("error");

  spanError.style.display = "none";

  // Limpa os dados no localStorage
  cleanButton.addEventListener("click", () => {
    localStorage.clear();

    window.location.reload();
  });

  // Pega os dados no localStorage
  const storagedRepositories = localStorage.getItem(
    "@GithubExplorer:repositories"
  );

  if (storagedRepositories) {
    const repositoriesStoraged = JSON.parse(storagedRepositories);

    repositoriesStoraged.forEach((repository) => {
      repositoryContainer.innerHTML += `
        <a href="./repositories.html?repository=${repository.full_name}">
          <img src=${repository.owner.avatar_url} alt=${repository.owner.login} />
          <div class="user">
            <strong>${repository.full_name}</strong>
            <p>${repository.description}</p>
          </div>
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
    `;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputError.value === "") {
      inputError.classList = "inputError";
      spanError.style.display = "block";
    }

    const newRepo = document.getElementById("input");

    const url = `https://api.github.com/repos/${newRepo.value}`;

    fetch(url)
      .then((response) => response.json())
      .then((repo) => {
        spanError.style.display = "none";
        let repository = `<a href="./repositories.html?repository=${repo.full_name}">
          <img src=${repo.owner.avatar_url} alt=${repo.owner.login} />
          <div class="user">
            <strong>${repo.full_name}</strong>
            <p>${repo.description}</p>
          </div>
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a>`;
        repositoryContainer.innerHTML += repository;

        repositories.push(repo);

        // Seta os dados no localStorage
        localStorage.setItem(
          "@GithubExplorer:repositories",
          JSON.stringify(repositories)
        );
      })
      .catch((error) => {
        spanError.textContent = "Repositório não encontrado";
        spanError.style.display = "block";
      });
  });
};
