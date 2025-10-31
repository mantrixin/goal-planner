import DashBoardPage from '../pages/dashboard-homepage';
import HabitPage from '../pages/habits';
import GoalsPage from '../pages/goals';
import MoodTrackerPage from '../pages/mood-tracker';
import ReportPage from '../pages/reports';
import SettingPage from '../pages/setting';
import NotFoundPage from '../pages/not-found'; 
import { Home, LayoutDashboard, SmileIcon, Settings, Target, FileChartColumn, CalendarCheck} from 'lucide-react';
import OnboardingPage from '../pages/onboarding-setup';

export const APP_PAGES = [
    
    {
        link: '/',
        title: 'Home',
        icon: Home,
        showInSidebar: true,
        element: OnboardingPage, 
    },
    
    {
        link: '/dashboard-homepage',
        title: 'Dashboard',
        icon: LayoutDashboard,
        showInSidebar: true,
        element: DashBoardPage, 
    },

    {
        link: '/habits',
        title: 'Habit Tracker',
        icon: CalendarCheck,
        showInSidebar: true,
        element: HabitPage,
    },
    {
        link: '/goals',
        title: 'Goal Management', 
        icon: Target,
        showInSidebar: true,
        element: GoalsPage,
    },
    {
        link: '/mood-tracker',
        title: 'Mood Tracker', 
        icon: SmileIcon,
        showInSidebar: true,
        element: MoodTrackerPage,
    },
    
    
    {
        link: '/reports',
        title: 'Reports & Exports', 
        icon: FileChartColumn ,
        showInSidebar: true,
        element: ReportPage,
    },
    {
        link: '/settings',
        title: 'Settings',
        icon: Settings,
        showInSidebar: true,
        element: SettingPage,
    },

    {
        link: '*',
        element: NotFoundPage,
    },
];