window.onload = function () {
  const repository = window.location.search;

  const newRepository = repository.replace("?repository=", "");

  const url = `https://api.github.com/repos/${newRepository}`;

  const userAvatar = document.getElementById("user-avatar");
  const repoName = document.getElementById("repo-name");
  const repoDescription = document.getElementById("repo-description");
  const repoStatus = document.getElementById("repo-status");

  fetch(url)
    .then((response) => response.json())
    .then((repo) => {
      userAvatar.src = repo.owner.avatar_url;
      repoName.textContent = repo.full_name;
      repoDescription.textContent = repo.description;

      const statusItem = `
        <li>
          <strong>${repo.stargazers_count}</strong>
            <p>Stars</p>
          </li>
          <li>
            <strong>${repo.forks_count}</strong>
            <p>Forks</p>
          </li>
          <li>
            <strong>${repo.open_issues_count}</strong>
            <p>Issues abertas</p>
          </li>
        `;

      repoStatus.innerHTML = statusItem;
    });

  const issueContainer = document.getElementById("issues");

  const issuesUrl = `https://api.github.com/repos/${newRepository}/issues`;

  fetch(issuesUrl)
    .then((issues) => issues.json())
    .then((issue) => {
      issue.forEach((issueItem) => {
        issueContainer.innerHTML += `
        <a href=${issueItem.html_url} class="issues-item">
          <div>
            <strong>${issueItem.title}</strong>
            <p>${issueItem.user.login}</p>
          </div>

          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      `;
      });
    });
};
