/**
 * @fileoverview Componente de diseño/estructura (Layout) reutilizable en la interfaz web (ej. Sidebar, Navbar).
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import type { DashboardSummary } from '@/types';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    CalendarDays,
    ChevronLeft,
    ShieldCheck,
    History,
    UserCog,
    AlertTriangle,
    Truck,
    ShoppingBag
} from 'lucide-react';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/productos', label: 'Productos', icon: Package, stockBadge: true },
    { path: '/proveedores', label: 'Proveedores', icon: Truck },
    { path: '/compras', label: 'Compras', icon: ShoppingBag, adminOnly: true },
    { path: '/ventas', label: 'Punto de Venta', icon: ShoppingCart },
    { path: '/ventas/historial', label: 'Historial', icon: History, adminOnly: true },
    { path: '/usuarios', label: 'Usuarios', icon: UserCog, adminOnly: true },
    { path: '/pacientes', label: 'Pacientes', icon: Users },
    { path: '/citas', label: 'Citas', icon: CalendarDays },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const location = useLocation();
    const { user } = useAuth();
    const [criticalCount, setCriticalCount] = useState(0);

    // Fetch critical stock count for badge
    useEffect(() => {
        const loadCritical = async () => {
            try {
                const res = await api.get<DashboardSummary>('/dashboard/summary');
                setCriticalCount(res.data.criticalStock.length);
            } catch {
                // Silently fail — badge is non-essential
            }
        };
        loadCritical();
        // Refresh every 60 seconds
        const interval = setInterval(loadCritical, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside
            className={`fixed top-0 left-0 h-full z-40 flex flex-col border-r transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-64'}`}
            style={{
                backgroundColor: 'hsl(var(--sidebar))',
                borderColor: 'hsl(var(--sidebar-border))',
            }}
        >
            {/* Brand */}
            <div className="h-16 flex items-center px-4 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-bold whitespace-nowrap" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                            FarmaGestión
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems
                    .filter((item) => !('adminOnly' in item && item.adminOnly) || user?.role === 'admin')
                    .map((item) => {
                    const isActive = location.pathname === item.path;
                    const showBadge = 'stockBadge' in item && item.stockBadge && criticalCount > 0;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={collapsed ? item.label : undefined}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                                    : 'hover:bg-muted/80'
                                }`}
                            style={!isActive ? { color: 'hsl(var(--sidebar-foreground))' } : undefined}
                        >
                            <item.icon
                                className={`w-5 h-5 shrink-0 transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`}
                            />
                            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                            {showBadge && (
                                <span className={`${collapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-red-500 text-white shadow-sm`}>
                                    <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
                                    {criticalCount}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User badge / collapse toggle */}
            <div className="p-3 border-t" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
                {!collapsed && user && (
                    <div className="mb-3 px-3 py-2 rounded-xl bg-muted/50">
                        <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                            {user.name}
                        </p>
                        <p className="text-xs capitalize" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {user.role}
                        </p>
                    </div>
                )}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-center py-2 rounded-xl hover:bg-muted/80 transition-colors"
                    style={{ color: 'hsl(var(--sidebar-foreground))' }}
                    title={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                >
                    <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </aside>
    );
}
