// ===== COMPONENTES POR FUNCIONALIDAD =====
// Estos componentes son independientes del modo pero específicos de una funcionalidad

// Dashboard Components
export { default as DashboardCard } from './dashboard/DashboardCard';
export { default as StatCard } from './dashboard/StatCard';
export { default as UserCard } from './dashboard/UserCard';
export { default as AmenitiesCard } from './dashboard/AmenitiesCard';
export { default as ExampleCard } from './dashboard/ExampleCard';

// Cobertura Particular Components
export { default as CoberturaParticularEditPanel } from './cobertura-particular/CoberturaParticularEditPanel';

// Auth Components
export { default as ProfileDropdown } from '../shared/ui/ProfileDropdown';

// Notification Components
export { default as NotificationDropdown } from '../shared/ui/NotificationDropdown';
export { default as NotificationModal } from '../shared/ui/NotificationModal';

// Modal Components
export { default as AddMemberModal } from '../shared/ui/AddMemberModal';
export { default as ParticipantsModal } from '../shared/ui/ParticipantsModal';
export { default as LinkedAccountsModal } from '../shared/ui/LinkedAccountsModal';
export { default as CreditsModal } from '../shared/ui/CreditsModal';
