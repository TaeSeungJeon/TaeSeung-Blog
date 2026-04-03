import useScrollFadeIn from '../hooks/useScrollFadeIn';

const SKILLS = {
    Backend: ['Java', 'Spring Boot', 'Spring MVC', 'JPA', 'MySQL'],
    Frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    DevOps: ['Git', 'GitHub', 'Oracle Cloud'],
};

const EXPERIENCES = [
    {
        period: '2026.01 ~',
        title: 'Seung Blog 개발',
        description: 'Spring Boot + React 개인 포트폴리오 블로그 개발',
    },
    {
        period: '2025 ~',
        title: '백엔드 개발자 학습',
        description: 'Java, Spring Boot, JPA 중심으로 백엔드 역량 강화',
    },
];

function AboutPage() {
    const introRef = useScrollFadeIn();
    const skillsRef = useScrollFadeIn();
    const expRef = useScrollFadeIn();

    return (
        <div className="space-y-20 pt-10">

            {/* 인트로 */}
            <section ref={introRef} className="scroll-hidden space-y-6">
                <div className="space-y-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        About
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        전태승
                    </h1>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                    백엔드 개발자를 목표로 공부하고 있습니다.
                    Java와 Spring Boot를 중심으로 학습하며,
                    직접 만들고 기록하는 것을 좋아합니다.
                </p>

                {/* 연락처 */}
                <div className="flex flex-col gap-2">
                    {[
                        { label: 'GitHub', href: 'https://github.com/TaeSeungJeon', value: 'github.com/TaeSeungJeon' },
                        { label: 'Velog', href: 'https://velog.io/@xoxo832/posts', value: 'velog.io/@xoxo832' },
                        { label: 'Email', href: 'mailto:xoxoxx832@gmail.com', value: 'xoxoxx832@gmail.com' },
                    ].map((contact) => (
                        <div key={contact.label} className="flex items-center gap-4 text-sm">
              <span className="w-12 text-gray-400 dark:text-gray-500 shrink-0">
                {contact.label}
              </span>
                        <a href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                            {contact.value}
                        </a>
                        </div>
                        ))}
                </div>
            </section>

            {/* 스킬 */}
            <section ref={skillsRef} className="scroll-hidden space-y-6">
                <h2 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Skills
                </h2>
                <div className="space-y-4">
                    {Object.entries(SKILLS).map(([category, skills]) => (
                        <div key={category} className="flex gap-4">
              <span className="text-sm text-gray-400 dark:text-gray-500 w-20 shrink-0 pt-0.5">
                {category}
              </span>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                                    >
                    {skill}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 경험 */}
            <section ref={expRef} className="scroll-hidden space-y-6">
                <h2 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Experience
                </h2>
                <div className="space-y-6">
                    {EXPERIENCES.map((exp) => (
                        <div
                            key={exp.title}
                            className="flex gap-4"
                        >
              <span className="text-xs text-gray-400 dark:text-gray-500 w-24 shrink-0 pt-0.5">
                {exp.period}
              </span>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {exp.title}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default AboutPage;