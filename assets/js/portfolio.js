document.addEventListener('DOMContentLoaded', function() {
    const projectInfos = document.querySelectorAll('.project-info');
    projectInfos.forEach(function(projectInfo) {
        projectInfo.addEventListener('click', function() {
            const url = projectInfo.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

    // Adiciona event listener para os filtros
    const filterTags = document.querySelectorAll('.filter-tags a');
    filterTags.forEach(function(filterTag) {
        filterTag.addEventListener('click', function(event) {
            event.preventDefault();
            const tag = filterTag.getAttribute('href').slice(1); // Remove o '#'
            filterProjects(tag);
        });
    });

    // Função para filtrar os projetos
    function filterProjects(tag) {
        const projectInfos = document.querySelectorAll('.project-info');
        let projectsFound = false;
        projectInfos.forEach(function(projectInfo) {
            const tags = projectInfo.querySelectorAll('.label');
            let showProject = false;
            tags.forEach(function(tagElement) {
                if (tagElement.textContent.trim() === tag || tag === 'todos') {
                    showProject = true;
                }
            });
            if (showProject || tag === 'todos') {
                projectInfo.style.display = 'block';
                projectsFound = true;
            } else {
                projectInfo.style.display = 'none';
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
});
