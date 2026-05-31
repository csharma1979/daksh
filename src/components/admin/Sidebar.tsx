"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./Sidebar.css";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronDown,
  Menu,
  ChevronRight,
  Quote,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Building
} from "lucide-react";

const Sidebar = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Careers": true
  });

  const toggleGroup = (name: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { name: "User Consents", href: "/admin/consents", icon: ShieldCheck },
    { name: "Team", href: "/admin/team", icon: Building },
    { name: "Partner Requests", href: "/admin/partners", icon: UserCheck },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { 
      name: "Careers", 
      href: "/admin/jobs", 
      icon: Briefcase,
      hasSubmenu: true,
      submenu: [
        { name: "Job Openings", href: "/admin/jobs" },
        { name: "Applications", href: "/admin/applications" },
      ]
    },
    { name: "Design Ideas", href: "/admin/media/design-ideas", icon: ImageIcon },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <img src="/Daksh-logo.jpg" alt="Daksh" className="logo" />}
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn" title="Toggle Sidebar">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = pathname === item.href || (item.hasSubmenu && pathname.startsWith(item.href));
          const isExpanded = expandedGroups[item.name];
          
          if (item.hasSubmenu) {
            return (
              <div key={item.name} className={`nav-item-group ${isItemActive ? 'active' : ''}`}>
                <div 
                  className={`nav-link ${isItemActive ? 'active' : ''}`}
                  onClick={() => !collapsed && toggleGroup(item.name)}
                >
                  <Icon size={20} />
                  {!collapsed && (
                    <>
                      <span>{item.name}</span>
                      <div className="dropdown-arrow">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </div>
                    </>
                  )}
                </div>
                
                {!collapsed && isExpanded && (
                  <div className="submenu">
                    {item.submenu?.map((sub) => (
                      <Link 
                        key={sub.href} 
                        href={sub.href} 
                        className={`submenu-link ${pathname === sub.href ? 'active' : ''} ${(sub as any).isUtility ? 'all-pages' : ''}`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? 'active' : ''}`}>
              <Icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && <div>Daksh Admin v1.1</div>}
      </div>
    </aside>
  );
};

export default Sidebar;
