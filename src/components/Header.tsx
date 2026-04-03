import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
    isDark: boolean;
    onToggle: () => void;
}

const NAV_ITEMS = [
    { path: '/posts', label: 'posts' },
    { path: '/about', label: 'about' },
    { path: '/guestbook', label: 'guestbook' },
    { path: '/playground', label: 'playground' },
];

function Header({ isDark, onToggle }: HeaderProps) {
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* 로고 */}
                <Link
                    to="/"
                    className="text-lg font-bold text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                >
                    seung
                </Link>

                {/* 네비게이션 + 토글 */}
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-5">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm transition-colors ${
                                    location.pathname === item.path
                                        ? 'text-gray-900 dark:text-white font-medium'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* 다크모드 토글 */}
                    <button
                        onClick={onToggle}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="테마 전환"
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                </div>

            </div>
        </header>
    );
}

export default Header;