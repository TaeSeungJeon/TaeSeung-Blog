import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubLogin } from '../api/authApi';

interface CallbackPageProps {
    onLogin: (username: string, avatarUrl: string, token: string) => void;
}

function CallbackPage({ onLogin }: CallbackPageProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) {
            navigate('/');
            return;
        }

        githubLogin(code)
            .then((data) => {
                onLogin(data.username, data.avatarUrl, data.accessToken);
                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    }, []);

    return (
        <div className="flex items-center justify-center min-h-96">
            <div className="space-y-3 text-center">
                <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    로그인 중...
                </p>
            </div>
        </div>
    );
}

export default CallbackPage;