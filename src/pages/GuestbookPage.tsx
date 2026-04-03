import { useEffect, useState } from 'react';
import { getGuestbook, createGuestbook, deleteGuestbook } from '../api/guestbookApi';
import type { GuestbookItem } from '../types';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

function GuestbookPage() {
    const [items, setItems] = useState<GuestbookItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const listRef = useScrollFadeIn();
    const formRef = useScrollFadeIn();

    useEffect(() => {
        getGuestbook()
            .then(setItems)
            .finally(() => setIsLoading(false));
    }, []);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        try {
            const newItem = await createGuestbook(title, content);
            setItems((prev) => [newItem, ...prev]);
            setTitle('');
            setContent('');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteGuestbook(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-16 pt-10">

            {/* 페이지 타이틀 */}
            <div className="space-y-2">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Guestbook
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    방명록
                </h1>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    GitHub 계정으로 로그인 후 글을 남길 수 있습니다.
                </p>
            </div>

            {/* 작성 폼 */}
            <section ref={formRef} className="scroll-hidden space-y-4">
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors"
                    />
                    <textarea
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors resize-none"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title.trim() || !content.trim()}
                        className="px-4 py-2 text-sm text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '작성 중...' : '작성하기'}
                    </button>
                </div>
            </section>

            {/* 방명록 목록 */}
            <section ref={listRef} className="scroll-hidden space-y-4">
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 space-y-2"
                            >
                                <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                                <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500 py-10 text-center">
                        아직 작성된 글이 없습니다. 첫 번째 글을 남겨보세요!
                    </p>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="group p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-colors space-y-3"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.avatarUrl}
                                        alt={item.author}
                                        className="w-7 h-7 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {item.author}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {item.createdAt.slice(0, 10)}
                                        </p>
                                    </div>
                                </div>
                                {/* 로그인 검증 없음
                                로그인 안해도 삭제 버튼 보임 - 나중에 OAuth연동 후 추가 , 본인 글만 삭제 가능하도록 처리 필요 */}
                                <button onClick={() => handleDelete(item.id)}
                                    className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 dark:text-gray-600 hover:text-red-400 transition-all duration-200">
                                    삭제
                                </button>
                            </div>
                            <div className="space-y-1 pl-10">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </section>

        </div>
    );
}

export default GuestbookPage;