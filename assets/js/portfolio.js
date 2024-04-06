document.addEventListener('DOMContentLoaded', function init() {
    const projectInfos = document.querySelectorAll('.project-info');
    projectInfos.forEach(function handleProjectInfoClick(projectInfo) {
        projectInfo.addEventListener('click', function handleProjectClick() {
            const url = projectInfo.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

    // Add event listener for filters
    const filterTags = document.querySelectorAll('.filter-tags a');
    filterTags.forEach(function handleFilterTagClick(filterTag) {
        filterTag.addEventListener('click', function handleFilterClick(event) {
            event.preventDefault();
            const tag = filterTag.getAttribute('href').slice(1); // Remove the '#'
            filterProjects(tag);
        });
    });

    // Function to filter projects
    function filterProjects(tag) {
        const projectInfosInner = document.querySelectorAll('.project-info');
        let projectsFound = false;
        projectInfosInner.forEach(function handleProjectInfo(projectInfo) {
            const tags = projectInfo.querySelectorAll('.label');
            let showProject = false;
            tags.forEach(function handleTag(tagElement) {
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
