import useScrollFadeIn from '../hooks/useScrollFadeIn';

const SKILLS = {
    Backend: ['Java', 'Spring Boot', 'Spring MVC', 'Servlet', 'Oracle DB'],
    Frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML', 'JSP', '...'],
    DevOps: ['Git', 'GitHub', 'Oracle Cloud'],
};

const EXPERIENCES = [
    {
        period: '2026.02.28',
        title: 'Cinema-Talk 영화 커뮤니티 프로젝트 참여'/* 여기 링크 태그 달기 */,
        description: '중간 프로젝트 1조 PL / 게시판 일체 front, back, db 구현 담당',
    },
    {
        period: '2025.12 ~ 2026.~07',
        title: 'React 전자정부 Framework 풀스택 과정 ing',
        description: '대덕 인재개발원 25년 14기',
    },
];

const ACTIVITY = [
    {
        period: '2016.03 ~ 2018.02',
        title: '대구 과학대학교 호텔관광과',
        description: '제 24대 대의원회 학회장'
    }
]

function AboutPage() {
    const intro = useScrollFadeIn(0);
    const skills = useScrollFadeIn(150);
    const exp = useScrollFadeIn(300);
    const act = useScrollFadeIn(450);

    return (
        <div className="space-y-20 pt-10">

            <section
                ref={intro.ref}
                className={`fade-up ${intro.isVisible ? 'visible' : ''} space-y-6`}
            >
                <div className="flex gap-8 items-start">

                    {/* 프로필 이미지 */}
                    <div className="shrink-0">
                        <div
                            className="w-50 h-58 flex items-center justify-center ">
                            <img
                                src="public/me.jpg"
                                alt="프로필 image"
                                className="auto"
                            />
                        </div>
                    </div>

                    {/* 텍스트 */}
                    <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                TaeSeung Jeon
                            </h1>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-300">
                                전 태승
                            </h1>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                            백엔드 개발자를 목표로 공부하고 있습니다.
                            Java와 Spring Boot를 중심으로 학습하며,
                            직접 만들고 기록하는 것을 좋아합니다.
                        </p>
                        <div className="flex flex-col gap-2">
                            {[
                                {
                                    label: 'GitHub.',
                                    href: 'https://github.com/TaeSeungJeon',
                                    value: 'github.com/TaeSeungJeon'
                                },
                                {label: 'Email.', href: 'mailto:xoxoxx832@gmail.com', value: 'xoxoxx832@gmail.com'},
                                {label: 'Velog.', href: 'https://velog.io/@xoxo832/posts', value: 'velog.io/@xoxo832'},
                                {label: 'address.', value: 'DaeJeon, South Korea'},

                            ].map((contact) => (
                                <div key={contact.label} className="flex items-center gap-4 text-sm">
                                    <span className="w-12 text-gray-400 dark:text-gray-500 shrink-0">
                                      {contact.label}
                                    </span>

                                    <a href={contact.href}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {contact.value}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section
                ref={skills.ref}
                className={`fade-up ${skills.isVisible ? 'visible' : ''} space-y-6`}>
                <h2 className="text-s font-medium text-gray-400 dark:text-gray-300 uppercase tracking-widest">
                    Skills
                </h2>
                <div className="space-y-4">
                    {Object.entries(SKILLS).map(([category, skillList]) => (
                        <div key={category} className="flex gap-4">
              <span className="text-sm text-gray-400 dark:text-gray-500 w-20 shrink-0 pt-0.5">
                {category}
              </span>
                            <div className="flex flex-wrap gap-2">
                                {skillList.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                                      {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section ref={exp.ref}
                     className={`fade-up ${exp.isVisible ? 'visible' : ''} space-y-6`}>
                <h2 className="text-s font-medium text-gray-400 dark:text-gray-300 uppercase tracking-widest">
                    Experience
                </h2>
                <div className="space-y-6">
                    {EXPERIENCES.map((item) => (
                        <div key={item.title} className="flex gap-4">
              <span className="text-sm text-gray-400 dark:text-gray-500 w-22 shrink-0 pt-0.5">
                {item.period}
              </span>
                            <div className="space-y-1">
                                <p className="text-m font-medium text-gray-900 dark:text-white">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section ref={act.ref}
                     className={`fade-up ${act.isVisible ? 'visible' : ''} space-y-6`}>
                <h2 className="text-s font-medium text-gray-400 dark:text-gray-300 uppercase tracking-widest">
                    ACTIVITY
                </h2>
                <div className="space-y-6">
                    {ACTIVITY.map((item) => (
                        <div key={item.title} className="flex gap-4">
              <span className="text-sm text-gray-400 dark:text-gray-500 w-22 shrink-0 pt-0.5">
                {item.period}
              </span>
                            <div className="space-y-1">
                                <p className="text-m font-medium text-gray-900 dark:text-white">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
                                    {item.description}
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