import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/postApi';
import type { Post } from '../types';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const listRef = useScrollFadeIn();

    useEffect(() => {
        getPosts()
            .then(setPosts)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="space-y-12">

            {/* 페이지 타이틀 */}
            <div className="space-y-2 pt-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Posts
                </h1>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    {isLoading ? '...' : `${posts.length}개의 글`}
                </p>
            </div>

            {/* 글 목록 */}
            <section ref={listRef} className="scroll-hidden space-y-1">
                {isLoading ? (
                    // 로딩 스켈레톤
                    <div className="space-y-1">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800"
                            >
                                <div className="space-y-2">
                                    <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                                    <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                                </div>
                                <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    // 글 없을 때
                    <p className="text-sm text-gray-400 dark:text-gray-500 py-10 text-center">
                        아직 작성된 글이 없습니다.
                    </p>
                ) : (
                    // 글 목록
                    posts.map((post) => (
                        <Link
                            key={post.filename}
                            to={`/posts/${post.filename}`}
                            className="group flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
                        >
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                                    {post.title}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {post.description}
                                </p>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-6 group-hover:opacity-70 transition-opacity">
                {post.date}
              </span>
                        </Link>
                    ))
                )}
            </section>

        </div>
    );
}

export default PostsPage;