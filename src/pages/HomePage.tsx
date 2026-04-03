import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getPosts} from '../api/postApi';
import type {Post} from '../types';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

function HomePage() {
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const [typedText, setTypedText] = useState('');
    const introRef = useScrollFadeIn();
    const postsRef = useScrollFadeIn();


    const fullText = '전태승입니다.';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setTypedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        getPosts().then((posts) => setRecentPosts(posts.slice(0, 3)));
    }, []);

    return (
        <div className="space-y-24">

            {/* 인트로 섹션 */}
            <section ref={introRef} className="scroll-hidden space-y-8 pt-10">
                <div className="space-y-3">
                    <p className="text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase">
                        Hello, World
                    </p>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {typedText}
                        <span className="animate-pulse">|</span>
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                        백엔드 개발자를 꿈꾸는 개발자입니다.
                        <br/>
                        배우고 만들고 기록합니다.
                    </p>
                </div>

                {/* SNS 링크 */}
                <div className="flex items-center gap-6">
                    {[
                        {label: 'github', href: 'https://github.com/TaeSeungJeon'},
                        {label: 'velog', href: 'https://velog.io/@xoxo832/posts'},
                    ].map((link) => (
                        <a key={link.label}
                           href={link.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5">
                            {link.label} ↗
                        </a>
                    ))}
                </div>
            </section>

            {/* 최근 포스트 */}
            <section ref={postsRef} className="scroll-hidden space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        Recent Posts
                    </h2>
                    <Link to="/posts"
                          className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        all posts →
                    </Link>
                </div>
                <div className="space-y-1">
                    {recentPosts.map((post) => (
                        <Link key={post.filename}
                              to={`/posts/${post.filename}`}
                              className="group flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                                    {post.title}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {post.description}
                                </p>
                            </div>
                            <span
                                className="text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-6 group-hover:opacity-70 transition-opacity">
                {post.date}
              </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;