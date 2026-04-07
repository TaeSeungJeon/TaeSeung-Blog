import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getPosts} from '../api/postApi';
import type {Post} from '../types';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

const PROFILE_IMAGE = 'itsme.png';

const RECENT_PROJECTS = [
    {
        title: 'Seung Blog Front-end',
        description: 'Spring Boot + React TaeSeung-Blog',
        stack: ['Spring Boot', 'React', 'GitHub API'],
        github: 'https://github.com/TaeSeungJeon/TaeSeung-Blog',
        status: 'in progress',
    },
    {
        title: 'Seung Blog Back-end',
        description: 'Spring Boot + React TaeSeung-Blog',
        stack: ['Spring Boot', 'React', 'GitHub API'],
        github: 'https://github.com/TaeSeungJeon/seung-backend',
        status: 'in progress',
    },
    {
        title: 'School Java',
        description: '자바 학습 레포지토리',
        stack: ['Java', 'Spring MVC'],
        github: 'https://github.com/TaeSeungJeon/School_Java',
        status: 'done',
    },
];

// 각 자리에서 반복할 단어 목록
const WORDS_LINE1 = ['백엔드', 'React', 'Java', 'Spring Boot'];
const WORDS_LINE2 = ['전태승', 'TaeSeung', 'Seung'];

const TYPING_SPEED = 80;
const DELETING_SPEED = 70;
const PAUSE_TIME = 1400;

function useTypewriter(words: string[]) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            if (text.length < currentWord.length) {
                timeout = setTimeout(() => {
                    setText(currentWord.slice(0, text.length + 1));
                }, TYPING_SPEED);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), PAUSE_TIME);
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText(currentWord.slice(0, text.length - 1));
                }, DELETING_SPEED);
            } else {
                setIsDeleting(false);
                setWordIndex((prev) => prev + 1);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words]);

    return text;
}

function HomePage() {
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const intro = useScrollFadeIn(0);
    const about = useScrollFadeIn(150);
    const postsSection = useScrollFadeIn(200);
    const projects = useScrollFadeIn(250);

    const line1Text = useTypewriter(WORDS_LINE1);
    const line2Text = useTypewriter(WORDS_LINE2);

    useEffect(() => {
        getPosts().then((posts) => setRecentPosts(posts.slice(0, 3)));
    }, []);

    return (
        <div className="space-y-20">

            {/* 인트로 섹션 */}
            <section
                ref={intro.ref}
                className={`fade-up ${intro.isVisible ? 'visible' : ''} pt-10`}
            >
                <div className="flex items-start justify-between gap-8">

                    {/* 텍스트 */}
                    <div className="space-y-6 flex-1">
                        <div className="space-y-2">
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                안녕하세요!
                            </p>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                <span className="text-blue-500 dark:text-blue-400">{line1Text}</span>
                                <span className="animate-pulse text-blue-500 dark:text-blue-400">|</span>
                                를 좋아하는
                            </p>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                개발자{' '}
                                <span className="text-blue-500 dark:text-blue-500">{line2Text}</span>
                                <span className="animate-pulse text-blue-500 dark:text-blue-400">|</span>
                                입니다.
                            </p>
                        </div>
                        <p className="text-m text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                            영써티 영써티 하는데 영써티라고 놀리지 마세요!
                            <br/>
                            남자는 써티부터 아니겠써티까 하하하하!!
                        </p>
                        <div className="flex items-center gap-6">
                            {[
                                {label: 'github', href: 'https://github.com/TaeSeungJeon'},
                                {label: ' blog', href: 'https://github.com/TaeSeungJeon/TaeSeung-Blog'},
                                {label: ' velog', href: 'https://velog.io/@xoxo832/posts'},
                                {label: ' Notion', href: 'https://www.notion.so/It-xT-3345853a763f80f99a3ed9c85453b270'},

                            ].map((link) => (
                                <a key={link.label}
                                   href={link.href}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-sm text-gray-400 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    {link.label} ↗
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 프로필 이미지 */}
                    <div className="shrink-0">
                        {PROFILE_IMAGE ? (
                            <img
                                src={PROFILE_IMAGE}
                                alt="프로필"
                                className="w-60 h-auto"
                            />
                        ) : (
                            <div
                                className="w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <span className="text-3xl">👨‍💻</span>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            {/* 자기소개 카드 */}
            <section ref={about.ref} className={`fade-up ${about.isVisible ? 'visible' : ''}`} >
                <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                    <Link to="/about"
                          className="inline-block text-m text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        About me →
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Java와 Spring Boot를 중심으로 백엔드 개발을 공부하고 있습니다.
                        직접 만들고 부수면서 배우는 걸 좋아하고,
                        이 블로그가 그 기록의 공간입니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Java', 'Spring Boot', 'React', 'TypeScript', 'GitHub API'].map((tech) => (
                            <span key={tech}
                                className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                  {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 최근 포스트 */}
            <section ref={postsSection.ref}
                     className={`fade-up ${postsSection.isVisible ? 'visible' : ''} space-y-6`}>
                <div className="flex items-center justify-between">
                    <h2 className="text-m font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        Recent Posts
                    </h2>
                    <Link to="/posts"
                        className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" >
                        all posts →
                    </Link>
                </div>
                <div className="space-y-1">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.filename}
                            to={`/posts/${post.filename}`}
                            className="group flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200" >
                            <div className="space-y-1">
                                <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                                    {post.title}
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    {post.description}
                                </p>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-6 group-hover:opacity-70 transition-opacity">
                              {post.date}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 최근 프로젝트 */}
            <section ref={projects.ref} className={`fade-up ${projects.isVisible ? 'visible' : ''} space-y-6`}>
                <div className="flex items-center justify-between">
                    <h2 className="text-m font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        Recent Projects
                    </h2>
                    <Link to="/playground"
                        className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        all projects →
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {RECENT_PROJECTS.map((project) => (

                        <a key={project.title}
                           href={project.github}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:-translate-y-0.5 block space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        {project.title}
                                    </p>
                                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                                        project.status === 'in progress'
                                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                    }`}>
                    {project.status}
                </span>
                                </div>
                                <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                  ↗
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span key={tech}
                                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                      {tech}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default HomePage;