/**
 * @fileoverview Componente de diseño/estructura (Layout) reutilizable en la interfaz web (ej. Sidebar, Navbar).
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
            <div
                className={`transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-64'
                    }`}
            >
                <Header />
                <main className="p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
