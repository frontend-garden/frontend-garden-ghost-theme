function filterProjects(tag) {
  const projectInfosInner = document.querySelectorAll('.project-info');
  let projectsFound = false;
  projectInfosInner.forEach((projectInfo) => {
    const tags = projectInfo.querySelectorAll('.label');
    let showProject = false;
    tags.forEach((tagElement) => {
      if (tagElement.textContent.trim() === tag || tag === 'todos') {
        showProject = true;
      }
    });
    if (showProject || tag === 'todos') {
      const projectInfoElement = projectInfo;
      projectInfoElement.style.display = 'block';
      projectsFound = true;
    } else {
      const projectInfoElement = projectInfo;
      projectInfoElement.style.display = 'none';
    }
  });
  if (!projectsFound) {
    const noProjectsMessage = document.querySelector('.no-projects-message');
    if (!noProjectsMessage) {
      const newNoProjectsMessage = document.createElement('p');
      newNoProjectsMessage.classList.add('no-projects-message');
      newNoProjectsMessage.textContent = 'Não há projetos disponíveis nessa categoria.';
      document.querySelector('.columns').appendChild(newNoProjectsMessage);
    }
  } else {
    const noProjectsMessage = document.querySelector('.no-projects-message');
    if (noProjectsMessage) {
      noProjectsMessage.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const projectInfos = document.querySelectorAll('.project-info');
  projectInfos.forEach((projectInfo) => {
    projectInfo.addEventListener('click', () => {
      const url = projectInfo.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  const filterTags = document.querySelectorAll('.filter-tags a');
  filterTags.forEach((filterTag) => {
    filterTag.addEventListener('click', (event) => {
      event.preventDefault();
      const tag = filterTag.getAttribute('href').slice(1);
      filterProjects(tag);
    });
  });
});