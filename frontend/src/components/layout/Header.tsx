/**
 * @fileoverview Componente de diseño/estructura (Layout) reutilizable en la interfaz web (ej. Sidebar, Navbar).
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

function getInitialTheme(): boolean {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        return true;
    }
    return false;
}

export default function Header() {
    const { user, logout } = useAuth();
    const [dark, setDark] = useState(getInitialTheme);

    const toggleTheme = () => {
        setDark((d) => {
            const next = !d;
            if (next) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return next;
        });
    };

    return (
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-6 sticky top-0 z-30">
            <div>
                <h2 className="text-sm font-medium text-muted-foreground">
                    Bienvenido de vuelta,
                </h2>
                <p className="text-base font-semibold text-foreground">
                    {user?.name ?? 'Usuario'}
                </p>
            </div>

            <div className="flex items-center gap-2">
                {/* Dark mode toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl hover:bg-muted transition-colors"
                    title={dark ? 'Modo claro' : 'Modo oscuro'}
                >
                    {dark ? (
                        <Sun className="w-5 h-5 text-amber-500" />
                    ) : (
                        <Moon className="w-5 h-5 text-muted-foreground" />
                    )}
                </button>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Cerrar sesión</span>
                </button>
            </div>
        </header>
    );
}
