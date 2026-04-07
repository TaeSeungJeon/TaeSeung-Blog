import useScrollFadeIn from '../hooks/useScrollFadeIn';

const PROJECTS = [
    {
        title: 'Seung Blog',
        description: 'Spring Boot + React로 만든 개인 포트폴리오 블로그. GitHub API 연동, JWT 인증 구현.',
        stack: ['Spring Boot', 'React', 'TypeScript', 'GitHub API'],
        github: 'https://github.com/TaeSeungJeon/seung-backend',
        demo: null,
        status: 'in progress',
    },
    {
        title: 'School Java',
        description: '자바 학습 레포지토리. 기초부터 Spring MVC까지 정리.',
        stack: ['Java', 'Spring MVC', 'Servlet'],
        github: 'https://github.com/TaeSeungJeon/School_Java',
        demo: null,
        status: 'done',
    },
];

function PlaygroundPage() {
    const title = useScrollFadeIn(0);
    const list = useScrollFadeIn(150);

    return (
        <div className="space-y-12 pt-10">

            <section
                ref={title.ref}
                className={`fade-up ${title.isVisible ? 'visible' : ''} space-y-2`}>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Playground
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Projects
                </h1>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    직접 만들어본 프로젝트들입니다.
                </p>
            </section>

            <section
                ref={list.ref}
                className={`fade-up ${list.isVisible ? 'visible' : ''} grid grid-cols-1 gap-4`}>
                {PROJECTS.map((project) => (
                    <div
                        key={project.title}
                        className="group p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:-translate-y-0.5 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {project.title}
                                    </h2>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        project.status === 'in progress'
                                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                    }`}>
                    {project.status}
                  </span>
                                </div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  {tech}
                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pt-1">
                            {project.github && (

                             <a href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                github ↗
                                </a>
                                )}
                            {project.demo && (
                              <a href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                demo ↗
                                </a>
                                )}
                        </div>
                    </div>
                ))}
</section>

</div>
);
}

export default PlaygroundPage;